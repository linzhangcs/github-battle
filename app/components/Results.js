import React from 'react';
import PropTypes from 'prop-types';
import { battle } from '../utils/api';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function ProfileList ({ profile }){
    const size = 20;
    return(
            <ul className='card-list'> 
                <li>
                    <FaUser color='rgb(239, 115, 115)' size={size} />
                    {profile.name}
                </li>
                {profile.location &&(
                        <li>
                            <Tooltip text="User's location 🏡" >
                                <FaCompass color='rgb(239, 115, 115)' size={size} />
                                {profile.location}
                            </Tooltip>
                        </li>
                    
                )}
                {profile.company &&(
                    
                    <li>
                        <Tooltip text="User's Company 💼" >
                            <FaBriefcase color='rgb(239, 115, 115)' size={size} />
                            {profile.company}
                        </Tooltip>
                    </li>
                )}
                    <li>
                        <FaUsers color='rgb(239, 115, 115)' size={size} />
                        {profile.followers.toLocaleString()} followers
                    </li>
                    <li>
                        <FaUserFriends color='rgb(239, 115, 115)' size={size} />
                        {profile.following.toLocaleString()} followings
                    </li>
            </ul>
    );
}

ProfileList.propTypes ={
    profile: PropTypes.object.isRequired
}

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
            return <Loading/>
        }
        if(error){
            return(
            <p className='error center-text'>{error}</p>
            );
        }
        
        return(
            <>
            <div className='grid space-around container-small'>
                {console.log('loser', loser)}
                <Card 
                    header = {winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader = {`Score: ${winner.score.toLocaleString()}`}
                    avatar = {winner.profile.avatar_url}
                    href = {winner.profile.html_url}
                    name = {winner.profile.login}
                >
                    <ProfileList profile={winner.profile} />
                </Card>

                <Card 
                    header = {winner.score === loser.score ? 'Tie' : 'Loser'}
                    subheader = {`Score: ${loser.score.toLocaleString()}`}
                    avatar = {loser.profile.avatar_url}
                    href = {loser.profile.html_url}
                    name = {loser.profile.login}
                    >
                    <ProfileList profile={loser.profile} />
                </Card>
            </div>
            <button className="btn btn-dark btn-space" 
                    onClick={this.props.onReset}>reset</button>
            </>
        );
    }
}

export default Results;

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}