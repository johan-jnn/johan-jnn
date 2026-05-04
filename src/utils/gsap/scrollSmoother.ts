import { ScrollSmoother } from "gsap/ScrollSmoother";

export function ifSmoother(callback: (smoother: ScrollSmoother) => any) {
  const smoother = ScrollSmoother.get();
  if (smoother) callback(smoother);
}
