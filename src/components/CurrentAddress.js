import React, {  } from 'react';
import { Input, Button, Tag } from 'antd';
import _ from 'lodash';

const CurrentAddress = props => {

    const { address, voter, onChangeAddress, onCheckAddress } = props;

    return (
        <div className='container'>
            <h3>Check Voter</h3>
            <div style={{ marginBottom: 10 }}>
                <Input
                    type='text'
                    style={{ width: 400, marginRight: 10 }}
                    placeholder='0x73D8F731eC0d3945d807a904Bf93954B82b0d594'
                    value={address}
                    onChange={onChangeAddress}
                />
                <Button type='primary' style={{ marginRight: 10 }} onClick={onCheckAddress}>Check</Button>
                <Button type='primary' style={{ marginRight: 10 }} onClick={onCheckAddress}>Give Right</Button>
            </div>
            {
                voter && (
                    <div className='info-container'>
                        <p>Voted : {voter.voted ? <Tag color='red'>true</Tag> : <Tag color='green'>false</Tag>}</p>
                        <p>Weight : {voter.weight}</p>
                        {
                            voter.voted && (
                                <p>Vote to : {voter.vote}</p>
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

export default CurrentAddress;