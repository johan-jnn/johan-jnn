import type { AstroGlobal } from "astro";

export class AstroSlot {
  constructor(
    private readonly slots: AstroGlobal["slots"],
    public readonly name: string,
  ) {}

  get exists() {
    return this.slots.has(this.name);
  }
  render() {
    return this.slots.render(this.name);
  }

  async filled() {
    return this.exists && !!(await this.render());
  }
  async empty() {
    return !(await this.filled());
  }

  /**
   * Ternary check for the slot existance
   * @param exists The returned value if the slot exists
   * @param doesntExist The returned value if the slot does not exist
   */
  existTernary<Y, N>(
    //@ts-ignore
    exists: Y = this.name,
    //@ts-ignore
    doesntExist: N = null,
  ): Y | N {
    return this.exists ? exists : doesntExist;
  }

  /**
   * Ternary check for fill state of the slot
   * @param filled The returned value if the slot is filled
   * @param empty The returned value if the slot is not filled
   */
  async filledTernary<Y, N>(
    //@ts-ignore
    filled: Y = this.name,
    //@ts-ignore
    empty: N = null,
  ): Promise<Y | N> {
    return (await this.filled()) ? filled : empty;
  }
}
