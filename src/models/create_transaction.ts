import { Currency } from "../types";

export interface CreateTransaction {
    UserIdentifier: string;
    TransactionState: string;
    TransactionType: string;
    Description: string;
    UserEmail: string;
    AccountName: string;
}

export interface CreateUSDDebitTransaction extends CreateTransaction {
    Amount: number;
    VirtualAccountIdentifier: string;
    DebitBalance: boolean;
    Currency: Currency | string;
}
export interface CreateMakePaymentTransaction extends CreateTransaction {
    UsdAmount: number,
    NgnAmount: number,
    VendorRate: number,
    CustomerRate: number,
    RecipientBank: string,
    RecipientAccountNumber: string,
    VendorName: string,
    VendorTransactionId: string,
    SessionId: string
}

export enum VendorsEnum {
    PAYSTACK = "PAYSTACK",
    FINCRA = "FINCRA",
    WAZA = "WAZA"
}