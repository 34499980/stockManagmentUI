import { Item } from "./item.model";
import { Office } from "./office.model";
import { Stock } from "./stock";

export class Discount {
    id: number;
    dateFrom: Date;
    dateTo: Date;
    percent: number;
    idPaymentType: number;
    idStock: number;
    idUser: number;
    stock: Stock;
    offices: Office[];
    paymentTypeList: discount_paymentType[];

}
export interface DiscountGet extends Discount {
    userDescription: string;
    paymentTypeDescription: string;
    stockDescription: string;
    state: number;

}
export interface DiscountPost extends Discount {
    paymentType: number[]
    officesIds: number[];
    override: boolean;
}
export interface discount_paymentType {
    id: number;
    idPaymentType: number;
    idDiscount: number;
}

