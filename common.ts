const iterationsFromEnv = Deno.env.get("ITERATIONS");
export const ITERATIONS = iterationsFromEnv
  ? parseInt(iterationsFromEnv, 10)
  : 10_000_000;

export function doIntenseWork(n: number): number {
  // Simulate heavy CPU work (e.g., Fibonacci)
  let a = 0,
    b = 1;
  for (let i = 0; i < 100; i++) {
    const temp = a;
    a = b;
    b = temp + b;
  }
  return a + n; // Return value tied to input
}
