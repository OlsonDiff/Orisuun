'use client'
import { useState, useEffect } from "react";

const useInView = (options) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, inView];
};

export default useInView;
