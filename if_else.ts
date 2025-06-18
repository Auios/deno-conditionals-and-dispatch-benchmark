// if_else.ts
import { doIntenseWork, ITERATIONS } from "./common.ts";

Deno.bench({
  name: "if-else",
  group: "dispatch-comparison",
  fn: () => {
    for (let i = 0; i < ITERATIONS; i++) {
      if (i % 3 === 0) {
        doIntenseWork(0);
      } else if (i % 3 === 1) {
        doIntenseWork(1);
      } else {
        doIntenseWork(2);
      }
    }
  },
});
