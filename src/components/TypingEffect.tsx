"use client";

import React, { useState, useEffect } from "react";

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 1500,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[currentPhraseIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    delayBetweenPhrases,
  ]);

  return (
    <span className="text-2xl sm:text-3xl text-white font-medium h-10 inline-block drop-shadow-md">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypingEffect;
