// switch.ts
import { doIntenseWork, ITERATIONS } from "./common.ts";

Deno.bench({
  name: "switch",
  group: "dispatch-comparison",
  fn: () => {
    for (let i = 0; i < ITERATIONS; i++) {
      switch (i % 3) {
        case 0:
          doIntenseWork(0);
          break;
        case 1:
          doIntenseWork(1);
          break;
        case 2:
          doIntenseWork(2);
          break;
      }
    }
  },
});