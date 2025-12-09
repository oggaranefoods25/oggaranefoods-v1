import { useEffect, useRef } from "react";

type ScrollRevealOptions = IntersectionObserverInit & {
  once?: boolean;
  initialClass?: string;
  animationClass?: string;
  delay?: number;
};

export const useScrollReveal = <T extends HTMLElement>(
  {
    once = true,
    initialClass = "opacity-0 translate-y-8",
    animationClass = "animate-fade-in-up",
    delay = 0,
    root = null,
    rootMargin = "0px",
    threshold = 0.15,
  }: ScrollRevealOptions = {}
) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.classList.add(...initialClass.split(" "));

    let timeoutId: number | null = null;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = window.setTimeout(() => {
              element.classList.add(...animationClass.split(" "));
              element.classList.remove(...initialClass.split(" "));
            }, delay);

            if (once) {
              obs.unobserve(entry.target);
            }
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [animationClass, delay, initialClass, once, root, rootMargin, threshold]);

  return elementRef;
};
