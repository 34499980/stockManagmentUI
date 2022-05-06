import { DecimalPipe } from "@angular/common";
import { PaymentType } from "./paymentType.model";
import { Sale_stock } from "./sale-stock.model";
import { Stock } from "./stock";
import { Stock_Office } from "./stock_office.model";

export interface Sale {
    id: number;
    dateProces: Date;
    idUser: number;
    amount: number;
    refer: string;
    idOffice: number;
    idState: number;
    stock: Stock[];
    // tslint:disable-next-line: variable-name
    stock_office: Stock_Office[];
    sale_stock: Sale_stock[];
    paymentType: PaymentType;
}
export interface SaleGet extends Sale {
    userDescription: string;
    officeDescription: string;
    stateDescripcion: string;
}
