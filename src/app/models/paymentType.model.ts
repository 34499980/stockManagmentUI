export interface PaymentType {
    id: number;
    creditCard?: CreditCard;
}
export interface CreditCard {
    cardNumber: number;
    security: number;
    name: string;
    identity: number;
}

