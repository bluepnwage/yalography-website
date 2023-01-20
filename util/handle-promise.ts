type PromiseReturn<T> = ["success", T] | ["error", Error];

export async function handlePromise<T>(promise: Promise<T>): Promise<PromiseReturn<T>> {
  try {
    const data = await promise;
    return ["success", data];
  } catch (error) {
    return ["error", error as Error];
  }
}
