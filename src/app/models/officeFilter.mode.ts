import { TableProperties } from "./table-properties.model";

export interface OfficeFilter extends TableProperties {  
    name: string;     
    idCountry: number;
    postalCode: number;
    address: string;
    active: boolean;

   
}