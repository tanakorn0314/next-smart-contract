import Web3 from 'web3';
import votingContract from './votingContract';

const { address: contractAddress, ABI } = votingContract;

export default class VotingController {

    constructor() {
        this.web3 = new Web3(Web3.givenProvider);
        this.contract = new this.web3.eth.Contract(ABI, contractAddress);
    }

    getOwnerAddress() {
        return this.contract.methods.owner().call();
    }

    getVoter(address) {
        return this.contract.methods.votes(address).call();
    }

    getCandidates() {
        return this.contract.methods.candidates().call();
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

