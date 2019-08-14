export class ArrayUtils {
  public static arraysEqual<T>(array1: T[], array2: T[], valueFn?: (item: T) => any): boolean {
    if (!valueFn) {
      valueFn = (item: T) => item;
    }

    return array1.length === array2.length
      && array1.every((item, index) => valueFn(item) === valueFn(array2[index]));
  }
}
