import React from 'react';
import { Input, Button, Tag, Typography } from 'antd';
import _ from 'lodash';

import votingContract from '../blockchain/voting/votingContract';

const { Paragraph } = Typography;


const AddressForm = props => {

    const { owner, candidates, currentAddress, address, voter, onChangeAddress, onCheckAddress, onGiveRight } = props;

    return (
        <div className='container'>
            <h3>Address</h3>
            <Paragraph copyable={{ text: currentAddress }}>Your Address : {currentAddress}</Paragraph>
            <Paragraph copyable={{ text: owner }}>Owner : {owner}</Paragraph>
            <Paragraph copyable={{ text: votingContract.address }}>Contract : {votingContract.address}</Paragraph>
            <h3>Check Voter</h3>
            <div style={{ marginBottom: 10 }}>
                <Input
                    type='text'
                    style={{ width: 400, marginRight: 10 }}
                    placeholder='0x73D8F731eC0d3945d807a904Bf93954B82b0d594'
                    onChange={onChangeAddress}
                    value={address}
                />
                <Button type='primary' style={{ marginRight: 10 }} onClick={onCheckAddress}>Check</Button>
                <Button style={{ marginRight: 10 }} onClick={onGiveRight}>Give Right</Button>
            </div>
            {
                voter && (
                    <div className='info-container'>
                        <p>Voted : {voter.voted ? <Tag color='green'>true</Tag> : <Tag color='red'>false</Tag>}</p>
                        <p>Weight : {voter.weight}</p>
                        {
                            (candidates && voter.voted) && (
                                <p>Vote to : {candidates[voter.vote].name}</p>
                            )
                        }
                    </div>
                )
            }
            <style jsx>{`
            .container {
                padding: 16px;
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 0 0 6px 0 rgba(0,0,0,.15);
                margin-bottom: 10px;
            }
            `}</style>
        </div>
    )
}

export default AddressForm;