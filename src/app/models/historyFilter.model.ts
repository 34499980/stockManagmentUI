import { TableProperties } from "./table-properties.model";

export interface HistoryFilter  extends TableProperties{  
    userName: string;   
    dateProcesFrom: string;
    dateProcesTo: string;
    idOffice: number;
    action: number;

   
}