import { NFT } from "../types/Nft";

export async function getNFTStats(getMetadataMethod: () => Promise<NFT[]>): Promise<any> {
    const allMetadata = await getMetadataMethod();

    let stats = {};

    for (const nft of allMetadata) {
        for (let attribute of nft.attributes) {

            if (!stats[attribute.trait_type]) {
                stats[attribute.trait_type] = { [attribute.value]: 1 }
            } else {
                if (!stats[attribute.trait_type][attribute.value]) {
                    stats[attribute.trait_type][attribute.value] = 1
                } else {
                    stats[attribute.trait_type][attribute.value]++
                }
            }
        }
    }
    return stats;
}