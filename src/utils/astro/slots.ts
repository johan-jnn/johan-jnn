import type { AstroGlobal } from "astro";

export class AstroSlot {
  constructor(
    private readonly slots: AstroGlobal["slots"],
    public readonly slotName: string,
  ) {}

  exists() {
    return this.slots.has(this.slotName);
  }
  render() {
    return this.slots.render(this.slotName);
  }

  async filled() {
    return this.exists() && !!(await this.render());
  }
  async empty() {
    return !(await this.filled());
  }
}
