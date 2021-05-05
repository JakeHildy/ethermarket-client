import axios from 'axios';

export async function getUSDPrice(price, currency) {
  axios.get(`${process.env.REACT_APP_BACKEND_EP}${process.env.REACT_APP_CRYPTO_EP}?symbol=${currency}`).then((res) => {
    const conversionRateUSD = res.data.data.quote.USD.price;
    return price * conversionRateUSD;
  });
}
