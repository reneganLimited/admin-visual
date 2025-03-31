export const formatCurrency = (value: number): string => {
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);

    if (value < 0) {
        return `-${formattedValue.substring(2, formattedValue.length)}`
    }

    return formattedValue.substring(1, formattedValue.length);
};
  