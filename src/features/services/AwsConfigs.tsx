import { AWS_CREDS } from "./AmazonService";

const awsConfig = {
  aws_project_region: AWS_CREDS.REGION,
  aws_app_analytics: "enable",
  aws_user_pools: "enable",
  aws_user_pools_id: AWS_CREDS.CACHED_ADMIN_USER_POOL_ID,
  aws_user_pools_mfa_type: "OFF",
  aws_user_pools_web_client_id: AWS_CREDS.CACHED_ADMIN_USER_POOL_CLIENT_ID,
  aws_user_settings: "enable",
  authenticationFlowType: "USER_PASSWORD_AUTH",
  aws_cognito_region: AWS_CREDS.REGION,
  aws_cognito_identity_pool_id: AWS_CREDS.IDENTITY_POOL_ID,
  aws_s3_bucket: AWS_CREDS.S3_BUCKET,
  aws_s3_region: AWS_CREDS.REGION,
};

export default awsConfig;
