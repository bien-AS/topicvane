import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import * as React from "react";

/** useCountUp — animate a number from 0 → value on mount (GSAP), for metrics,
 *  scores, and stat cards. Returns a ref to attach to the element whose
 *  textContent should count up. Honors prefers-reduced-motion: the final value
 *  is set instantly, no animation. Numbers render with tabular numerals at the
 *  call site (add the `tabular-nums` class). */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  value: number,
  opts?: { duration?: number; format?: (v: number) => string },
) {
  const ref = React.useRef<T>(null);
  const { duration = 1.1, format = (v: number) => Math.round(v).toLocaleString() } = opts ?? {};

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        el.textContent = format(value);
        return;
      }
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
      });
    },
    { dependencies: [value] },
  );

  return ref;
}
