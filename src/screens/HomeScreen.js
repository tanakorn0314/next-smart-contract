import React, { useState, useEffect } from 'react';
import CandidateList from '../components/CandidateList';
import AddressForm from '../components/AddressForm';
import AddRightForm from '../components/CurrentAddress';
import VotingController from '../blockchain/voting/VotingController';
import CurrentAddress from '../components/CurrentAddress';
import { notification } from 'antd';
import Router from 'next/router';
import config from '../config';

const votingController = new VotingController();

const HomeScreen = props => {

    const [currentAddress, setCurrentAddress] = useState();

    const [owner, setOwner] = useState();
    const [address, setAddress] = useState();
    const [voter, setVoter] = useState();
    const [candidates, setCandidates] = useState();

    useEffect(() => {
        getOwnerAddress();
        getCandidates();
        getCurrentAddress().then(address => { setAddress(address); getVoterInfo(address) });
    }, []);

    const getCandidates = async () => {
        try {
            const numCandidate = await votingController.numCandidate();
            const promisses = _.range(0, numCandidate).map((i) => votingController.getCandidates(i));
            const candidates = await Promise.all(promisses);
            setCandidates(candidates);
        } catch (e) {
            console.error(e);
            setCandidates(null);
            console.error(e)
            notification['error']({
                message: 'Error',
                description: e.message,
                duration: 2000
            })
        }
    }

    const getCurrentAddress = async () => {
        try {
            const address = await votingController.currentAccount();
            setCurrentAddress(address);
            return address;
        } catch (e) {
            console.error(e);
            setCurrentAddress(null);
            console.error(e)
            notification['error']({
                message: 'Error',
                description: e.message,
                duration: 2000
            })
        }
    }

    const getOwnerAddress = async () => {
        try {
            const owner = await votingController.getOwnerAddress();
            setOwner(owner);
        } catch (e) {
            console.error(e);
            setOwner(null);
            console.error(e)
            notification['error']({
                message: 'Error',
                description: e.message,
                duration: 2000
            })
        }
    }

    const getVoterInfo = async (address) => {
        try {
            const voter = await votingController.getVoter(address);
            setVoter(voter);
            console.log('tst')
        } catch (e) {
            console.error(e);
            setVoter(null);
            console.error(e)
            notification['error']({
                message: 'Error',
                description: e.message,
                duration: 2000
            })
        }
    }

    const giveRight = async (address) => {
        try {
            const res = await votingController.giveRightToVote(currentAddress, address);
            notification['success']({
                message: 'Give right success',
                description: 'Click to see transaction',
                onClick: () => { window.open(`https://${config.network}.etherscan.io/tx/${res.transactionHash}`); }
            })
        } catch (e) {
            console.error(e)
            notification['error']({
                message: 'Error',
                description: e.message,
                duration: 2000
            })
        }
    }

    const vote = async (candidate) => {
        try {
            const res = await votingController.vote(currentAddress, candidate);
            setCandidates(candidates => {
                candidates[candidate].voteCount++;
                return [...candidates]
            })
            notification['success']({
                message: 'Vote success',
                description: 'Click to see transaction',
                onClick: () => { window.open(`https://${config.network}.etherscan.io/tx/${res.transactionHash}`); }
            })
        } catch (e) {
            console.error(e)
            notification['error']({
                message: 'Error',
                description: e.message,
                duration: 2000
            })
        }
    }

    return (
        <div className='container'>
            <CandidateList
                voter={voter}
                candidates={candidates}
                onVote={vote}
            />
            <AddressForm
                address={address}
                currentAddress={currentAddress}
                voter={voter}
                owner={owner}
                candidates={candidates}
                onChangeAddress={e => setAddress(e.target.value)}
                onCheckAddress={e => { getVoterInfo(address); getCurrentAddress() }}
                onGiveRight={e => giveRight(address)}
            />
            <style jsx>{`
            .container {
                padding: 10px;
            }
            `}</style>
        </div>
    )
}

export default HomeScreen;