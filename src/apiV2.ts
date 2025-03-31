/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeEmptyParams } from "./apiV1";
import { AWS_CREDS } from "./constants";
import axios from "./features/services/AxiosInstance";
import { ExchangeRate } from "./types";

export const getUserByName = async (name: {
  firstName: string,
  middleName: string,
  lastName: string
}) => {
  const { firstName, middleName, lastName } = name;
  const result = await axios.get(`${AWS_CREDS.ADMIN_API_URL}/admin/search-by-name`, {
    params: {
      firstName,
      middleName,
      lastName
    }
  });
  return result.data.Users;
};

export const getUserByEmail = async (email: string) => {
  //return await axios.get(`${AWS_CREDS.ADMIN_API_URL}/users/${email}`);
  const result = await axios.get(`${AWS_CREDS.ADMIN_API_URL}/admin/users-by-email/${email}`);
  //return data.User
  return result.data.User;
};

export const updateAccount = async (userID: string, payload: any) => {
  const result = await axios.put(
    `${AWS_CREDS.ADMIN_API_URL}/admin/accounts/${userID}`,
    payload,
  );
  return result;
};

export const getTotalConversion = async (id: string) => {
  return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V2}/admin/treasury/total-conversion/${id}`);
};

export const updateMaxBalance = async ({
  Currency,
  MaxBalance
}: {
  Currency: string;
  MaxBalance: string;
}) => {
  const body = {
    MaxBalance
  };
  return await axios.put(`${AWS_CREDS.ADMIN_API_URL_V2}/admin/treasury/max-balance/${Currency}`, body);
};

export const getMaxBalance = async (currency: string) => {
  return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V2}/admin/treasury/max-balance/${currency}`);
};

export const getRatesHistory = async (fromCurrency: string, toCurrency: string, params: {
  StartDate?: string;
  limit?: number;
  NextToken?: string;
}) => {
  removeEmptyParams(params);
  return await axios.get<{
    ExchangeRateHistoryList: ExchangeRate[];
    NextToken?: string;
  }>(`${AWS_CREDS.ADMIN_API_URL_V2}/admin/v2-rates/history/${fromCurrency}/${toCurrency}`, {
    params,
  });
};

export const getRatesV2 = async (from: string = "NGN", to: string = "USD") => {
  return await axios.get(`${AWS_CREDS.ADMIN_API_URL_V2}/admin/v2-rates/${from}/${to}`);
};

export const updateRatesV2 = async (from: string = "NGN", to: string = "USD", payload: any) => {
  return await axios.put(`${AWS_CREDS.ADMIN_API_URL_V2}/admin/v2-rates/${from}/${to}`, payload);
};
