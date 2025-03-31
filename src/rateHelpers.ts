export const customerRateToVendorRate = (
  customerRate: number,
  takeRate: string,
) => {
  try {
    const takeRateInNumber = convertPercentageToDecimal(takeRate);
    const amount = customerRate / (1 - takeRateInNumber);
    return amount.toFixed(2);
  } catch (err) {
    return "Unable to calculate Vendor Rate";
  }
};

export const vendorRateToCustomerRate = (
  vendorRate: number,
  takeRate: string,
) => {
  try {
    const takeRateInNumber = convertPercentageToDecimal(takeRate);
    const amount = vendorRate - takeRateInNumber * vendorRate;
    return amount.toFixed(2);
  } catch (err) {
    return "Unable to calculate Customer Rate";
  }
};

const convertPercentageToDecimal = (percentage: string): number => {
  const parts = percentage.split("%");

  if (parts.length === 2) {
    const numericValue = parseFloat(parts[0]);
    return numericValue / 100;
  }

  throw Error("Number is not a percentage");
};
