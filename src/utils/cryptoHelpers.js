// import Web3 from 'web3';

export function getNetwork(id) {
  if (id === 1) {
    return 'Mainnet';
  } else if (id === 2) {
    return 'Morden';
  } else if (id === 3) {
    return 'Ropsten';
  } else if (id === 4) {
    return 'Rinkby';
  } else if (id === 42) {
    return 'Kovan';
  } else {
    return 'Network Unknown';
  }
}
