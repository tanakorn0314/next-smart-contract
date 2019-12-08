import React, { useEffect, useState } from 'react';
import { Card, Icon } from 'antd';
import _ from 'lodash';
import images from '../images';

const CandidateList = props => {

    const { candidates, onVote, voter } = props;

    const getVotedCandidate = () => {
        if (!voter) return null;
        if (!voter.voted) return null;
        return +voter.vote;
    }

    return (
        <div className='container'>
            <h3>Candidates</h3>
            {
                !candidates ? (
                    <Icon type='loading' />
                ) : (
                        <div className='card-container'>
                            {
                                candidates.map((candidate, i) => (
                                    <Card
                                        key={i}
                                        hoverable
                                        cover={<img alt="example" style={{ height: 240 }} src={images[i]} />}
                                        onClick={e => onVote(i)}
                                        actions={[
                                            <Icon type="like" key="like" style={{ color: getVotedCandidate() === i ? '#1890ff' : '' }} />,
                                        ]}
                                    >
                                        <Card.Meta title={candidate.name} description={`Votes: ${candidate.voteCount}`} />
                                    </Card>
                                ))
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
            .card-container {
                display: grid;
                grid-gap: 10px;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                margin-bottom: 10px;
            }
            `}</style>
        </div>
    )
}

export default CandidateList;