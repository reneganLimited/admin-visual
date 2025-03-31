import { FullName } from "aws-sdk/clients/account";

/* eslint-disable @typescript-eslint/no-explicit-any */

export enum AmlScreeningStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  VERIFIED = "VERIFIED",
  DENIED = "DENIED",
  NO_HITS = "NO_HITS",
  TIMEOUT = "TIMEOUT",
}

export enum TransactionOperationEnum {
  FINCRA = "PayoutToFincra",
}

export enum Category {
  KYC = "KYC",
  Transactions = "transactions",
  Policy = "policy",
  Treasury = "treasury",
  Cards = "cards",
  Announcements = "announcements",
  VirtualAccount = "virtual Account",
  Vendors = "vendors",
  Customer = "customer",
  AML = "AML",
  LOOKUP = "Lookup Transaction",
  V4 = "V4",
  CreateTransaction = "Create Transaction",
}

export enum TransactionStateEnum {
  ALL = "",
  PENDING = "PENDING",
  TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  DAILY_LIMIT_EXCEEDED = "DAILY_LIMIT_EXCEEDED",
  WEEKLY_LIMIT_EXCEEDED = "WEEKLY_LIMIT_EXCEEDED",
  KYC_PENDING = "KYC_PENDING",
  KYC_FAILED = "KYC_FAILED",
  DELAYED = "DELAYED",
  REJECTED = "REJECTED",
  MONTHLY_LIMIT_EXCEEDED = "MONTHLY_LIMIT_EXCEEDED",
  IN_REVIEW = "IN_REVIEW",
  PASSED_REVIEW = "PASSED_REVIEW",
  FAILED_REVIEW = "FAILED_REVIEW",
  AMOUNT_TOO_LOW = "AMOUNT_TOO_LOW",
  RETURNED = "RETURNED",
  FURTHER_REVIEW = "FURTHER_REVIEW",
  FLAGGED = "FLAGGED",
  CONVERT_CURRENCY = "CONVERT_CURRENCY",
}

export enum KycStateEnum {
  PENDING = "PENDING",
  INVALID = "INVALID",
  MISMATCH = "MISMATCH",
  SUSPENDED = "SUSPENDED",
  RETRY = "RETRY",
  BIOMETRICS = "BIOMETRICS",
  DOCUMENT_IN_REVIEW = "DOCUMENT_IN_REVIEW",
  DOCUMENT_RETRY = "DOCUMENT_RETRY",
  DENIED = "DENIED",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  ID_INVALID = "ID_INVALID",
  ID_DUPLICATE = "ID_DUPLICATE",
  ID_MISMATCH = "ID_MISMATCH",
  ID_UPLOAD = "ID_UPLOAD",
  FUNDING_DETAILS = "FUNDING_DETAILS",
  LIVENESS_FAILED = "LIVENESS_FAILED",
}
export enum PeopleStateEnum {
  PENDING = "PENDING",
  INVALID = "INVALID",
  MISMATCH = "MISMATCH",
  RETRY = "RETRY",
  DENIED = "DENIED",
  DUPLICATE = "DUPLICATE",
  BVN_FAILED = "BVN_FAILED",
  VERIFIED = "VERIFIED",
  DOCUMENT_UPLOAD = "DOCUMENT_UPLOAD",
  DOCUMENT_IN_REVIEW = "DOCUMENT_IN_REVIEW",
  DOCUMENT_RETRY = "DOCUMENT_RETRY",
  ID_DUPLICATE = "ID_DUPLICATE",
}

export enum KybStateEnum {
  BUSINESS_PENDING = "BUSINESS_PENDING",
  BUSINESS_INVALID = "BUSINESS_INVALID",
  BUSINESS_MISMATCH = "BUSINESS_MISMATCH",
  BUSINESS_DUPLICATE = "BUSINESS_DUPLICATE",
  BUSINESS_FAILED = "BUSINESS_FAILED",
  BUSINESS_RETRY = "BUSINESS_RETRY",
  CONTROLLER_PENDING = "CONTROLLER_PENDING",
  CONTROLLER_INVALID = "CONTROLLER_INVALID",
  CONTROLLER_MISMATCH = "CONTROLLER_MISMATCH",
  CONTROLLER_DUPLICATE = "CONTROLLER_DUPLICATE",
  CONTROLLER_BVN_FAILED = "CONTROLLER_BVN_FAILED",
  CONTROLLER_BVN_PASSED = "CONTROLLER_BVN_PASSED",
  CONTROLLER_RETRY = "CONTROLLER_RETRY",
  CONTROLLER_DENIED = "CONTROLLER_DENIED",
  OWNER_PENDING = "OWNER_PENDING",
  OWNER_INVALID = "OWNER_INVALID",
  OWNER_MISMATCH = "OWNER_MISMATCH",
  OWNER_DUPLICATE = "OWNER_DUPLICATE",
  OWNER_BVN_FAILED = "OWNER_BVN_FAILED",
  OWNER_BVN_PASSED = "OWNER_BVN_PASSED",
  OWNER_RETRY = "OWNER_RETRY",
  OWNER_DENIED = "OWNER_DENIED",
  BUSINESS_DOCUMENT_PENDING = "BUSINESS_DOCUMENT_PENDING",
  PEOPLE_DOCS = "PEOPLE_DOCS",
  DISCLOSURES = "DISCLOSURES",
  BUSINESS_DOCUMENT_IN_REVIEW = "BUSINESS_DOCUMENT_IN_REVIEW",
  BUSINESS_DOCS_RETRY = "BUSINESS_DOCS_RETRY",
  PEOPLE_DOCS_RETRY = "PEOPLE_DOCS_RETRY",
  BUSINESS_DENIED = "BUSINESS_DENIED",
  BUSINESS_VERIFIED = "BUSINESS_VERIFIED",
  AML_FLAGGED = "AML_FLAGGED",
}

export enum KYBTabs {
  BUSINESS = "BUSINESS",
  OWNER = "OWNER",
  CONTROLLER = "CONTROLLER",
}

export enum AMLTabsEnum {
  BUSINESS = "BUSINESS",
  INDIVIDUAL = "INDIVIDUAL",
  MIGRATION = "MIGRATION",
}

export enum TreasuryTabsEnum {
  USD = "USD",
  NGN = "NGN",
}

export enum CardsTabsEnum {
  CARDS = "CARDS",
  TRANSACTIONS = "TRANSACTIONS",
  CARD_CREATION = "CARD_CREATION",
  CARD_WITHDRAWAL = "CARD_WITHDRAWAL",
}

export enum KYCTabsEnum {
  BUSINESS = "BUSINESS",
  INDIVIDUAL = "INDIVIDUAL",
  DENIED = "DENIED",
  AUTO_VERIFICATION_PENDING = "AUTO_VERIFICATION_PENDING",
  AUTO_VERIFIED = "AUTO_VERIFIED",
  PENDING_POLICY = "PENDING_POLICY",
  MANUAL_REVIEW = "MANUAL_REVIEW",
  RETRY = "RETRY",
  V4 = "V4",
  MIGRATION = "MIGRATION",
}

export enum IndividualKYCTabsEnum {
  USER_DETAILS = "BUSINESS",
  FUNDING_DETAILS = "FUNDING_DETAILS",
  BVN_DETAILS = "BVN_DETAILS",
  V4_DETAILS = "V4_DETAILS",
}

export enum KYCDocsTabsEnum {
  IDDOCS = "IDDOCS",
  VERIFF = "VERIFF",
  NIN = "NIN",
}

export enum VendorTabsEnum {
  WAZA = "WAZA",
  FINCRA = "FINCRA",
  PAYSTACK = "PAYSTACK",
  VENDOR_SETTINGS = "VENDOR_SETTINGS",
}

export type TTransactionTypeFilter =
  | "PENDING"
  | "CANCELLED"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "FAILED"
  | "DAILY_LIMIT_EXCEEDED"
  | "WEEKLY_LIMIT_EXCEEDED"
  | "DELAYED"
  | "DAILY_LIMIT_EXCEEDED"
  | "KYC_PENDING"
  | "ALL"
  | "REJECTED"
  | "MONTHLY_LIMIT_EXCEEDED"
  | "IN_REVIEW"
  | "PASSED_REVIEW"
  | "FAILED_REVIEW"
  | "AMOUNT_TOO_LOW"
  | "RETURNED";

export type TTransactionFilter =
  | "PENDING"
  | "CANCELLED"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "FAILED"
  | "DAILY_LIMIT_EXCEEDED"
  | "WEEKLY_LIMIT_EXCEEDED"
  | "DELAYED"
  | "DAILY_LIMIT_EXCEEDED"
  | "KYC_PENDING"
  | "ALL"
  | "REJECTED"
  | "MONTHLY_LIMIT_EXCEEDED"
  | "IN_REVIEW"
  | "PASSED_REVIEW"
  | "FAILED_REVIEW"
  | "AMOUNT_TOO_LOW"
  | "RETURNED";

export type TKYCFilter =
  | "PENDING"
  | "VERIFIED"
  | "BIOMETRICS"
  | "SUSPENDED"
  | "DENIED"
  | "FAILED"
  | "MISMATCH"
  | "INVALID"
  | "RETRY"
  | "ALL"
  | "BIOMETRICS_MISMATCH"
  | "DOCUMENT"
  | "DOCUMENT_RETRY"
  | "DOCUMENT_IN_REVIEW";

export interface ITransaction {
  TransactionIdentifier: string;
  TransactionType: string;
  TransactionState: string;
  UserID: string;
  UserEmail?: string; // Optional since it's not in ISingleTransaction
  FullName?: string; // Optional since it's not in ISingleTransaction
  TotalAmount?: number; // From ISingleTransaction, but not in ITransaction
  FromAmount?: number; // From ITransaction
  FromCurrency?: string; // From ITransaction
  ToBeCompletedBy?: string;
  DepositType?: string;
  SenderName?: string;
  TransactionDetail?: {
    TransactionIdentifier: string;
    FromCurrency: string;
    ToCurrency: string;
    TransactionDomain: string;
    Sender: {
      AccountIdentifier: string;
      FullName: { FirstName: string; MiddleName: string; LastName: string };
      BankName: string;
      AccountNumber: string;
      UserID: string;
      Email?: string;
      Tag?: string;
    };
    Recipient: {
      RecipientIdentifier: string;
      FullName: { FirstName: string; MiddleName: string; LastName: string };
      Country: string;
      Address: {
        StreetAddress: string;
        SecondStreetAddress?: string;
        City: string;
        Country: string;
        StateOrTerritory: string;
        Zipcode: string;
        LGA?: string; // Optional, might not always be applicable
      };
      BankName: string;
      RoutingNumber: string;
      AccountNumber: string;
      AccountType: string;
      Email?: string;
      NickName?: string;
      ResourceType?: string;
    };
    FromAmount: string;
    ToAmount: string;
    Fee: string;
    Description: string;
    WaivedFee?: string;
  };
  AdditionalDetails?: any;
  UpdatedAt: string;
  CreatedAt: string;
  Date?: number;
  ProviderBankBeneficiaryName?: string;
  ProviderSenderName?: string;
  ProviderBankName?: string;
  ProviderBankBeneficiaryAddress?: string;
  ProviderOriginatorName?: string;
  ProviderOriginatorAddress?: string;
  ProviderImad?: string;
  ProviderCustomerId?: string;
  ProviderTransactionId?: string;
  ProviderDepositId?: string;
  ProviderVersion?: string;
  Vendors?: any;
  Type?: string;
  Currency?: string;
}

export interface Note {
  ID?: number;
  Name: string;
  Text: string;
  Date: string;
}
export interface NoteRequestData {
  id?: number;
  name: string;
  text: string;
  date: string;
}

export interface ICardTransaction {
  CardID: string;
  TransactionID: string;
  ThirdPartyID: string;
  TotalAmount: number;
  NetAmount: number;
  Fee: number;
  CreatedAt: string;
  Currency: string;
  Description: string;
  TransactionState: string;
  TransactionType: string;
  Action: string;
  MerchantName: string;
  MerchantCity: string;
  MerchantCountry: string;
  UpdatedAt: string;
  UserID: string;
  thirdPartyFee: number;
  requestID: string;
  TransactionDomain: string;
  Email: string;
  TransactionStateHistory: {
    ModifiedBy?: string;
    TransactionState: string;
    Time: string;
    Reason?: string;
    InternalReason?: string;
  }[];
  IsRefunded?: boolean;
  RelatedTransactionId?: string;
}
export interface ISingleCardTransaction {
  CardID: string;
  TransactionID: string;
  ThirdPartyID: string;
  CardName: string;
  TotalAmount: number;
  NetAmount: number;
  Fee: number;
  CreatedAt: string;
  Currency: string;
  Description: string;
  TransactionState: string;
  TransactionType: string;
  Action: string;
  MerchantName: string;
  MerchantCity: string;
  MerchantCountry: string;
  UpdatedAt: string;
  UserID: string;
  thirdPartyFee: number;
  requestID: string;
  TransactionDomain: string;
  Email: string;
  TransactionStateHistory: ICardTransaction["TransactionStateHistory"];
  IsRefunded?: boolean;
  RelatedTransactionId?: string;
  AdditionalDetails: { [key: string]: string };
}
export interface ISingleTransaction {
  TransactionIdentifier: string;
  TransactionType: string;
  TransactionState: string;
  UserID: string;
  TotalAmount: number;
  ToBeCompletedBy?: string;
  DepositType?: string;
  TransactionDetail: {
    TransactionIdentifier: string;
    FromCurrency: string;
    ToCurrency: string;
    TransactionDomain: string;
    Sender: {
      AccountIdentifier: string;
      FullName: { FirstName: string; MiddleName: string; LastName: string };
      BankName: string;
      AccountNumber: string;
      UserID: string;
    };
    Recipient: {
      RecipientIdentifier: string;
      FullName: { FirstName: string; MiddleName: string; LastName: string };
      Country: string;
      Address: {
        StreetAddress: string;
        SecondStreetAddress: string;
        City: string;
        Country: string;
        StateOrTerritory: string;
        Zipcode: string;
        LGA: string;
      };
      BankName: string;
      RoutingNumber: string;
      AccountNumber: string;
      AccountType: string;
    };
    FromAmount: string;
    ToAmount: string;
    Fee: string;
    Description: string;
  };
  UserEmail?: string;
  AdditionalDetails: any;
  UpdatedAt: string;
  CreatedAt: string;
  ProviderSenderName: string;
  ProviderCustomerId: string;
  ProviderTransactionId: string;
}

export interface IContext {
  setKYCFilter: React.Dispatch<React.SetStateAction<TKYCFilter>>;
  KYCFilter: TKYCFilter;
  setTypeFilter: React.Dispatch<React.SetStateAction<any>>;
  TypeFilter: any;
}
interface Address {
  StreetAddress: string;
  SecondStreetAddress?: string;
  City: string;
  Country: string;
  StateOrTerritory: string;
  Zipcode: string;
  LGA?: string;
}

// interface NationalDetails {
//   FullName?: string;
//   DateOfBirth?: string;
//   PhoneNumbers?: string;
//   Gender?: string;
//   Email?: string;
// }

export enum RecipientType {
  BANK = "BANK",
  TAG = "TAG",
}

export interface NationalDetails {
  businessName?: string;
  fullName?: { firstName?: string; middleName?: string; lastName?: string };
  dateOfBirth?: string;
  phoneNumbers?: string[];
  gender?: string;
  email?: string;
  dateOfIncorporation?: string;
  businessType?: string;
  businessRegistrationNumber?: string;
  address?: string;
  registeredAddress?: {
    StreetAddress: string;
    SecondStreetAddress?: string;
    City?: string;
    Country?: string;
    StateOrTerritory?: string;
    Zipcode?: string;
    LGA?: string;
  };
}
interface StateChangeToDate {
  [key: string]: any;
}

interface IDUploadUrl {
  url?: any;
  expiry?: any;
  basePath?: any;
  path?: any;
}

export interface DocPaths {
  Bucket: string;
  Key: string;
  docType: string;
  fileType: string;
  timeUpdated: string;
}

export interface AdditionalDetails {
  IdPhotoStatus?: "VALID" | "NOT_VALID"; //INVALID value was added due to a bug, INVALID may still be VALID, hence the use of NOT_VALID, backfill needed on Kyc backend
  SelfieUploadUrl?: IDUploadUrl;
  IDUploadUrl?: IDUploadUrl;
  ImageVerificationAttemptsLeft?: any;
  NationalDetails?: NationalDetails;
  NoOfRetriesLeft?: number;
  NoOfUserResetsLeft?: number;
  BusinessRegStatus?: string;
  BusinessRegFailureReasons?: string[];
  Suspected?: any;
  NationalIDStatus?: string;
  NationalIDFailureReasons?: any[];
  DenyReasons?: string[];
  StateChangeToDate?: StateChangeToDate;
  PayoutChangeToDate?: StateChangeToDate;
  C2CLimitChangeToDate?: StateChangeToDate;
  COIUploadUrl?: IDUploadUrl;
  SRUploadUrl?: IDUploadUrl;
  MOAUploadUrl?: IDUploadUrl;
  DocumentsPath?: string;
  DocPaths: DocPaths[];
  DuplicateDetails?: {
    DuplicateBusinessEmail?: string;
    DuplicateBusinessId?: string;
    DuplicateBusinessName?: string;
    DuplicateEmail?: string;
    DuplicateName?: string;
    DuplicateKYCID?: string;
    DuplicateUserId?: string;
    DuplicateUserEmail?: string;
  };
  V4MigrationState?: string;
  BusinessData?: NationalDetails;
  IsDuplicate?: boolean;
  IdFailureReasons?: string[];
  IdStatus?: string;
  IdDetails?: {
    dateOfBirth: string;
    fullName: {
      firstName: "Joshua";
      lastName: "Thompsonbrown";
      middleName: "Isaac";
    };
    gender: string;
  };
}

interface ContactDetails {
  PhoneNumber: string;
  Email: string;
}
interface ImageUploadInput {
  path: string;
  status: string;
  DocumentType: string;
  contentType: string;
  filename: string;
  message: string;
  size: number;
}
interface BeneficialOwner {
  FirstName: string;
  LastName: string;
  NationalIdentifier: string;
  IdentificationDocument: IdentificationDocument;
  DateOfBirth: string;
  Address?: Address;
  PercentageOwnership?: number;
  Document?: ImageUploadInput;
}
interface IdentificationDocument {
  DocumentType: DocumentType;
  DocumentNumber: string;
  IssuingCountry: string;
  IssueDate?: string;
  ExpirationDate?: string;
}
interface AuthorizedSignatory {
  FirstName: string;
  LastName: string;
  NationalIdentifier: string;
  Role?: string;
  Address?: Address;
  IdentificationDocument: IdentificationDocument;
  Document?: ImageUploadInput;
}

export interface BusinessKyc {
  KYCIdentifier?: string;
  BusinessIdentifier?: string;
  UserID?: string;
  BusinessName: string;
  BusinessRegistrationNumber: string;
  NationalIdentifierType: string;
  RegisteredAddress: Address;
  CountryOfIncorporation: string;
  ContactDetails: ContactDetails;
  DateOfIncorporation?: string;
  Industry: string;
  Type: string;
  NationalIdentifier: string;
  BeneficialOwners?: BeneficialOwner[];
  AuthorizedSignatories?: AuthorizedSignatory[];
  BusinessDocuments?: ImageUploadInput[];
  KYCState: KybStateEnum;
  TimeCreated?: string;
  TimeUpdated?: string;
  AdditionalDetails?: AdditionalDetails;
  MonthlyIncome?: string;
  Website?: string;
  FundingSources: string[];
}

export interface AmlScreeningProfile {
  result: AmlProfileResult;
  uuid: string;
  status: number;
}

export interface AmlProfileResult {
  addresses: any[]; // Can keep this as any[] if address data is not yet defined
  aka: string; // Optional alias, can default to an empty string if needed
  aliases: { name: string }[]; // Aliases should be an array of objects with name property
  countryName: string;
  dob: string;
  dob2?: string; // Not in the provided data, made optional
  effectiveDate?: string; // Not in the provided data, made optional
  entryCategory: string;
  entryDesc: string;
  firstName: string;
  govDesignation: string;
  lastName: string;
  levelDesc?: string; // Not in the provided data, made optional
  masterId?: number; // Not in the provided data, made optional
  name: string;
  nationalId?: string; // Not in the provided data, made optional
  otherId?: string; // Not in the provided data, made optional
  passportId: string;
  pob?: string; // Not in the provided data, made optional
  positions: string | null; // Null was present in your data
  prefix?: string; // Not in the provided data, made optional
  primaryName?: string; // Not in the provided data, made optional
  relatedId?: number; // Not in the provided data, made optional
  relationships: any[]; // Can keep this as any[] if relationship data is not yet defined
  remarks?: string; // Not in the provided data, made optional
  sourceName: string;
  sourceWebLinks: string;
  subCatDesc: string | null; // Nullable in the provided data
  suffix?: string; // Not in the provided data, made optional
  touchDate?: string; // Not in the provided data, made optional
  watch: boolean;
  media?: { date?: string; snippet: string; title: string; url: string }[]; // Media array to handle the media data
  entityType: string; // Entity type as "person"
  riskLevel?: string; // Not in the provided data, made optional
  match_score: number; // Match score is a number
}
export interface TokenPayload {
  PreviousTokens: string[];
  NextToken: string;
}
export interface IndividualKyc {
  KYCIdentifier: string;
  UserID?: string;
  FirstName: string;
  MiddleName?: string;
  LastName: string;
  DateOfBirth: string;
  NationalIdentifierType: string;
  Address: Address;
  PhoneNumber: any;
  Email: string;
  NationalIdentifier: string;
  IdentificationDocument: IdentificationDocument;
  KYCState: KycStateEnum;
  TimeCreated?: string;
  TimeUpdated?: string;
  AdditionalDetails?: AdditionalDetails;
  MonthlyIncome?: string;
  ProfileLink?: string;
  FundingSources: string[];
  AmlScreeningStatus?: any;
  AmlScreeningResult?: AmlScreeningResult;
  AmlScreeningProfilesResults?: AmlScreeningProfile[];
  IdType?: string;
  AccountUseDetails: AccountUseDetails;
}

export interface KYB {
  BucketName?: string;
  BucketUrl?: string;
  KYCIdentifier: string;
  UserID?: string;
  BusinessKyc: BusinessKyc;
  Controller?: BusinessController;
  Owners?: BusinessOwner[];
}
export interface KYC {
  UserID?: string;
  BucketName?: string;
  BucketUrl?: string;
  KYCIdentifier: string;
  BusinessIdentifier?: string;
  IndividualKyc: IndividualKyc;
}

export interface UserRetryKyc {
  Email: string;
  UserIdentifier: string;
  KycIdentifier: string;
  KycType: "INDIVIDUAL" | "BUSINESS";
  IdType: string;
  TimeCreated: string;
  TimeUpdated: string;
  RetriesLeft: number;
  ErrorMessage: string;
}

export interface CronItems {
  Items: UserRetryKyc;
}

export interface IUser {
  BusinessIdentifier: string;
  BusinessName: string;
  UserState: string;
  DisplayName: string;
  FullName: { FirstName: string; MiddleName: string; LastName: string };
  StandardAttributes: {
    Birthdate: string;
    PhoneNumber: string;
    Address: {
      StreetAddress: string;
      SecondStreetAddress: string;
      City: string;
      Country: string;
      StateOrTerritory: string;
      Zipcode: string;
      LGA: string;
    };
    Email: string;
    Website: string;
  };
  UserToBusinnessMappingList: Array<{
    UserID: string;
    BusinessIdentifier: string;
  }>;
  Email?: string;
  Tier: ReneganTiers;
  Limits?: TierLimits;
}

export interface IAdmin {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  profile?: string;
  sub?: string;
}

export enum DepositPolicyLimits {
  D0 = "0D",
  D1 = "1D",
  D2 = "2D",
  D3 = "3D",
  D4 = "4D",
  D5 = "5D",
}
export interface UserPolicy {
  PolicyIdentifier: string;
  PayoutLimit: UserPayoutLimit;
  UserID: string;
  Email: string;
  DepositPolicy: DepositPolicyLimits;
  BusinessName: string;
  FullName: FullName;
  AdditionalDetails?: AdditionalDetails;
  TimeCreated?: string;
  TimeUpdated?: string;
}

export interface User {
  ReneganUserID: string;
  DisplayName: string;
  FullName: { FirstName: string; MiddleName: string; LastName: string };
  BusinessName?: string;
  UserState: string;
  UserRoles: string[];
  PayoutLimit: UserPayoutLimit;
}

export interface UserPayoutLimit {
  currentTier: {
    name: "LOW" | "MED" | "HIGH" | "CUSTOM";
    daily_limit_value: number;
    weekly_limit_value: number;
    monthly_limit_value: number;
  };
  daily: { amountUsed: number; currentDay: string };
  monthly: {};
  weekly: {};
}
export interface UserC2CTransferLimit {
  currentTier: {
    name: "LOW" | "MED" | "HIGH" | "CUSTOM";
    daily_limit_value: number;
    weekly_limit_value: number;
    monthly_limit_value: number;
  };
  daily: { amountUsed: number; currentDay: string };
  monthly: {};
  weekly: {};
}

export enum Currency {
  USD = "USD",
  NGN = "NGN",
}

export interface VendorInput {
  BankKey?: string;
  AmountInNaira?: string;
  ReneganTransactionID?: string;
}

interface WazaDetails {
  id: string;
  reference: string;
  customerReference: string;
  status: string;
  amount: number;
  fee: number;
  message: string;
  description: string;
  currency: Currency | string;
  createdAt: string;
}

export interface WazaTransaction {
  successful: boolean;
  data: WazaDetails;
}

export interface DuplicateUserDetails {
  kycState: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userID: string;
  email: string;
  timeCreated: string;
  profileLink: string;
  selfieUrls: string[];
  similarity: number;
  fullName: string;
}

export enum TransactionTypeEnum {
  ALL = "",
  TAG_ALL = "TAG_ALL",
  TAG_CREDIT = "TAG_CREDIT",
  TAG_TRANSFER = "TAG_TRANSFER",
  TAG_DEBIT_REVERSAL = "TAG_DEBIT_REVERSAL",
  MAKE_PAYMENT = "MAKE_PAYMENT",
  ADD_BALANCE = "ADD_BALANCE",
  CONVERT_CURRENCY = "CONVERT_CURRENCY",
  USD_CREDIT = "USD_CREDIT",
  REFERRAL_BONUS = "REFERRAL_BONUS",
  CARD_CREDIT = "CARD_CREDIT",
  CARD_DEBIT = "CARD_DEBIT",
  CARD_CREATION = "CARD_CREATION",
  CARD_FUNDING = "CARD_FUNDING",
  MAKE_PAYMENT_REFUND = "MAKE_PAYMENT_REFUND",
  CARD_TRANSACTIONS = "CARD_TRANSACTIONS",
  NGN_CREDIT = "NGN_CREDIT",
  FURTHER_REVIEW = "FURTHER_REVIEW",
  USD_DEBIT = "USD_DEBIT",
}

export interface ListTransactionFilter {
  TransactionType: TransactionTypeEnum;
  TransactionState?: TransactionStateEnum;
  StartDate?: string;
  limit?: any;
  Type?: string;
}

export interface TransactionFilter {
  [key: string]: any;
}

export enum FilterBy {
  AccountNumber = "AccountNumber",
  TransactionIdentifier = "TransactionIdentifier",
  UserID = "UserID",
  UserEmail = "UserEmail",
}

export enum SearchBy {
  Name = "Name",
  Email = "Email",
}

export enum CardTransactionTypeEnum {
  FUNDING = "FUNDING",
  AUTHORIZATION = "AUTHORIZATION",
  REVERSAL = "REVERSAL",
  REFUND = "REFUND",
  DECLINE = "DECLINE",
  WITHDRAWAL = "WITHDRAWAL",
  CARD_TERMINATION = "CARD_TERMINATION",
}
export enum CardTransactionStateEnum {
  FAILED = "FAILED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum CardWithdrawalApprovalState {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  // DECLINED = "DECLINED",
  // CANCELLED = "CANCELLED",
}

export enum CardWithdrawalFailReason {
  INSUFFICIENT_FUNDS = "Insufficient funds",
  DOWNTIME = "Service Downtime",
  DECLINED_BY_ADMIN = "Declined By Admin",
  // DECLINED = "DECLINED",
  // CANCELLED = "CANCELLED",
}

export interface UserActivity {
  CreationDate: string;
  EventContextData: EventContextData;
}

interface EventContextData {
  City: string;
  Country: string;
  DeviceName: string;
  IpAddress: string;
}

export enum CardStateEnum {
  ACTIVE = "ACTIVE",
  FROZEN = "FROZEN",
  TERMINATED = "TERMINATED",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export interface ICard {
  CardID: string;
  Name?: string;
  LastFourDigits?: string;
  Expiry?: string;
  Status: CardStateEnum;
  Type: string;
  Issuer: string;
  Currency: string;
  Balance?: number;
  ThirdPartyID: string;
  Address?: {
    StreetAddress: string;
    SecondStreetAddress: string;
    City: string;
    StateOrTerritory: string;
    Country: string;
    ZipCode: string;
  };
  NoOfDeclines: number;
  CreatedAt: string;
  UpdatedAt: string;
  UserIdentifier: string;
  Email: string;
  FailReason?: string;
}

export interface ICardSummary {
  CardIdentifier: string;
  Currency: Currency;
  UserIdentifier: string;
  Status: CardStateEnum;
  Issuer: String;
  LastFourDigits: string;
  Email: string;
  Name: string;
  TimeCreated: string;
  TimeUpdated: string;
  NoOfDeclines: number;
  FailReason?: string;
}

export interface BusinessController {
  BusinessIdentifier?: string;
  UserID?: string;
  KYCIdentifier?: string;
  KYCState?: PeopleStateEnum;
  Controller: {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DateOfBirth: string;
    PhoneNumber: string;
    CountryOfCitizenship?: string;
    Email: string;
    NationalIdentifier: string;
    NationalIdentifierType: string;
    IdType?: string;
    AmlScreeningStatus?: any;
    AmlScreeningResult?: AmlScreeningResult;
    AmlScreeningProfilesResults?: AmlScreeningProfile[];
    AdditionalDetails?: AdditionalDetails;
    JobTitle: string;
    Address: Address;
    IsOwnerAndController?: boolean;
    TimeCreated?: string;
    TimeUpdated?: string;
    ProfileLink?: string;
    PercentageOwnership: number;
  };
}

export interface BusinessOwner {
  BusinessIdentifier?: string;
  UserID?: string;
  KYCIdentifier?: string;
  KYCState?: PeopleStateEnum;
  BeneficialOwner: {
    FirstName: string;
    MiddleName: string;
    LastName: string;
    DateOfBirth: string;
    PhoneNumber?: string;
    Email: string;
    NationalIdentifier: string;
    NationalIdentifierType?: string;
    IdType?: string;
    AmlScreeningStatus?: any;
    AmlScreeningResult?: AmlScreeningResult;
    AmlScreeningProfilesResults?: AmlScreeningProfile[];
    PercentageOwnership: number;
    AdditionalDetails?: AdditionalDetails;
    Address: Address;
    TimeCreated?: string;
    TimeUpdated?: string;
    ProfileLink?: string;
    IsOwnerAndController: boolean;
  };
}

interface AmlScreeningResult {
  uuid?: string;
  MatchResults: [
    {
      MatchType: string;
      Name: string;
      NameMatchScore: number;
      ProfileId: string;
      Categories: string;
      RiskLevel: string;
    },
  ];
  status?: number;
}

export interface FincraTransaction {
  success: boolean;
  data: FincraDetails[];
}

export interface OneFincraCredit {
  amountReceived: number;
  approvalStatus: string;
  createdAt: string;
  destinationAmount: number;
  destinationCurrency: string;
  fee: 0;
  paymentMethod: string;
  paymentScheme: null;
  pendingAdditionalInformation: [];
  pendingAdditionalInformationCount: 0;
  reference: string;
  sourceAmount: number;
  sourceCurrency: string;
  status: string;
}

export interface OneFincraTransaction {
  success: boolean;
  data: OneFincraCredit;
}

export interface FincraDetails {
  id: number;
  reference: string;
  createdAt: string;
  description: string;
  action: "credit";
  amount: 1000000000;
  currency: string;
  method: string;
  reason: string;
  merchantDescription?: string;
  availableBalanceBefore: number;
  balanceBefore: number;
  availableBalanceAfter: number;
  balanceAfter: number;
  ledgerBalanceBefore: number;
  ledgerBalanceAfter: number;
  lockedBalanceBefore: number;
  lockedBalanceAfter: number;
  rollingReserveBalanceBefore: number;
  rollingReserveBalanceAfter: number;
  sourceAmount?: number;
}

export interface SubTransaction {
  Transactions: ITransaction[];
  Total: number;
  ProcessingDate: any;
}

export interface PaystackTransaction {
  success: boolean;
  data: PaystackDetails[];
}
export interface PaystackDetails {
  id: number;
  reference: string;

  domain: string;
  failures: any;
  source: string;
  createdAt: string;
  description: string;
  action: "credit";
  amount: number;
  currency: string;
  method: string;
  reason: string;
  status: string;
  merchantDescription?: string;
  balanceBefore: number;
  balanceAfter: number;
  availableBalanceBefore: number;
  availableBalanceAfter: number;
  ledgerBalanceBefore: number;
  ledgerBalanceAfter: number;
  lockedBalanceBefore: number;
  lockedBalanceAfter: number;
  rollingReserveBalanceBefore: number;
  rollingReserveBalanceAfter: number;
  sourceAmount?: number;
}
export const AscendingStates = [
  KycStateEnum.RETRY,
  KycStateEnum.VERIFIED,
  KycStateEnum.DENIED,
  KycStateEnum.INVALID,
  KycStateEnum.BIOMETRICS,
  KycStateEnum.MISMATCH,
  KycStateEnum.FAILED,
  KycStateEnum.SUSPENDED,
  KycStateEnum.PENDING,
  KycStateEnum.DOCUMENT_RETRY,
  KybStateEnum.BUSINESS_DOCS_RETRY,
  KybStateEnum.BUSINESS_RETRY,
  KybStateEnum.OWNER_RETRY,
  KybStateEnum.CONTROLLER_RETRY,
  KybStateEnum.PEOPLE_DOCS_RETRY,
  KybStateEnum.BUSINESS_VERIFIED,
  KybStateEnum.BUSINESS_DENIED,
];

export enum DepositType {
  SWIFT = "SWIFT",
  ACH = "ACH",
  WIRE = "WIRE",
  ACH_MICRODEPOSIT = "ACH_MICRODEPOSIT",
}

export enum AccountState {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETION_PLANNED = "DELETION_PLANNED",
  ADMIN_CLOSED = "ADMIN_CLOSED",
  DISABLED_LOGIN = "DISABLED_LOGIN",
  ENABLED_LOGIN = "ENABLED_LOGIN",
  PAUSED = "PAUSED",
  USD_ACCOUNT_EXPIRED = "USD_ACCOUNT_EXPIRED",
}
/**
 * current supported vendors model.
 */
export interface IVendorListResponse {
  Flags: Flags;
}

export interface Flags {
  Payouts: PayoutVendorFlag[];
  NairaAccounts: PayoutVendorFlag[];
}

export interface PayoutVendorFlag {
  Name: string;
  IsActive: boolean;
  Threshold?: number;
}

export interface modifyVendorPayloadResponse {
  modifyFeatureFlags: Flags;
}

export interface V4Wallet {
  id: string;
  chain: string;
  address: string;
  created_at: string;
  updated_at: string;
  balances?: V4Balance[];
}

export interface V4Balance {
  balance: string;
  currency: string;
  contract_address: string;
}

export interface ReneganVirtualAccounts {
  count: number; // Number of virtual accounts
  data: VirtualAccountData[]; // Array of virtual account data objects
}

export interface VirtualAccountData {
  id: string; // Unique ID for the virtual account
  status: string; // Status of the account, e.g., "activated"
  developer_fee_percent: string; // Developer fee as a string to retain precision
  customer_id: string; // Customer ID associated with the account
  source_deposit_instructions: DepositInstructions; // Instructions for depositing funds
  destination: Destination; // Destination details for funds transfer
}

export interface DepositInstructions {
  currency: string; // Currency of the deposit, e.g., "usd"
  bank_name: string; // Name of the bank
  bank_address: string; // Address of the bank
  bank_routing_number: string; // Bank routing number
  bank_account_number: string; // Bank account number
  bank_beneficiary_name: string; // Beneficiary name associated with the account
  bank_beneficiary_address: string | null; // Beneficiary address (can be null)
  payment_rail: string; // Primary payment rail, e.g., "ach_push"
  payment_rails: string[]; // Array of available payment rails, e.g., ["ach_push", "wire"]
}

export interface Destination {
  currency: string; // Destination currency, e.g., "usdb"
  payment_rail: string; // Payment rail for the transfer, e.g., "solana"
  address: string; // Address on the destination network
}
export interface V4TransferInput {
  SourceWallet: V4WalletsEnum | string;
  Amount: number;
  ExternalAccountId?: string;
  PaymentRail?: "wire" | "ach" | "solana";
  Message?: string;
  Currency?: string;
  DestinationWallet?: V4WalletsEnum | string;
}

export enum V4WalletsEnum {
  STAGING_WALLET = "StagingWallet",
  FEES_WALLET = "FeesWallet",
  REWARDS_WALLET = "RewardsWallet",
  PREFUNDED_WALLET = "Pre-FundedWallet",
}

export interface AccountDetails {
  last_4: string;
  routing_number: string;
  checking_or_savings: string;
}

export interface BankAccount {
  id: string;
  customer_id: string;
  created_at: string; // Consider using Date if you plan to parse it
  updated_at: string; // Consider using Date if you plan to parse it
  bank_name: string;
  account_name: string | null;
  account_owner_name: string;
  active: boolean;
  currency: string;
  account_owner_type: string | null;
  account_type: string;
  first_name: string | null;
  last_name: string | null;
  business_name: string | null;
  account: AccountDetails;
  beneficiary_address_valid: boolean;
  last_4: string;
}
export interface PartnerAccount {
  WalletAddress: string;
  PartnerName: string;
  Chain: string;
}
export enum ReneganTiers {
  TIER1_PERSON = "TIER1_PERSON",
  TIER2_PERSON = "TIER2_PERSON",
  TIER3_PERSON = "TIER3_PERSON",
  TIER1_BUSINESS = "TIER1_BUSINESS",
  TIER2_BUSINESS = "TIER2_BUSINESS",
  TIER3_BUSINESS = "TIER3_BUSINESS",
  CUSTOM = "CUSTOM",
}

export interface TierCurrencyLimits {
  perTransactionLimitValue: number;
  daily: { dailyVolume: number; dailyLimitValue: number };
  weekly: { weeklyVolume: number; weeklyLimitValue: number };
  monthly: { monthlyVolume: number; monthlyLimitValue: number };
  cardFunding: {
    cardFundingDailyVolume: number;
    cardFundingDailyLimitValue: number;
  };
}

export interface TierLimits {
  USD: TierCurrencyLimits;
}
export interface V4TransferTransaction {
  TimeCreated: string;
  TransactionId: string; // Unique identifier for the transaction
  TransactionType: string; // Type of transaction, e.g., C2C_Credit
  SenderWallet: string; // Wallet identifier of the sender
  Status: string; // Status of the transaction, e.g., PENDING
  Amount: number; // Amount involved in the transaction
  Destination: {
    Name: string; // Name associated with the destination wallet
    Bank: string; // Bank associated with the destination (can be empty)
  };
}

export enum V4BalanceView {
  STAGING = "STAGING",
  PREFUND = "PREFUND",
  FEES = "FEES",
  REWARDS = "REWARDS",
  ALL = "ALL",
}

export interface VirtualAccountProviderKYCEntity {
  FirstName: string;
  LastName: string;
  Email: string;
  UserID: string;
  KycIdentifier: string;
  ResourceState: string;
  Status: string;
  RequirementsDue: string[];
  RejectionReasons: string[];
  KycStateHistory: any[];
  FutureRequirementsDue: string[];
  ProviderIdentifier: string;
  TimeCreated?: string;
  TimeUpdated?: string;
}
export enum ReneganProviderKycState {
  NOT_STARTED = "NOT_STARTED",
  INCOMPLETE = "INCOMPLETE",
  ACTIVE = "ACTIVE",
  REJECTED = "REJECTED",
  MANUAL_REVIEW = "MANUAL_REVIEW",
  AWAITING_QUESTIONNAIRE = "AWAITING_QUESTIONNAIRE",
  RESET = "RESET",
}

export interface AccountUseDetails {
  EmploymentStatus: string;
  MostRecentOccupation: string;
  PrimaryPurposeOfTheAccount: string;
  OnWhoseBehalfFundIsReceived: string;
  ProfileLink: string;
  MonthlyIncome: string;
  FundingSources: string[];
}

export interface ICardTxnFilter {
  email?: string;
  transactionType?: string;
  transactionState?: string;
  maxResults?: number;
  startDate?: string;
  // nextToken?: string;
  userIdentifier?: string;
  adminTransactionState?: string;
}
export interface ICardCreationTxnFilter {
  email?: string;
  transactionState?: string;
  maxResults?: number;
  startDate?: string;
  // nextToken?: string;
  userIdentifier?: string;
}

export interface ExchangeRate {
  AllowExchange: boolean;
  TimeCreated: string;
  TimeUpdated: string;
  CustomerRate: number;
  VendorRate: number;
  Currency: string;
  TakeRate: number;
  Fee: number;
  Source: string;
  ToCurrencyRate?: number;
  AmountConverted?: number;
  From: string;
  To: string;
  FromCurrencyRate: number;
  Time: string;
  AllowConversion: boolean;
  MaxFromCurrencyLimit: number;
  MinFromCurrencyLimit: number;
  RateID?: string;
}
