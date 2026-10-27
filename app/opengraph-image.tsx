import { ImageResponse } from "next/og";
export const alt = "Gelateria Mix — Arcos, MG";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0709",
        color: "#ffffff",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 6,
          color: "#ff4fb8",
          textTransform: "uppercase",
        }}
      >
        Arcos · Minas Gerais
      </div>
      <div style={{ display: "flex", alignItems: "baseline", marginTop: 24 }}>
        <span style={{ fontSize: 150, fontWeight: 700 }}>Gelateria</span>
        <span style={{ fontSize: 96, fontStyle: "italic", color: "#ff4fb8", marginLeft: 24 }}>
          mix
        </span>
      </div>
      <div style={{ display: "flex", fontSize: 38, marginTop: 28, color: "#cdb9a4" }}>
        Sundaes, milk-shakes e sobremesas geladas. Peça pelo WhatsApp.
      </div>
      <div
        style={{
          display: "flex",
          height: 8,
          width: 220,
          background: "#d9007a",
          marginTop: 48,
          borderRadius: 8,
        }}
      />
    </div>,
    size,
  );
}
