export type NFT = {
    name?: string;
    description?: string;
    external_url?: string;
    image: string;
    attributes: Trait[];
    properties?: Properties;
    compiler?: string;
}

export type Trait = {
    trait_type: string;
    value: string
}

export type Properties = {
    category: string;
    files: File[];
    creators: any[];
}

export type File = {
    uri: string;
    type: string;
}
