import { ImageResponse } from "next/og"

export const alt = "Nó Zero — Escovas e acessórios para cabelo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0e",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -100,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#ff1f7a",
            opacity: 0.35,
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#7c3aed",
            opacity: 0.35,
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -2,
            backgroundImage: "linear-gradient(90deg, #ff1f7a 0%, #a855f7 55%, #14b8a6 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Nó Zero
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 40, color: "rgba(255,255,255,0.85)" }}>
          O fim da dor de pentear.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          Escovas Tangle Teezer originais no Brasil
        </div>
      </div>
    ),
    { ...size },
  )
}
