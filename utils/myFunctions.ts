export function getFileExtension(filename: string) {
  const match = filename.match(/\.([^./]+)$/);

  return match ? match[1] : null;
}
