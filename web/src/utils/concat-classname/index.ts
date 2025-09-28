type ClassNames = string | undefined | null | false;

export function concatClassNames(...classNames: ClassNames[]): string {
  return classNames
    .filter((className): className is string => typeof className !== 'boolean' && !!className)
    .join(' ');
}