// import { EventEmitter } from "events";

const color_map = {
  black: "\x1b[30m", // Black
  red: "\x1b[31m", // Red
  green: "\x1b[32m", // Green
  yellow: "\x1b[33m", // Yellow
  blue: "\x1b[34m", // Blue
  magenta: "\x1b[35m", // Magenta
  cyan: "\x1b[36m", // Cyan
  white: "\x1b[37m", // White
  grey: "\x1b[90m", // Grey
  orange: "\x1b[38;5;214m", // Orange
  pink: "\x1b[38;5;213m", // Pink
  brown: "\x1b[38;5;94m", // Brown
  purple: "\x1b[38;5;93m", // Purple
  olive: "\x1b[38;5;100m", // Olive
  dark_red: "\x1b[38;5;124m", // Dark Red
  dark_green: "\x1b[38;5;22m", // Dark Green
  dark_yellow: "\x1b[38;5;58m", // Dark Yellow
  dark_blue: "\x1b[38;5;18m", // Dark Blue
  dark_magenta: "\x1b[38;5;90m", // Dark Magenta
  dark_cyan: "\x1b[38;5;30m", // Dark Cyan
  light_red: "\x1b[38;5;210m", // Light Red
  light_green: "\x1b[38;5;120m", // Light Green
  light_yellow: "\x1b[38;5;228m", // Light Yellow
  light_blue: "\x1b[38;5;153m", // Light Blue
  light_magenta: "\x1b[38;5;177m", // Light Magenta
  light_cyan: "\x1b[38;5;159m", // Light Cyan
  bright_red: "\x1b[91m", // Bright Red
  bright_green: "\x1b[92m", // Bright Green
  bright_yellow: "\x1b[93m", // Bright Yellow
  bright_blue: "\x1b[94m", // Bright Blue
  bright_magenta: "\x1b[95m", // Bright Magenta
  bright_cyan: "\x1b[96m", // Bright Cyan
  bright_white: "\x1b[97m", // Bright White
  bg_black: "\x1b[40m", // Background Black
  bg_red: "\x1b[41m", // Background Red
  bg_green: "\x1b[42m", // Background Green
  bg_yellow: "\x1b[43m", // Background Yellow
  bg_blue: "\x1b[44m", // Background Blue
  bg_magenta: "\x1b[45m", // Background Magenta
  bg_cyan: "\x1b[46m", // Background Cyan
  bg_white: "\x1b[47m", // Background White
  bg_grey: "\x1b[100m", // Background Grey
  bg_bright_red: "\x1b[101m", // Background Bright Red
  bg_bright_green: "\x1b[102m", // Background Bright Green
  bg_bright_yellow: "\x1b[103m", // Background Bright Yellow
  bg_bright_blue: "\x1b[104m", // Background Bright Blue
  bg_bright_magenta: "\x1b[105m", // Background Bright Magenta
  bg_bright_cyan: "\x1b[106m", // Background Bright Cyan
  bg_bright_white: "\x1b[107m", // Background Bright White
} as const;

type ColorMap = keyof typeof color_map;

type LogTypes = "info" | "warn" | "error" | "debug";

const DEFAULT_NAMESPACE = "shop";

interface LoggerOptions {
  namespace?: string;
  show_namespace?: boolean;
  namespace_color?: ColorMap;
  disable_logs?: boolean;
}

class Logger {
  private readonly namespace: string = DEFAULT_NAMESPACE;
  private readonly show_namespace: boolean = false;
  private readonly disable_logs: boolean = false;
  private readonly colorMap: Record<string, string> = {
    default: color_map.white,
    info: color_map.green,
    warn: color_map.yellow,
    error: color_map.red,
    debug: color_map.grey,
    [this.namespace.toLowerCase()]: color_map.magenta,
  };

  constructor ({
    namespace, //
    namespace_color = "magenta",
    show_namespace = true,
    disable_logs = false,
  }: LoggerOptions) {
    // super();
    this.show_namespace = show_namespace;
    this.disable_logs = disable_logs;
    if (namespace) {
      this.namespace = namespace;
      this.colorMap[namespace.toLowerCase()] = color_map[namespace_color];
    }
  }

  private padZero (num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  private formatTimestamp (date: Date): string {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  private log (type: LogTypes, args: unknown[]): void {
    if (this.disable_logs) return;

    const timestamp = this.formatTimestamp(new Date());
    let is_object = false;
    let is_string = false;

    let message_root = "";

    // timestamp color
    const timestamp_color = this.colorMap.default;
    message_root += timestamp_color;
    // timestamp data
    message_root += `[${timestamp}] `;

    if (this.namespace.trim().length && this.show_namespace) {
      // namespace color
      const namespace_color = this.colorMap[this.namespace.toLowerCase()] || this.colorMap.default;
      message_root += namespace_color;
      // namespace data
      message_root += `[${this.namespace.toLowerCase()}] `;
    }

    // type color
    const type_color = this.colorMap[type.toLowerCase()] || this.colorMap.default;
    message_root += type_color;
    // type data
    message_root += `[${type.toUpperCase()}]: `; // .padEnd(9);

    // message color
    const message_color = this.colorMap.default;
    message_root += message_color;

    const is_contain_objects = args.find((arg) => typeof arg === "object");
    if (is_contain_objects) {
      is_object = true;
    } else {
      is_string = true;
    }

    if (is_object) {
      const [first_arg, ...rest] = args;
      if (typeof first_arg === "string") {
        message_root += `${first_arg}`;
        if (console.groupCollapsed) {
          console.groupCollapsed(`${message_root}`);
          for (const arg of rest) {
            console.log(arg);
          }
          console.groupEnd();
        }
      } else {
        if (console.groupCollapsed) {
          console.groupCollapsed(`${message_root}`);
          for (const arg of args) {
            console.log(arg);
          }
          console.groupEnd();
        }
      }
    }

    if (is_string) {
      for (const arg of args) {
        message_root += `${arg as string} `;
      }
      console.log(message_root);
    }

    // this.emit("log");
  }

  info (...args: unknown[]): void {
    this.log("info", args);
  }

  warn (...args: unknown[]): void {
    this.log("warn", args);
  }

  error (...args: unknown[]): void {
    this.log("error", args);
  }

  debug (...args: unknown[]): void {
    this.log("debug", args);
  }

  get_instance (options: LoggerOptions): Logger {
    const new_logger_instance = new Logger({
      ...options,
    });

    return new_logger_instance;
  }
}

export const logger = new Logger({
  show_namespace: true,
  namespace: DEFAULT_NAMESPACE,
});
