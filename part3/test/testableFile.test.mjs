import { describe, test } from "vitest";
import { expect } from "chai";
import { testableParsePeopleCsv, readPeopleCsv } from "../src/testableFile.mjs";

/**
 * The issue with untestable3 is that the reading and manipulation of data is in one function.
 * It violates the SRP. Therefore, it is better to break apart the function into two.
 * 1. Read the data from a file and return the object.
 * 2. Manipulate the data.
 *
 * Now we need to tests three scenarios
 * 1. The reading of the file(actual file)
 * 2. The parsing of an example line in a file.
 * 3. The parsing of an example line in a file but no age info.
 */

describe("Testable File: Parse People CSV", () => {
  test("The reading of the file(actual file)", async () => {
    const filePath = "./test/people.csv";
    let fileOutput = await readPeopleCsv(filePath);
    const expectedOutput = [
      ["Loid", "Forger", "", "Male"],
      ["Anya", "Forger", "6", "Female"],
      ["Yor", "Forger", "27", "Female"],
    ];
    expect(fileOutput).to.be.a("array");
    expect(fileOutput).to.deep.equal(expectedOutput);
  });

  test("The parsing of a line all info are provided", () => {
    const sampleInput = [["Anya", "Forger", "6", "Female"]];
    const expectedOutput = {
      age: 6,
      firstName: "Anya",
      gender: "f",
      lastName: "Forger",
    };
    const parsedCSV = testableParsePeopleCsv(sampleInput);
    expect(parsedCSV).to.be.a("array");
    expect(parsedCSV).to.have.length(1);
    expect(parsedCSV[0]).to.deep.equal(expectedOutput);
  });

  test("The parsing of a line but no age provided", () => {
    const sampleInput = [["Anya", "Forger", "", "Female"]];
    const expectedOutput = {
      firstName: "Anya",
      gender: "f",
      lastName: "Forger",
    };
    const parsedCSV = testableParsePeopleCsv(sampleInput);
    expect(parsedCSV).to.be.a("array");
    expect(parsedCSV).to.have.length(1);
    expect(parsedCSV[0]).to.not.contain.key("age");
    expect(parsedCSV[0]).to.deep.equal(expectedOutput);
  });
});
