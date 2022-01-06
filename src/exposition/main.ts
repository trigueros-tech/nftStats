import { getDataMethod } from "../infra/get-data";
import { getNFTStats } from "../business/get-nft-stats";
import { SourceEnum, Source, SourceBlockchain, SourceFile } from "../types/Source";
import { toConsole } from "./format";

async function main(source: Source) {

    var stats = await getNFTStats(getDataMethod(source));
    toConsole(stats);
}

const source: SourceFile = {
    type: SourceEnum.FromFile,
    path: __dirname + "/../../assets/Sample2/metadatas/"
}
const source2: SourceBlockchain = { type: SourceEnum.FromBlockchain, address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" }

main(source2)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });