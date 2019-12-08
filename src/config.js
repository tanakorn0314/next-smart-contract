const network = 'kovan';

const chainId = (network) => {
    switch(network) {
        case 'mainnet': return 1; //Proof of Work (POW)
        case 'rinkeby': return 2; //Proof of Authority (POA)
        case 'ropsten': return 3; //Proof of Work (POW)
        case 'kovan': return 42; //Proof of Authority (POA)
        default: return 1;
    }
}

export default {
    network,
    chainId: chainId(network)
}