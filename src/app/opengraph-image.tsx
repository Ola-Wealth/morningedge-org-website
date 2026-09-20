import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MorningEdge Systems. We build businesses that execute.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#17150F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 80, top: 72, width: 3, height: 486, background: "#1A1AB5" }} />

        <div style={{ display: "flex", flexDirection: "column", paddingLeft: 32 }}>
          <span style={{ color: "#B45309", fontSize: 15, fontWeight: 700, letterSpacing: "0.28em" }}>
            MORNINGEDGE SYSTEMS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", paddingLeft: 32, gap: 22 }}>
          <span style={{ color: "#FAF7F1", fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            You lose output in two places.
          </span>
          <span style={{ color: "#9E98FF", fontSize: 40, fontWeight: 500, lineHeight: 1.1 }}>
            Your people, and your systems. We fix both.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 32,
            borderTop: "1px solid #3A362C",
            paddingTop: 22,
          }}
        >
          <span style={{ color: "#B4AE9E", fontSize: 20 }}>AI enablement. Software that runs the operation.</span>
          <span style={{ color: "#8A8578", fontSize: 20 }}>morningedgesystems.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
