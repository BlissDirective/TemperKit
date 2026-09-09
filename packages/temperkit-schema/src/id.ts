export function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function toJobId(canonical: string): string {
  const a = fnv1a(canonical).toString(16).padStart(8, "0");
  const b = fnv1a(`tk:${canonical}`).toString(16).padStart(8, "0");
  return `tk_${a}${b}`;
}

export function brandNameFromHost(host: string): string {
  const bare = host.replace(/^www\./, "").split(".")[0] ?? host;
  return bare
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function parseHost(url: string): string {
  return new URL(url).hostname.toLowerCase();
}
