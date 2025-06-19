export default async function copyCode(code: string) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(code);
    }
  } catch (error) {
    console.error("Copy failed:", error);
    return false;
  }
}
