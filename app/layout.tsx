import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Unbounded, DM_Serif_Display, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { CartProvider } from '@/components/cart-provider'
import { AnalyticsProvider } from '@/components/analytics-provider'
import './globals.css'

const inter = Inter({ variable: '--font-geist-sans', subsets: ['latin'] })
const unbounded = Unbounded({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})
const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-accent',
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
})
const spaceMono = Space_Mono({
  variable: '--font-brand-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Tangle Teezer Brasil',
  description:
    'Escovas Tangle Teezer originais: Desembaraçar, Modelar, Finalizar, Bem-Estar, Pet-Teezer e Kits. Produto original, compra segura e frete grátis.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b0b0e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`light ${inter.variable} ${unbounded.variable} ${dmSerifDisplay.variable} ${spaceMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <AnalyticsProvider>
          <CartProvider>{children}</CartProvider>
        </AnalyticsProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}

        {/* Utmify - Script de UTMs */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          strategy="afterInteractive"
        />

        {/* Utmify - Pixel de rastreamento de vendas */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "6a5b0a42909812a32f68fa16";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
      </body>
    </html>
  )
}
