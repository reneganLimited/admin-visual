/* eslint-disable @typescript-eslint/no-explicit-any */
import { AWS_CREDS } from "./constants";
import axios from "./features/services/AxiosInstance";
import {
  TransactionStateEnum,
  TransactionTypeEnum,
  ITransaction,
  ISingleTransaction,
} from "./types";

export const getTransactions = async (params: {
  TransactionType?: TransactionTypeEnum;
  TransactionState?: TransactionStateEnum;
  StartDate?: string;
  limit?: number;
  UserEmail?: string;
  NextToken?: string;
  enrich?: boolean;
}) => {
  removeEmptyParams(params);
  return await axios.get<{
    TransactionsSummaryList: ITransaction[];
    NextToken?: string;
  }>(`${AWS_CREDS.ADMIN_API_URL}/admin/transactions`, {
    params,
  });
};

export const cancelTransaction = async (id: string, Status: any) => {
  return await axios.put(
    `${AWS_CREDS.ADMIN_API_URL}/admin/transactions/${id}`,
    { TransactionState: Status },
  );
};

export const getTransaction = async (id: string) => {
  return await axios.get<ISingleTransaction>(
    `${AWS_CREDS.ADMIN_API_URL}/admin/transactions/${id}`,
  );
};

export const updateTransaction = async (
  id: string,
  Status: any,
  Note?: any,
) => {
  return await axios.put(
    `${AWS_CREDS.ADMIN_API_URL}/admin/transactions/${id}`,
    { TransactionState: Status, Note },
  );
};


export const updateUser = async (UserID: string, payload: any) => {
  return await axios.put(
    `${AWS_CREDS.ADMIN_API_URL}/admin/users/${UserID}`,
    payload,
  );
};

function removeEmptyParams(params: any) {
  Object.keys(params).forEach((key) => {
    if (params[key] === null || params[key] === undefined) {
      delete params[key];
    }
  });
}

