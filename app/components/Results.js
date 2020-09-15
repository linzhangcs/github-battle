import React from 'react';
import { battle } from '../utils/api';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa';
import Card from './Card';

class Results extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            winner: null,
            loser: null,
            error: null
        }
    }
    componentDidMount(){
        const {playerOne, playerTwo} = this.props;
        battle([playerOne, playerTwo])
        .then((results) => {
            this.setState({
                winner: results[0],
                loser: results[1],
                error: null,
                isLoading: false
            })
        }).catch(({ message }) => {
            this.setState({
                error: message,
                isLoading: false
            })
        })
    }

    render(){
        const {winner, loser, isLoading, error } = this.state;

        if(isLoading){
            return <p>LOADING</p>
        }
        if(error){
            return(
            <p className='error center-text'>{error}</p>
            );
        }
        const size = 20;
        return(
            <div className='grid space-around container-small'>
                <Card 
                    header = {winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader = {`Score: ${winner.score.toLocaleString()}`}
                    avatar = {winner.profile.avatar_url}
                    href = {winner.profile.html_url}
                    name = {winner.profile.username}
                >
                    <ul className='card-list'> 
                        <li>
                            <FaUser color='rgb(239, 115, 115)' size={size} />
                            {winner.profile.name}
                        </li>
                        {winner.profile.location &&(
                            <li>
                                <FaCompass color='rgb(239, 115, 115)' size={size} />
                                {winner.profile.location}
                            </li>
                        )}
                        {winner.profile.company &&(
                            <li>
                                <FaBriefcase color='rgb(239, 115, 115)' size={size} />
                                {winner.profile.company}
                            </li>
                        )}
                        {winner.profile.followers &&(
                            <li>
                                <FaUsers color='rgb(239, 115, 115)' size={size} />
                                {winner.profile.followers.toLocaleString()} followers
                            </li>
                        )}
                        {winner.profile.following &&(
                            <li>
                                <FaUserFriends color='rgb(239, 115, 115)' size={size} />
                                {winner.profile.following.toLocaleString()} following
                            </li>
                        )}
                    </ul>

                </Card>

                <Card 
                    header = {winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader = {`Score: ${loser.score.toLocaleString()}`}
                    avatar = {loser.profile.avatar_url}
                    href = {loser.profile.html_url}
                    name = {loser.profile.username}
                    >
                    <ul className='card-list'> 
                        <li>
                            <FaUser color='rgb(239, 115, 115)' size={size} />
                            {loser.profile.name}
                        </li>
                        {loser.profile.location &&(
                            <li>
                                <FaCompass color='rgb(239, 115, 115)' size={size} />
                                {loser.profile.location}
                            </li>
                        )}
                        {loser.profile.company &&(
                            <li>
                                <FaBriefcase color='rgb(239, 115, 115)' size={size} />
                                {loser.profile.company}
                            </li>
                        )}
                        {loser.profile.followers &&(
                            <li>
                                <FaUsers color='rgb(239, 115, 115)' size={size} />
                                {loser.profile.followers.toLocaleString()} followers
                            </li>
                        )}
                        {loser.profile.following &&(
                            <li>
                                <FaUserFriends color='rgb(239, 115, 115)' size={size} />
                                {loser.profile.following.toLocaleString()} followers
                            </li>
                        )}

                    </ul>
                </Card>
            </div>

        );
    }
}

export default Results;