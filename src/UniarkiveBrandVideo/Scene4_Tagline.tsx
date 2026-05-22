import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene4_Tagline: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blurAmount = interpolate(frame, [0, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 150], [0.9, 1.05], {
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
          transform: `scale(${scale})`,
          opacity,
          filter: `blur(${blurAmount}px)`,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#C5A059", // Oro pallido
            fontSize: "80px",
            fontWeight: "500",
            letterSpacing: "0.05em",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: "1.3",
          }}
        >
          Ogni storia apre un mondo.
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
