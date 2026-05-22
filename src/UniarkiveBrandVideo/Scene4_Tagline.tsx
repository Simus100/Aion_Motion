import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene4_Tagline: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [15, 60], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [15, 75], [10, 0], {
    easing: Easing.out(Easing.cubic),
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
          transform: `translateY(${translateY}px)`,
          opacity,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#C5A059", // Pale Gold
            fontSize: "72px",
            fontWeight: "400",
            fontStyle: "italic", // Adds elegance to the tagline
            letterSpacing: "0.05em",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: "1.4",
          }}
        >
          Ogni storia apre un mondo.
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
