import React from 'react';
import { battle } from '../utils/api';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa';
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
        // const {playerOne, playerTwo} = this.props;
        return(
            <div className='grid space-around container-small'>
                {/* {JSON.stringify(this.state, null, 2)} */}
                <div className="card bg-light">
                    <h4 className="header-lg center-text">
                        {winner.score === loser.score ? 'Tie' : 'Winner'}
                    </h4>
                    <img
                        className='avatar'
                        src={winner.profile.avatar_url}
                        alt={`avatar for ${winner.profile.username}`} />
                    <h2 className='center-text'>
                        <a href={winner.profile.html_url} className='link'>
                            {winner.profile.login}
                        </a>
                    </h2>
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
                                {winner.profile.followers}
                            </li>
                        )}
                        {winner.profile.following &&(
                            <li>
                                <FaUserFriends color='rgb(239, 115, 115)' size={size} />
                                {winner.profile.following}
                            </li>
                        )}
                    </ul>
                </div>
                <div className="card bg-light">
                    <h4 className="header-lg center-text">
                        {winner.score === loser.score ? 'Tie' : 'Loser'}
                    </h4>
                    <img
                        className='avatar'
                        src={loser.profile.avatar_url}
                        alt={`avatar for ${loser.profile.username}`} />
                    <h2 className='center-text'>
                        <a href={loser.profile.html_url} className='link'>
                            {loser.profile.login}
                        </a>
                    </h2>
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
                                {loser.profile.followers}
                            </li>
                        )}
                        {loser.profile.following &&(
                            <li>
                                <FaUserFriends color='rgb(239, 115, 115)' size={size} />
                                {loser.profile.following}
                            </li>
                        )}

                    </ul>
                </div>

            </div>

        );
    }
}

export default Results;