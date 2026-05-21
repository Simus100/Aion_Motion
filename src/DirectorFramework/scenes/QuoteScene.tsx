import React from 'react';
import { Quote } from 'lucide-react';
import { QuoteSceneData } from '../schema';
import { AnimatedText } from '../components/AnimatedText';
import { Background } from '../components/Background';

export const QuoteScene: React.FC<{ data: QuoteSceneData }> = ({ data }) => {
  const {
    quote,
    author,
    textColor = 'white',
    backgroundColor = 'black',
    backgroundConfig,
    animationStyle = 'blur-in',
  } = data;

  return (
    <Background config={backgroundConfig} backgroundColor={backgroundColor} className="flex flex-col items-center justify-center p-16 text-center">
      <div className="max-w-4xl flex flex-col items-center">
        <Quote className="w-16 h-16 mb-8 opacity-50" style={{ color: textColor }} />
        <AnimatedText
          text={quote}
          animationStyle={animationStyle}
          className="text-6xl font-light italic leading-relaxed"
          style={{ color: textColor }}
        />
        {author && (
          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-1 opacity-50" style={{ backgroundColor: textColor }} />
            <AnimatedText
              text={author}
              animationStyle="fade-up"
              delay={60}
              className="text-3xl font-bold uppercase tracking-widest"
              style={{ color: textColor }}
            />
          </div>
        )}
      </div>
    </Background>
  );
};
