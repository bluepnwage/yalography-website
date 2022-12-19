export async function handlePromise<T>(promise: Promise<T>): Promise<[T | null, null | string]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error.message];
    } else {
      return [null, "An error ocurred"];
    }
  }
}
