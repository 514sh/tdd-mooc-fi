import { argv } from "node:process";

import { RLEParser, readRLE } from "./rle.mjs";
import { Plane } from "./plane.mjs";

export function run(bornCount, rle){
    const rleParser = new RLEParser(rle)
    const parsedRLE = rleParser.output()
    let plane = new Plane(parsedRLE)
    let allPlanes = []
    let currentBorn = plane.getBornCount();

    while(currentBorn <= bornCount){
        allPlanes = [...allPlanes, plane.currentState()]
        plane = plane.next();
        currentBorn += plane.getBornCount();
    }
    return allPlanes;
}

const main = async () => {
    const filename = argv[2];
    const rle = await readRLE(filename);
    const bornCount = argv[3];
    let output = run(bornCount, rle);
    for(const plane of output){
        const state = plane.join("\n");
        console.log(state);
        console.log("\n");
    }
}
// main()