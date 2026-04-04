import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Roboto";

const { fontFamily } = loadFont();

const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 150], [1, 1.2]);
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("scene1.mp3")} />
      <Img
        src="https://img.freepik.com/fotos-premium/fundo-colorido-da-cidade-do-metaverso-cyberpunk-arte-conceitual-pintura-digital-ilustracao-de-fantasia_743201-132.jpg"
        style={{
          transform: `scale(${zoom})`,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity,
        }}
      >
        <h1
          style={{
            fontFamily,
            color: "#0ff",
            fontSize: 80,
            textAlign: "center",
            textShadow: "0 0 20px #0ff",
            padding: "0 40px",
          }}
        >
          Nel 2084, il mondo come lo conoscevamo...
          <br />
          non esiste più.
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const detectiveZoom = spring({
    frame,
    fps,
    config: { damping: 12 },
    from: 0,
    to: 1,
  });

  const textOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("scene2.mp3")} />
      <Img
        src="https://img.freepik.com/fotos-premium/fundo-colorido-da-cidade-do-metaverso-cyberpunk-arte-conceitual-pintura-digital-ilustracao-de-fantasia_743201-132.jpg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.5)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src="https://e7.pngegg.com/pngimages/536/247/png-clipart-magnifying-glass-detective-sherlock-holmes-magnifying-glass-glass-photography.png"
          style={{
            transform: `scale(${detectiveZoom})`,
            width: "50%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>
      <Sequence from={60}>
         <Audio src={staticFile("explosion.mp3")} volume={0.5} />
      </Sequence>
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <h2
          style={{
            fontFamily,
            color: "white",
            fontSize: 60,
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            padding: "20px 40px",
            opacity: textOpacity,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          "La legge si ferma. Io no."
        </h2>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shake = Math.sin(frame / 2) * 10;

  const textTranslate = spring({
      frame,
      fps,
      from: 500,
      to: 0,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("scene3.mp3")} />
      <Img
        src={staticFile("drive_image.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translateX(${shake}px)`,
          filter: "contrast(1.5) grayscale(0.8)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <h1
          style={{
            fontFamily,
            color: "#f00",
            fontSize: 100,
            textAlign: "center",
            textShadow: "0 0 30px #f00",
            transform: `translateY(${textTranslate}px)`,
          }}
        >
          IN ARRIVO
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const BookTrailer = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={150}>
        <Scene1 />
      </Sequence>
      <Sequence from={150} durationInFrames={150}>
        <Scene2 />
      </Sequence>
      <Sequence from={300} durationInFrames={150}>
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
};
