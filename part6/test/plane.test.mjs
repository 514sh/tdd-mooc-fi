import { describe, test } from "vitest";
import { expect } from "chai";
import { Plane } from "../src/Plane.mjs";

describe("test plane in 4x4", () => {
    test("I can count my neighbors", () => {
        const state = [
            "....",
            ".xxx",
            "....",
            "....",
        ]
        const expectedAliveNeighborsCount = [
            [1,2,3,2,],
            [1,1,2,1,],
            [1,2,3,2,],
            [0,0,0,0,],
        ]
        const plane = new Plane(state);
        expect(plane.aliveNeighbors()).to.deep.equal(expectedAliveNeighborsCount);
    })

    test("Blinker: I know my next state", () => {
        const state = [
            "....",
            ".xxx",
            "....",
            "....",
        ]
        const expectedNextState = [
            "..x.",
            "..x.",
            "..x.",
            "....",
        ]
        const plane = new Plane(state);
        const nextPlane = plane.next();
        expect(nextPlane.currentState()).to.deep.equal(expectedNextState);
        expect(nextPlane.next().currentState()).to.deep.equal(state);
    })
})