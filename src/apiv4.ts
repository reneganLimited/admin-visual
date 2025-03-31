/* eslint-disable @typescript-eslint/no-explicit-any */
import { AWS_CREDS } from "./constants";
import axios from "./features/services/AxiosInstance";
import { removeEmptyParams } from "./apiV1";
import { TransactionStateEnum } from "./types";

export const getWallets = async (params: any) => {
    removeEmptyParams(params);
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/Renegan-wallets`, {
        params,
    });
};

export const getExternalAccounts = async () => {
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/va-list-external-accounts`);
};

export const getLiquidationAddresses = async () => {
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/va-list-liquidation-addresses`);
};

export const createTransfer = async (payload: any) => {
    return await axios.post(
        `${AWS_CREDS.ADMIN_API_URL_V4}/admin/va-offramp-tranfer`,
        payload,
    );
};

export const createUSDCTransfer = async (payload: any) => {
    return await axios.post(
        `${AWS_CREDS.ADMIN_API_URL_V4}/admin/external-wallet-tranfer`,
        payload,
    );
};

export const listV4Transfers = async (params: any) => {
    removeEmptyParams(params);
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/va-list-transfers`, {
        params,
    });
};

export const createInternalTransfer = async (payload: any) => {
    return await axios.post(
        `${AWS_CREDS.ADMIN_API_URL_V4}/admin/internal-wallet-tranfer`,
        payload,
    );
};


export const listV4KYCs = async (params: any) => {
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/list-provider-kyc`, {
        params,
    });
};


export const fetchV4Details = async (userID: any) => {
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/get-provider-kyc/${userID}`);
};

export const getPartnerAccounts = async () => {
    return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V4}/admin/va-list-partner-wallets`);
};

export interface ReturnV4DepositPayload {
    TransactionIdentifier: string;
    NewTransactionState: TransactionStateEnum;
    Note?: string;
}

export const returnV4UsdCreditTransaction = async (payload: ReturnV4DepositPayload) => {
    return await axios.put(
      `${AWS_CREDS.ADMIN_API_URL_V4}/admin/process_non_completed_deposit`,
      payload,
    );
};
export const flagV4Transaction = async (
    transactionID: string,
    note: string,
    newState: TransactionStateEnum,
  ) => {
    return await axios.put(
      `${AWS_CREDS.ADMIN_API_URL_V4}/admin/process_non_completed_deposit`,
      {
        TransactionIdentifier: transactionID,
        NewTransactionState: newState,
        Note: note,
      },
    );
  };

  export const processV4Transaction = async (
    transactionID: string,
  ) => {
    return await axios.put(
      `${AWS_CREDS.ADMIN_API_URL_V4}/admin/process_non_completed_deposit`,
      {
        TransactionIdentifier: transactionID,
        NewTransactionState: TransactionStateEnum.COMPLETED,
      },
    );
  };