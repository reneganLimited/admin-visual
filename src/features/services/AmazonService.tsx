import * as AWS from "aws-sdk";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

export const REGION = process.env.REACT_APP_REGION!;

export let cognitoClient = new CognitoIdentityProvider({ region: REGION });

const myConfig = new AWS.Config();
myConfig.update({ region: REGION });

export let AWS_CREDS = {
  CACHED_ADMIN_USER_POOL_ID: process.env.REACT_APP_ADMIN_USER_POOL_ID!,
  CACHED_ADMIN_USER_POOL_CLIENT_ID:
    process.env.REACT_APP_ADMIN_USER_POOL_CLIENT_ID!,
  APIGATEWAY_URL: process.env.REACT_APP_APIGATEWAY_URL!,
  STAGE: process.env.REACT_APP_STAGE!,
  REGION: process.env.REACT_APP_REGION!,
  S3_BUCKET: process.env.REACT_APP_S3_BUCKET!,
  IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID!,
  DOJAH_APP_ID: process.env.REACT_APP_DOJAH_APP_ID!,
  DOJAH_PUBLIC_KEY: process.env.REACT_APP_DOJAH_PUBLIC_KEY!,
  MINIMUM_DEPOSIT: process.env.REACT_APP_MINIMUM_DEPOSIT!,
  INTERNAL_API_CREDS: process.env.REACT_APP_INTERNAL_API_CREDS!,
};
