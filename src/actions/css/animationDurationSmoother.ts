import type { Action } from "svelte/action";

export const CSSAnimationDurationSmoother: Action<Element> = (node) => {
  const state: {
    active: boolean;
    previous: {
      [key: string]:
        | {
            duration: number;
            progress: number;
          }
        | undefined;
    };
  } = {
    active: true,
    previous: {},
  };

  function process(animation: Animation) {
    const previous = state.previous[animation.id];
    const { progress: _progress, duration: _duration } =
      animation.effect!.getComputedTiming();

    let [progress, duration] = [_progress, _duration].map((v) =>
      parseFloat(v!.toString()),
    );

    if (previous && previous.duration !== duration) {
      progress = (previous.progress * duration) / previous.duration;

      animation.currentTime = duration + progress * duration;
    }

    state.previous[animation.id] = { duration, progress };
  }

  function frame() {
    if (!state.active) return;

    node.getAnimations().forEach(process);

    requestAnimationFrame(frame);
  }

  frame();

  return {
    destroy() {
      state.active = false;
    },
  };
};
