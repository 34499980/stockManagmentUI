import { TableProperties } from "./table-properties.model";

export interface SalesFilter extends TableProperties {  
    id: number;
    userName: string;
    dateProcesFrom: string;
    dateProcesTo: string;    
    idOffice: number;
    idState: number;
}