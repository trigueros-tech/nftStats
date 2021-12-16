import express, { Request, Response } from 'express';
const app = express()
const port = 3000
import { getDataMethod } from "./infra/get-data";
import { getNFTStats } from "./business/get-nft-stats";
import { SourceBlockchain, SourceEnum, SourceFile } from "./types/Source";

const source: SourceFile = {
    type: SourceEnum.FromFile,
    path: __dirname + "/../assets/Sample2/metadatas/"
}
const source2: SourceBlockchain = { type: SourceEnum.FromBlockchain, address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" }


app.get('/', (req: Request, res: Response) => {
    getNFTStats(getDataMethod(source2)).then(x => {
        var data = JSON.stringify(x, null, 2);
        res.send(data);
    }).catch(e => res.send(JSON.parse(e)))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})