import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [touchActive, setTouchActive] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setTouchActive(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const onTouchEnd = () => {
      setTouchActive(false);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Only set up mouse move for non-touch
    if (!isTouch) {
      window.addEventListener('mousemove', onMouseMove);
    } else {
      // Touch listeners
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    // Attach hover listeners to interactable elements dynamically
    const attachListeners = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
        
        // Mobile equivalent interactions
        el.addEventListener('touchstart', handleHoverStart, { passive: true });
        el.addEventListener('touchend', handleHoverEnd, { passive: true });
      });
    };

    // Initial attachment
    attachListeners();

    // Setup an observer if new interactive elements are added (like a modal or late render)
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) shouldReattach = true;
      });
      if (shouldReattach) {
        // Simple way to handle it: clean up, then attach
        document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
          el.removeEventListener('mouseenter', handleHoverStart);
          el.removeEventListener('mouseleave', handleHoverEnd);
          el.removeEventListener('touchstart', handleHoverStart);
          el.removeEventListener('touchend', handleHoverEnd);
        });
        attachListeners();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      observer.disconnect();
    };
  }, [isTouch]);

  // Framer motion variants
  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: isTouch && !touchActive ? 0 : 1, // Hide if touch is inactive
      opacity: isTouch && !touchActive ? 0 : 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.8,
      backgroundColor: 'rgba(99, 102, 241, 0.15)', // Indigo semi-transparent
      border: '1px solid rgba(99, 102, 241, 0.4)',
      backdropFilter: 'blur(2px)', 
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center border border-white dark:border-white bg-white/30"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Inner dot */}
        <motion.div 
          className="w-1.5 h-1.5 bg-white rounded-full"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* For touch devices: emit a "ripple" effect when touched */}
      {isTouch && touchActive && !isHovering && (
         <motion.div
           initial={{ scale: 0.5, opacity: 0.8 }}
           animate={{ scale: 2.5, opacity: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="fixed top-0 left-0 w-12 h-12 bg-indigo-500 rounded-full pointer-events-none z-[9998]"
           style={{ 
             x: mousePosition.x - 24, 
             y: mousePosition.y - 24 
           }}
         />
      )}
    </>
  );
}
