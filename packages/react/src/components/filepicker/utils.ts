export function createMockFile(
  name: string,
  sizeInKB: number,
  type?: string,
): File {
  const content = new Array(sizeInKB * 1024).fill("a").join("");
  return new File([content], name, { type: type ?? "text/plain" });
}
