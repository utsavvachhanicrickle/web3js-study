export const shortAddress = (
  address
) => {

  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};


export const formatDate = (
  date
) => {

  return new Date(date)
    .toLocaleString();
};