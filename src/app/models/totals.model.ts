import { DecimalPipe } from "@angular/common";

export interface Totals {
    code: string;
    name: string;
    unity: number;
    price: number;
    subTotal: number;
    discount: number;
    total: number;

}