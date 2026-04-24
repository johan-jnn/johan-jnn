import fs from "node:fs";
import { Model } from "./model";

export class Collection<
  Type extends typeof Model,
  Instance extends InstanceType<Type> = InstanceType<Type>,
  PkAttribute extends keyof Instance = keyof Instance,
  PrimaryKey = {
    [K in PkAttribute]: Instance[K];
  }[PkAttribute],
> {
  public static load<
    Type extends typeof Model,
    Instance extends InstanceType<Type> = InstanceType<Type>,
    PkAttribute extends keyof Instance = keyof Instance,
  >(
    model: Type,
    pattern: string | string[],
    pk_attribute: PkAttribute,
  ): Collection<Type, Instance, PkAttribute> {
    const instances: Instance[] = fs.globSync(pattern).map((file) => {
      //@ts-ignore
      return model.loadSync<Instance>(file);
    });

    return new this(model, instances, pk_attribute);
  }

  private repository: Map<PrimaryKey, Instance> = new Map();
  constructor(
    private readonly model: Type,
    instances: Instance[],
    private readonly pk_attribute: PkAttribute,
  ) {
    for (const instance of instances) {
      const pk = instance[pk_attribute] as PrimaryKey;
      this.repository.set(pk, instance);
    }
  }

  find(pk: PrimaryKey): Instance | undefined {
    return this.repository.get(pk);
  }
  findOrFail(pk: PrimaryKey): Instance {
    if (!this.repository.has(pk)) {
      throw new Error(`${this.model}#${pk} not found.`);
    }
    return this.find(pk)!;
  }

  all<
    Iterative extends boolean,
    Type extends "entries" | "keys" | "instances",
    Item = {
      entries: [PrimaryKey, Instance];
      keys: PrimaryKey;
      instances: Instance;
    }[Type],
    R = Iterative extends true ? MapIterator<Item> : Item[],
  >(type: Type, iterative: Iterative): R {
    const method = (
      {
        keys: "keys",
        entries: "entries",
        instances: "values",
      } as const
    )[type];
    const iterator = this.repository[method]() as MapIterator<Item>;

    return (iterative ? iterator : Array.from(iterator)) as R;
  }

  first(): Instance | undefined {
    return this.all("instances", true).next().value;
  }
  firsts(n: number): Instance[] {
    const result: Instance[] = [];
    const items = this.all("instances", true);

    while (n > 0) {
      const item = items.next().value;
      if (!item) {
        break;
      }
      result.push(item);
    }
    return result;
  }

  filter(
    where: (
      key: PrimaryKey,
      instance: Instance,
      position: number,
    ) => boolean | "break",
  ) {
    const instances: Instance[] = [];

    const iterator = this.all("entries", true);
    let i = 0;
    while (1) {
      const { value } = iterator.next();
      if (!value) {
        break;
      }
      const filter_result = where(...value, i);
      if (filter_result === "break") {
        break;
      }
      if (filter_result) {
        instances.push(value[1]);
      }
      i++;
    }

    return new Collection(this.model, instances, this.pk_attribute);
  }
}
