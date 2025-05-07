"use client";

import { useRef, useState, useEffect } from 'react';

/**
 * Custom hook to handle lazy loading of sections
 * Uses IntersectionObserver to detect when a section is about to enter the viewport
 * @param preloadMargin - Distance from the viewport to start loading (default: 300px)
 * @returns An object with the container ref and whether the section should load
 */
export function useLazyLoadSection(preloadMargin: string = '300px') {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    const currentRef = containerRef.current;
    if (!currentRef) return;

    // If IntersectionObserver is not supported, load immediately
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    // Create observer with options
    const observer = new IntersectionObserver(
      (entries) => {
        // If the element is about to enter the viewport, load it
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          // Once loaded, stop observing
          observer.disconnect();
        }
      },
      {
        rootMargin: `${preloadMargin} 0px`,
        threshold: 0,
      }
    );

    // Start observing the container
    observer.observe(currentRef);

    // Cleanup on unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [preloadMargin]);

  return { containerRef, shouldLoad };
} 