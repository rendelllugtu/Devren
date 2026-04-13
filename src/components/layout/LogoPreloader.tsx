import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LogoPreloader — plays the logo animation video once per session,
 * then fades out to reveal the page beneath.
 */
export default function LogoPreloader({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [exiting, setExiting] = useState(false);

  const dismiss = () => {
    setExiting(true);
    sessionStorage.setItem('devren_intro_seen', '1');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-dismiss after the video ends
    const handleEnded = () => dismiss();
    video.addEventListener('ended', handleEnded);

    // Safety fallback: dismiss after 8 s even if video stalls
    const fallback = setTimeout(dismiss, 8000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#06061100' }}
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-[#060611]" />

          {/* Subtle radial glow behind logo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(99,102,241,0.18),transparent)] pointer-events-none" />

          {/* Logo video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 w-64 sm:w-80 md:w-96"
          >
            <video
              ref={videoRef}
              src="/assets/logovid.mp4"
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Skip button — fades in after 1.5 s */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            onClick={dismiss}
            className="relative z-10 mt-10 text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200 tracking-widest uppercase"
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
