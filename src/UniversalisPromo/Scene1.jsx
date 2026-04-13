import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subY = interpolate(frame, [30, 60], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center">
      {/* Background glow */}
      <div
        className="absolute w-[800px] h-[800px] bg-blue-600 rounded-full blur-[200px] opacity-30"
        style={{
          transform: `scale(${interpolate(frame, [0, 450], [1, 1.5])})`,
        }}
      />

      <div className="z-10 flex flex-col items-center">
        <h1
          className="text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          UNIVERSALIS PRODUZIONI
        </h1>
        <p
          className="text-3xl text-gray-300 mt-8 font-light tracking-widest uppercase"
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Costruiamo il futuro digitale
        </p>
      </div>
    </AbsoluteFill>
  );
};
