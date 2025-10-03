export function toCamelCase(str: string): string {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w+)/g, (_$1, $2, $3) => $2.toUpperCase() + $3.toLowerCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, (match) => match.toLowerCase());
}

export function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function toKebabCase(str: string): string {
  return str
    .replace(/\.?([A-Z]+)/g, (_$1, $2) => '-' + $2.toLowerCase())
    .replace(/[-_\s]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/\.?([A-Z]+)/g, (_$1, $2) => '_' + $2.toLowerCase())
    .replace(/^_/, '')
    .replace(/[-\s]+/g, '_');
}