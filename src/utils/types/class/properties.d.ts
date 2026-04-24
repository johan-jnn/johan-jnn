export type Attributes<C> = {
  [K in keyof C as C[K] extends Function ? never : K]: C[K];
};
