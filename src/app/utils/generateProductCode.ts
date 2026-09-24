const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateProductCode(): string {
  return Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}