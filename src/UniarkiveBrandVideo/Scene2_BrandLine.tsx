import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene2_BrandLine: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth fade-in
  const textOpacity = interpolate(frame, [0, 45], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [0, 60], [15, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 150], [1.02, 1.0], {
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
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#F2F2F2", // Cold White
            fontSize: "64px",
            fontWeight: "400",
            letterSpacing: "0.03em",
            textAlign: "center",
          }}
        >
          Storie di archivi inesplorati.
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
