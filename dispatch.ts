// dispatch.ts
import { doIntenseWork, ITERATIONS } from "./common.ts";

const handlers: Record<number, (n: number) => number> = {
  0: doIntenseWork,
  1: doIntenseWork,
  2: doIntenseWork,
};

Deno.bench({
  name: "dispatch",
  group: "dispatch-comparison",
  fn: () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const key = i % 3;
      handlers[key](key);
    }
  },
});