import fs from "node:fs";
import readline from "node:readline";

/**
 * An async generator that reads a file line by line.
 *
 * @param {string} filePath - The path to the file.
 * @param {Object} [options] - Optional stream configurations.
 * @param {BufferEncoding} [options.encoding='utf8'] - The text encoding (default: 'utf8').
 * @returns AsyncGenerator
 */
export async function* readFile(filePath, options = {}) {
  const { encoding = "utf8", ...streamOptions } = options;

  const fileStream = fs.createReadStream(filePath, {
    encoding,
    ...streamOptions,
  });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  try {
    for await (const line of rl) {
      yield line;
    }
  } finally {
    rl.close();
    fileStream.destroy();
  }
}

export default readLines;
