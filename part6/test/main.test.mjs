import { describe, test } from "vitest";
import { expect } from "chai";
import { run } from "../src/main.mjs";

describe("test output after given born cell is achieved", () => {
    test("Blinker state after given new born cell is achieved", () => {
        const expectedOutput = [
            [
                "....",
                ".xxx",
                "....",
                "...."
            ],
            [
                "..x.",
                "..x.",
                "..x.",
                "...."
            ],
        ]
        console.log(run(2, "4b$b3o$4b$4b!"))
        expect(run(8, "4b$b3o$4b$4b!")).to.deep.equal([
            expectedOutput[0],
            expectedOutput[1],
            expectedOutput[0],
            expectedOutput[1],
            expectedOutput[0],
            // expectedOutput[1],
            // expectedOutput[0],
        ]);
        // expect(run(4, "4b$b3o$4b$4b!")).to.deep.equal(expectedOutput[0]);
        // expect(run(6, "4b$b3o$4b$4b!")).to.deep.equal(expectedOutput[1]);
        // expect(run(10, "4b$b3o$4b$4b!")).to.deep.equal(expectedOutput[1]);
    })
})