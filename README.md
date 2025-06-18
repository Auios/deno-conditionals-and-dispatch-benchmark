# Deno Conditional Dispatch Benchmark

This repository compares the performance of different conditional dispatch methods in Deno.

## Background

I was curious about the performance differences between `if-else` chains, `switch` statements, and dispatch objects (object maps) in Deno.

In compiled languages like C++, `switch` statements can be optimized by the compiler into a "jump table" for O(1) lookup, which is much faster than sequential `if-else` chains.

## Methods Benchmarked

1. **`if-else` chain** - Standard conditional blocks
2. **`switch` statement** - Switch on integer values
3. **Dispatch table** - Object map with handler functions

## The Test

Each method runs in a loop (default 10,000,000 iterations) using `Deno.bench`. On each iteration, I pick a handler based on `i % 3` and run some CPU-intensive work to simulate real processing.

The point is to measure just the dispatch overhead.

## Running the Benchmark

To run the benchmarks, ensure you have [Deno](https://deno.com) installed, then execute:

```bash
deno task bench
```

You can customize the number of iterations by setting the `ITERATIONS` environment variable or by modifying the constant in the [common.ts](./common.ts) file:

```bash
ITERATIONS=1000000 deno task bench
```

## Output

```txt
% deno task bench
Task bench deno bench --allow-env ./if_else.ts ./switch.ts ./dispatch.ts
    CPU | Apple M4 Max
Runtime | Deno 2.3.6 (aarch64-apple-darwin)

file://./deno-if-switch-dispatch-benchmark/if_else.ts

benchmark   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------- ----------------------------- --------------------- --------------------------

group dispatch-comparison
if-else            277.6 ms           3.6 (275.5 ms … 286.5 ms) 277.4 ms 286.5 ms 286.5 ms


file://./deno-if-switch-dispatch-benchmark/switch.ts

benchmark   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------- ----------------------------- --------------------- --------------------------

group dispatch-comparison
switch             277.9 ms           3.6 (275.3 ms … 283.8 ms) 278.7 ms 283.8 ms 283.8 ms


file://./deno-if-switch-dispatch-benchmark/dispatch.ts

benchmark   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------- ----------------------------- --------------------- --------------------------

group dispatch-comparison
dispatch           288.0 ms           3.5 (283.2 ms … 294.9 ms) 288.6 ms 294.9 ms 294.9 ms
```

## Benchmark Results

The results below represent the average time per iteration for a loop of 10,000,000 operations on the system described below. The values are taken from the most recent benchmark run.

| Method     | Time/iter (avg) |
| :--------- | --------------: |
| `if-else`  |      `277.6 ms` |
| `switch`   |      `277.9 ms` |
| `dispatch` |      `288.0 ms` |

---

### System Information

- **Deno Version:** `2.3.6`
- **OS:** `darwin`
- **CPU:** `Apple M4 Max (aarch64)`

## Conclusion

Turns out all three approaches perform basically the same when you only have a few conditions. V8's JIT compiler is pretty good at optimizing this stuff, so the theoretical advantages you might expect from switch statements don't really matter in practice.

I was honestly hoping the dispatch object would come out ahead - it feels like it should be more efficient since you're just doing a property lookup instead of evaluating conditions. But the dispatch table approach is slightly slower (288ms vs ~278ms), likely due to the overhead of object property lookup and function calls. For simple branching like this, the straightforward `if-else` and `switch` statements are marginally faster, probably because V8 can optimize the direct comparisons more effectively than the indirect function calls through the object.
