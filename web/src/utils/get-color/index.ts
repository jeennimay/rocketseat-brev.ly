export function getColor(name: string): string {
  if (!name) return 'inherit';
  if (name === 'currentColor') return name;
  const variableName = `--color-${name}`;
  const rootStyles = getComputedStyle(document.documentElement);
  const colorValue = rootStyles.getPropertyValue(variableName).trim();
  return colorValue || 'inherit';
}
