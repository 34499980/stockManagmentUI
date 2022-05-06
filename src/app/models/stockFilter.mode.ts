import { TableProperties } from "./table-properties.model";

export interface StockFilter extends TableProperties{  
    name: string    
    code: number;
    brand: string;
    model: string;
    idOffice: number;
    idCountry: number;

   
}