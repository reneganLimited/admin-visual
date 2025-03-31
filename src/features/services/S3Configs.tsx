import { AWS_CREDS } from "./AmazonService";

const s3Config = {
  aws_project_region: AWS_CREDS.REGION,
  aws_s3_region: AWS_CREDS.REGION,
  aws_s3_bucket: AWS_CREDS.S3_BUCKET,
};

export default s3Config;
