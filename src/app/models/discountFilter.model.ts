import { TableProperties } from "./table-properties.model";

export interface DiscountFilter extends TableProperties {
    createFrom: string;
    createTo: string;
    percentFrom: number;
    percentTo: number;
    idOffice: number;
}
