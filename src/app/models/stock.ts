import { NumberFormatStyle } from '@angular/common'
import { SafeResourceUrl, SafeValue } from '@angular/platform-browser'
import { Office } from './office.model'
import { Stock_Office } from './stock_office.model'

export interface Stock{
    id: number
    code: string;
    qr?: string
    idState: number;
    price?: number
    name: string
    brand: string
    model: string  
    description: string
    file?: any
    idOffice: number;
    stock_Office?: Stock_Office[]
    office?: Office;
    unity?: number;
    count?: number;
}
export interface StockGet extends Stock{
    officeDescription: string;
    idCountry: number;
}
export interface StockPost extends Stock{   
    idCountry: number;  
}
export interface StockChanges extends Stock {
    check: boolean;
}
