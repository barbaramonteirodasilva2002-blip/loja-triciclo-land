import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

let schemaReady: Promise<void> | null = null

// Cria as tabelas na primeira consulta, caso ainda não existam — evita depender
// de um passo de migração manual separado para este painel pequeno.
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        create table if not exists sessions (
          id text primary key,
          path text,
          last_seen_at timestamptz not null default now(),
          created_at timestamptz not null default now()
        )
      `
      await sql`
        create table if not exists checkout_events (
          id bigserial primary key,
          session_id text not null,
          step text not null,
          created_at timestamptz not null default now()
        )
      `
      await sql`
        create table if not exists carts (
          session_id text primary key,
          items jsonb not null default '[]',
          customer_name text,
          customer_email text,
          customer_phone text,
          status text not null default 'active',
          updated_at timestamptz not null default now(),
          created_at timestamptz not null default now()
        )
      `
      await sql`
        create table if not exists orders (
          id bigserial primary key,
          session_id text,
          status text not null default 'pendente',
          kit_id text not null,
          kit_label text not null,
          customer_name text not null,
          customer_email text,
          customer_phone text,
          customer_cpf text,
          payment_method text not null,
          shipping_method text not null,
          shipping_value numeric not null default 0,
          subtotal numeric not null,
          discount_value numeric not null default 0,
          total numeric not null,
          coupon_code text,
          created_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        )
      `
      await sql`alter table orders add column if not exists gateway_charge_id text`
      await sql`alter table orders add column if not exists gateway_status text`
      await sql`alter table orders add column if not exists customer_ip text`
      await sql`alter table orders add column if not exists utm_source text`
      await sql`alter table orders add column if not exists utm_campaign text`
      await sql`alter table orders add column if not exists utm_medium text`
      await sql`alter table orders add column if not exists utm_content text`
      await sql`alter table orders add column if not exists utm_term text`
      await sql`alter table orders add column if not exists src text`
      await sql`alter table orders add column if not exists sck text`
      await sql`alter table orders add column if not exists utmify_reported_status text`
      await sql`create index if not exists checkout_events_session_idx on checkout_events (session_id)`
      await sql`create index if not exists checkout_events_created_idx on checkout_events (created_at)`
      await sql`create index if not exists orders_status_idx on orders (status)`
      await sql`create index if not exists orders_created_idx on orders (created_at)`
      await sql`create unique index if not exists orders_gateway_charge_idx on orders (gateway_charge_id) where gateway_charge_id is not null`
    })()
  }
  return schemaReady
}
