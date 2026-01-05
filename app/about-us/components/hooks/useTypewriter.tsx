"use client";
import { useEffect, useState } from "react";

export function useTypewriter(phrases: string[], typingSpeed = 100, pauseTime = 2000) {
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    let timer: NodeJS.Timeout;

    if (!deleting) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pauseTime);
        }
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length - 1 === 0) {
          setDeleting(false);
          setPhraseIndex((i) => i + 1);
        }
      }, typingSpeed / 2);
    }

    return () => clearTimeout(timer);
  }, [display, deleting, phraseIndex, phrases, typingSpeed, pauseTime]);

  return display;
}
