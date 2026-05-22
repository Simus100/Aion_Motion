import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Opacity fade in for the background
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scale down slightly to give a cinematic entrance
  const scale = interpolate(
    spring({
      frame,
      fps,
      config: { damping: 200, mass: 1 },
    }),
    [0, 1],
    [1.1, 1]
  );

  // Blur reduction
  const blurAmount = interpolate(frame, [0, 45], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050814", // Blu notte
        opacity: bgOpacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#C5A059", // Oro pallido
            fontSize: "120px",
            fontWeight: "500",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: textOpacity,
            filter: `blur(${blurAmount}px)`,
          }}
        >
          UNIARKIVE
        </span>
      </AbsoluteFill>

      {/* Subtle cinematic overlay */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.8)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
