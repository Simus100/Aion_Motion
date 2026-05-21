import React from 'react';
import { TitleSceneData } from '../schema';
import { AnimatedText } from '../components/AnimatedText';
import { Background } from '../components/Background';

export const TitleScene: React.FC<{ data: TitleSceneData }> = ({ data }) => {
  const {
    title,
    subtitle,
    textColor = 'white',
    backgroundColor = 'black',
    backgroundConfig,
    animationStyle = 'fade-up',
  } = data;

  return (
    <Background
      config={backgroundConfig}
      backgroundColor={backgroundColor}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <AnimatedText
        text={title}
        animationStyle={animationStyle}
        className="text-7xl font-bold mb-6"
        style={{ color: textColor }}
      />

      {subtitle && (
        <AnimatedText
          text={subtitle}
          animationStyle="fade-up"
          delay={30}
          className="text-4xl font-light opacity-80"
          style={{ color: textColor }}
        />
      )}
    </Background>
  );
};
