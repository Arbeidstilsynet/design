// Helper to create mock files without memory issues
export function createMockFile(
  name: string,
  sizeInBytes: number,
  type?: string,
): File {
  // Create a minimal file without actually filling it with content
  const file = new File([""], name, { type: type ?? "text/plain" });
  // Override the size property
  Object.defineProperty(file, "size", {
    value: sizeInBytes,
    writable: false,
  });
  return file;
}

export function createMockFileInKb(
  name: string,
  sizeInKB: number,
  type?: string,
): File {
  return createMockFile(name, sizeInKB * 1024, type);
}
