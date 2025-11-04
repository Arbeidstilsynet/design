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

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  );
}
