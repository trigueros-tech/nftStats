export enum SourceEnum {
    FromFile,
    FromBlockchain
}

export type SourceFile = {
    path: string;
    type: SourceEnum.FromFile
}

export type SourceBlockchain = {
    address: string;
    type: SourceEnum.FromBlockchain
}

export type Source = SourceFile | SourceBlockchain
