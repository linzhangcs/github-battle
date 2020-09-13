import React from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import { render } from 'react-dom';

function Instructions(){
    return(
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='containter-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>
                        Enter two Github users
                    </h3>
                    <FaUserFriends className='bg-light' color='rgb(255, 191, 116)' size='140px' />
                </li>
                <li>
                    <h3 className='header-sm'>
                        Battle
                    </h3>
                    <FaFighterJet className='bg-light' color='#727272' size='140px' />
                </li>
                <li>
                    <h3 className='header-sm'>
                        See the winner
                    </h3>
                    <FaTrophy className='bg-light' color='rgb(255, 215, 0)' size='140px' />
                </li>
            </ol>
        </div>
    )
}

class PlayerInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            username: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(this.state.username);
        console.log(event)
    }
    render(){
        return(
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input 
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='github username'
                        autoComplete='off'
                        // input field is controlled - controlled component
                        value={this.state.username}
                        onChange={this.handleChange}
                    ></input>
                    <button className='btn btn-dark' type='submit' disabled={!this.state.username}>
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label}){
    return(
        <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className='row bg-light'>
                <div className='player-info'>
                    <img className='avatar-small'
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`avatar for ${username}`} />
                    <a href={`https://github.com/${username}`}
                        className='link'>
                            {username}
                    </a>
                </div>
                <button className='btn-clear flex-center' onClick={onReset}>
                    <FaTimesCircle color='rgb(194, 57, 42)' size={24} />
                </button>
            </div>
        </div>
    );
}

PlayerPreview.propTypes ={
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}
class Battle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playerOne: null,
            playerTwo: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(id, player){
        this.setState({
            [id]: player
        })
    }
    render(){
        const { playerOne, playerTwo } = this.state;
        return(
            <>
                <Instructions />
                <div className='players-containter'>
                    <h1 className='conter-text header-lg'>Players</h1>
                    <div className='row spaced-around'>
                        {playerOne === null 
                            ? <PlayerInput label='Player One' 
                                onSubmit={(player) => this.handleSubmit('playerOne',player)} /> 
                            : <PlayerPreview label='playerOne'
                                onReset={()=>({})}
                                username={playerOne}></PlayerPreview>}
                        {playerTwo === null 
                            ? <PlayerInput label='Player Two' 
                                onSubmit={(player) => this.handleSubmit('playerTwo',player)} /> 
                            : <PlayerPreview label='playerTwo'
                                onReset={()=>({})}
                                username={playerTwo}></PlayerPreview>}
                    </div>
                </div>
            </>
        );
    }
}

export default Battle;