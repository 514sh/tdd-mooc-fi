import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function readPeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  return parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
}

export function testableParsePeopleCsv(records) {
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
