import { CONFIG_FILE_NAME } from './constants';

export function getConfigCwdPath(): string {
  return `${process.cwd()}\\${CONFIG_FILE_NAME}`
}
