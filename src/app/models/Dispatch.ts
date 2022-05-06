import { Stock } from './stock'
import { Dispatch_stock } from './dispatch_stock.model'
import { Stock_Office } from './stock_office.model'

export interface Dispatch{
    id: number;
    code: string
    idOrigin: number
    idDestiny: number
    dateCreate: string
    dateDispatched: string
    dateReceived: string
    idState: number
    idUser: number
    unity: string
    stock: Stock[]
    // tslint:disable-next-line: variable-name
    stock_office: Stock_Office[]
    // tslint:disable-next-line: variable-name
    dispatch_stock: Dispatch_stock[];
    stateText: string
}
export interface DispatchGet extends Dispatch {
    userOriginDescription: string;
    userDestinyDescription: string;
    officeOriginDesription: string;
    officeDestinyDescription: string;
    stateDescription: string;
}
