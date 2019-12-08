import Web3 from 'web3';
import votingContract from './votingContract';

const { address: contractAddress, ABI } = votingContract;

export default class VotingController {

    constructor() {
        this.web3 = new Web3(Web3.givenProvider);
        this.contract = new this.web3.eth.Contract(ABI, contractAddress);
    }

    async currentAccount() {
        await ethereum.enable(); // request access user account (MetaMask)
        const accounts = await this.web3.eth.getAccounts();
        return accounts ? accounts[0] : null;
    }

    numCandidate() {
        return this.contract.methods.numCandidate().call();
    }

    getOwnerAddress() {
        return this.contract.methods.owner().call();
    }

    getVoter(address) {
        return this.contract.methods.voters(address).call();
    }

    getCandidates(i) {
        return this.contract.methods.candidates(i).call();
    }

    getWinningCandidate() {
        return this.contract.methods.winningCandidate().call();
    }

    getWinnerName() {
        return this.contract.methods.winnerName().call();
    }

    //only owner
    giveRightToVote(fromAddress, toAddress) {
        return this.contract.methods.giveRightToVote(toAddress).send({ from: fromAddress });
    }

    vote(fromAddress, candidate) {
        return this.contract.methods.vote(candidate).send({ from: fromAddress });
    }

}

