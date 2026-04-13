import { useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * useParallax — A hook to create a scroll-driven parallax offset.
 *
 * @param offset - The maximum distance the element should travel (positive or negative).
 * @param range - The [start, end] scroll positions in pixels where the transform occurs.
 * @returns A MotionValue to be applied to a framer-motion property (e.g., `y`).
 */
export function useParallax(offset: number = 100, range: [number, number] = [0, 2000]): MotionValue<number> {
  const { scrollY } = useScroll();
  return useTransform(scrollY, range, [0, offset]);
}
