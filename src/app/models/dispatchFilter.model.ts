import { TableProperties } from "./table-properties.model";

export interface DispatchFilter extends TableProperties {
    code: number;
    userName: string;
    createdDateFrom: string;
    createdDateTo: string;
    receivedDateFrom: string;
    receivedDateTo: string;
    dispatchedDateFrom: string;
    dispatchedDateTo: string;
    idState: Number;
    idDestiny: number;
    idCountry: number;
}
