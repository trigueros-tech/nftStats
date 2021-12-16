import fs from "fs"
import { readFile } from 'fs/promises';
import { ethers } from "ethers";
import fetch from 'cross-fetch';
import { NFT } from "../types/Nft";
import { Source, SourceEnum } from "../types/Source";

export function getDataMethod(source: Source): () => Promise<NFT[]> {

    let getMethods: () => Promise<NFT[]>;
    switch (source.type) {
        case SourceEnum.FromFile:
            getMethods = () => getDataFromFile(source.path);
            break;
        case SourceEnum.FromBlockchain:
            getMethods = () => getDataFromBlockchain(source.address);
            break;
        default:
            throw new Error(`Invalid option: ${source}`);
    }
    return getMethods;
}

export async function getDataFromFile(path: string): Promise<NFT[]> {
    const files = fs.readdirSync(path)
    let filesContent: NFT[] = []
    for (const file of files) {
        const fileContent = await readFile(path + file);
        const jsonContent = JSON.parse(fileContent.toString())

        filesContent.push(jsonContent);
    }

    return filesContent;
}

export async function getDataFromBlockchain(contractAddress: string): Promise<NFT[]> {
    // var bsc = "https://bsc-dataseed.binance.org/";
    var eth = "https://cloudflare-eth.com"
    const provider = new ethers.providers.JsonRpcProvider(eth);

    const abi = [
        "function tokenURI(uint256 _tokenId) external view returns (string)",
    ];

    const contract = new ethers.Contract(contractAddress, abi, provider);
    // console.log("Contract address:", contract.address);

    let count = 1;
    let limit = 10;
    let returnValue: NFT[] = [];
    while (count < limit) {
        let url = await contract.tokenURI(count)
        // console.log(url)

        const ipfsRegex = /ipfs:\/\/(.*)/

        let match = url.match(ipfsRegex)
        if (match) {
            url = "https://gateway.pinata.cloud/ipfs/" + match[1]
            // console.log("New url = " + url)
        }

        const response = await fetch(url);

        const nft = await response.json() as NFT;
        returnValue.push(nft);
        count++;
    }

    return returnValue;
}