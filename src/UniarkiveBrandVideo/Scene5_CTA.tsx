import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const ctaOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaTranslateY = interpolate(frame, [15, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [60, 90], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050814",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${ctaTranslateY}px)`,
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            border: "2px solid #C5A059", // Oro pallido
            padding: "24px 64px",
            borderRadius: "4px",
          }}
        >
          <span
            style={{
              fontFamily,
              color: "#F2F2F2",
              fontSize: "48px",
              fontWeight: "400",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Apri l'archivio
          </span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "100px",
          opacity: logoOpacity,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#C5A059",
            fontSize: "32px",
            fontWeight: "500",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          UNIARKIVE
        </span>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.8)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
