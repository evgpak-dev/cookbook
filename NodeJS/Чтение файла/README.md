## How to Import and Use It

```javascript
import { readFile } from "./file-reader.mjs";

async function main() {
  const targetFile = "sample.log";

  try {
    let lineNumber = 0;

    for await (const line of readFile(targetFile)) {
      lineNumber++;
      console.log(`[#${lineNumber}] ${line}`);

      if (lineNumber >= 10) {
        console.log("\nReached first 10 lines, stopping early.");
        break;
      }
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File not found: ${targetFile}`);
    } else {
      console.error(`Failed to read file: ${error.message}`);
    }
  }
}

main();
```
