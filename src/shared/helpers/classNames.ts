type ObjectClassName = Record<string, unknown>;

type ClassName = string | ObjectClassName | Array<string | ObjectClassName>;

/**
 * A simple utility for conditionally joining classNames together.
 */
export const classNames = (...args: ClassName[]): string => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
    } else if (typeof arg === "object" && arg !== null) {
      classes.push(classNames(...Object.keys(arg).filter((k) => arg[k])));
    }
  });

  return classes.filter((className) => className).join(" ");
};
