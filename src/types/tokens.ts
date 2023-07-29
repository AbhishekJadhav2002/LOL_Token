export type Token = {
    "id": number;
    "contract": string;
    "decimal": number;
    "symbol": string;
    "name": string;
    "gasLimit"?: number;
};

export type Chains = "bsc" | "eth";

export type TransactionLog = {
    _id: string;
    chain: Chains;
    args?: any[];
    fragment: any;
    name: string;
    createdAt: string;
}
