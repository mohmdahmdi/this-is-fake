import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

/**
 * Generic CSV reader
 * @param fileName - CSV file path relative to project root
 * @param headers - column headers to map each row
 */
export async function readCsv<T>(fileName: string, headers: string[]): Promise<T[]> {
  const csvFilePath = path.resolve(process.cwd(), "src", fileName);
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  return new Promise((resolve, reject) => {
    parse(
      fileContent,
      {
        delimiter: ",",
        columns: headers,
        skip_empty_lines: true,
        trim: true,
      },
      (error, result: T[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}
