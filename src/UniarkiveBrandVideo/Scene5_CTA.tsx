import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const { fontFamily: playfairFont } = loadPlayfair();
const { fontFamily: montserratFont } = loadMontserrat();

export const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [15, 60], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [60, 105], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineScale = interpolate(frame, [60, 105], [0, 1], {
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
          flexDirection: "column",
          gap: "60px",
        }}
      >
        {/* Main Brand Logo */}
        <span
          style={{
            fontFamily: playfairFont,
            color: "#C5A059", // Pale Gold
            fontSize: "80px",
            fontWeight: "400",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: logoOpacity,
          }}
        >
          UNIARKIVE
        </span>

        {/* Minimalist CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            opacity: ctaOpacity,
          }}
        >
          <span
            style={{
              fontFamily: montserratFont,
              color: "#F2F2F2",
              fontSize: "24px",
              fontWeight: "300",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
            }}
          >
            Apri l'archivio
          </span>
          {/* Accent Line */}
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#C5A059",
              transform: `scaleX(${lineScale})`,
              transformOrigin: "center",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
