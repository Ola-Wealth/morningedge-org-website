import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MorningEdge Systems — We Build Businesses That Execute.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left navy accent bar */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 72,
            width: 3,
            height: 486,
            background: "#1A1AB5",
          }}
        />

        {/* Top right geometry */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 72,
            width: 160,
            height: 160,
            border: "1.5px solid rgba(26,26,181,0.4)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 110,
            top: 102,
            width: 100,
            height: 100,
            border: "1px solid rgba(34,211,238,0.25)",
            display: "flex",
          }}
        />

        {/* Top label */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingLeft: 32 }}>
          <span
            style={{
              color: "#22D3EE",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            MORNINGEDGE SYSTEMS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 32,
            gap: 0,
            marginTop: -20,
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            We Build
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Businesses
          </span>
          <span
            style={{
              color: "#22D3EE",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            That Execute.
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 32,
            borderTop: "1px solid #1E1E1E",
            paddingTop: 20,
          }}
        >
          <span
            style={{
              color: "#555555",
              fontSize: 13,
              letterSpacing: "0.08em",
            }}
          >
            Operations Architecture · AI Systems Integration · Executive Development
          </span>
          <span
            style={{
              color: "#444444",
              fontSize: 13,
              letterSpacing: "0.08em",
            }}
          >
            morningedgesystems.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
