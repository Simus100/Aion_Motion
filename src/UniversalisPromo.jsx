import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";

export const UniversalisPromo = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animations
  const logoIn = spring({ frame, fps, config: { damping: 12 } });
  const logoScale = interpolate(logoIn, [0, 1], [0.5, 1]);

  const titleOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [30, 45], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center font-sans text-white">
      {/* Intro Sequence (Frames 0 - 90) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill className="flex flex-col items-center justify-center">
          <Img
            src="https://www.universalis.it/images/logo_universalis_circle_HD_trasparente_final_v_4.png"
            style={{ transform: `scale(${logoScale})` }}
            className="w-64 h-64 mb-8"
          />
          <h1
            style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
            className="text-7xl font-bold tracking-widest uppercase mb-4"
          >
            Universalis
          </h1>
          <p
            style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
            className="text-2xl text-gray-400 tracking-wider uppercase"
          >
            Intelligenza Artificiale • Journal • Lab
          </p>
        </AbsoluteFill>
      </Sequence>

      {/* Lab Products Sequences (Frames 90 - 240) */}
      <Sequence from={90} durationInFrames={50}>
        <ProductSlide
          name="ORACULUM"
          description="Sistema di consultazione e vaticinio digitale."
          image="https://www.universalis.it/images/oraculumW.webp"
        />
      </Sequence>

      <Sequence from={140} durationInFrames={50}>
        <ProductSlide
          name="FABULADECK"
          description="Strumenti creativi per la narrazione e il gioco."
          image="https://www.universalis.it/images/fabuladeck2W.webp"
        />
      </Sequence>

      <Sequence from={190} durationInFrames={50}>
        <ProductSlide
          name="AION IA"
          description="Sperimentazioni di intelligenza artificiale applicata."
          image="https://www.universalis.it/images/AIONW.webp"
        />
      </Sequence>

      {/* Outro Sequence (Frames 240 - 300) */}
      <Sequence from={240}>
        <AbsoluteFill className="flex flex-col items-center justify-center">
          <Img
            src="https://www.universalis.it/images/logo_universalis_circle_HD_trasparente_final_v_4.png"
            className="w-48 h-48 mb-8"
          />
          <h2 className="text-5xl font-bold tracking-widest mb-4">
            VISITA IL SITO
          </h2>
          <p className="text-3xl text-blue-400 font-mono">
            www.universalis.it
          </p>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const ProductSlide = ({ name, description, image }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 15 } });
  const yOffset = interpolate(progress, [0, 1], [100, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill className="flex items-center justify-center px-24">
      <div
        style={{ transform: `translateY(${yOffset}px)`, opacity }}
        className="flex flex-row items-center w-full justify-center gap-16"
      >
        <Img src={image} className="w-1/3 rounded-xl shadow-2xl" />
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-6xl font-bold mb-6 tracking-wider text-blue-300">
            {name}
          </h2>
          <p className="text-3xl leading-relaxed text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
