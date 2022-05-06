import { Office } from "./office.model";
import { Stock } from "./stock";

export interface Stock_Office {
    id: number;
    idOffice: number;
    idStock: number;
    unity: number;
    price: number;

    stock?: Array<Stock>
    office?: Array<Office>
}
