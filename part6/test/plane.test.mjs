import { describe, test } from "vitest";
import { expect } from "chai";
import { Plane } from "../src/Plane.mjs";

describe("test plane", () => {
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

    test("test Blinker: I know my next state", () => {
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

        expect(plane.getBornCount()).to.equal(0);
        expect(nextPlane.getBornCount()).to.equal(2);
        expect(nextPlane.next().getBornCount()).to.equal(2);
    })

    test("test Glider: I know my next state", () => {
        const state = [
            [
                "..x.", 
                "x.x.", 
                ".xx.", 
                "....", 
            ],
            [
                ".x..",
                "..xx",
                ".xx.",
                "....",
            ],
            [
                "..x.",
                "...x",
                ".xxx",
                "...."
            ],
            [
                "....",
                ".x.x",
                "..xx",
                "..x."
            ],
            [
                "....",
                "...x", 
                ".x.x", 
                "..xx", 
            ],
        ]
        const plane = new Plane(state[0]);
        expect(plane.next().currentState()).to.deep.equal(state[1]);
        expect(plane.next().next().currentState()).to.deep.equal(state[2]);
        expect(plane.next().next().next().currentState()).to.deep.equal(state[3]);
        expect(plane.next().next().next().next().currentState()).to.deep.equal(state[4]);

        expect(plane.next().getBornCount()).to.deep.equal(2);
        expect(plane.next().next().getBornCount()).to.deep.equal(2);
        expect(plane.next().next().next().getBornCount()).to.deep.equal(2);
        expect(plane.next().next().next().next().getBornCount()).to.deep.equal(2);

    })

    test("test Block: I know my next state", () => {
        const state = [
            "....",
            ".xx.",
            ".xx.",
            "....",
        ]
        const plane = new Plane(state);
        const nextPlane = plane.next();
        expect(nextPlane.currentState()).to.deep.equal(state);
        expect(nextPlane.next().currentState()).to.deep.equal(state);

        expect(nextPlane.getBornCount()).to.deep.equal(0);
        expect(nextPlane.next().getBornCount()).to.deep.equal(0);
        expect(nextPlane.next().next().getBornCount()).to.deep.equal(0);
    })
})