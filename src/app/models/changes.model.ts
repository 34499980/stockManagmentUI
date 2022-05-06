import { Sale } from "./sale.model";
import { StockChanges } from "./stock";

export interface Changes {
    id: number;
    dateProces: Date;
    idUser: number;
    amount: number;
    refer: string;
    idOffice: number;
    idState: number;
    stock: StockChanges[];
}
export interface CalculateChanges {
    changes: Changes;
    sale: Sale;
}

