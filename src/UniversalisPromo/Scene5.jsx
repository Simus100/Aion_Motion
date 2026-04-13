import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Globe, Mail, Phone } from "lucide-react";

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12 },
  });

  const contentOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black flex flex-col items-center justify-center p-24">
      {/* Dynamic background */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-black to-purple-900/20"
        style={{
          opacity: interpolate(frame, [0, 60], [0, 1]),
        }}
      />

      <div className="z-10 flex flex-col items-center max-w-5xl w-full">
        <h2
          className="text-8xl font-black mb-8 text-center text-white"
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleScale
          }}
        >
          Pronto a crescere?
        </h2>

        <p
          className="text-3xl text-gray-400 mb-20 text-center"
          style={{ opacity: contentOpacity }}
        >
          Contattaci oggi per trasformare la tua visione in realtà.
        </p>

        <div
          className="flex flex-col gap-8 w-full max-w-2xl bg-gray-900/50 p-12 rounded-3xl backdrop-blur-sm border border-gray-800"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${interpolate(frame, [60, 90], [50, 0], { extrapolateRight: "clamp" })}px)`
          }}
        >
          <div className="flex items-center gap-6 text-2xl">
            <Globe className="text-blue-400" size={40} />
            <span className="font-medium">www.universalis.it</span>
          </div>
          <div className="flex items-center gap-6 text-2xl">
            <Mail className="text-purple-400" size={40} />
            <span className="font-medium">admin@universalis.it</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
