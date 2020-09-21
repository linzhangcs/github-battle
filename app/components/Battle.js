import React from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import Results from './Results';
import { ThemeConsumer, ThemeProvider } from '../contexts/theme';

function Instructions(){
    return(
        <ThemeConsumer>
            {({ theme }) => (
                <div className='instructions-container'>
                <h1 className='center-text header-lg'>
                    Instructions
                </h1>
                <ol className='containter-sm grid center-text battle-instructions'>
                    <li>
                        <h3 className='header-sm'>
                            Enter two Github users
                        </h3>
                        <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size='140px' />
                    </li>
                    <li>
                        <h3 className='header-sm'>
                            Battle
                        </h3>
                        <FaFighterJet className={`bg-${theme}`} color='#727272' size='140px' />
                    </li>
                    <li>
                        <h3 className='header-sm'>
                            See the winner
                        </h3>
                        <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size='140px' />
                    </li>
                </ol>
            </div>
            )} 
        </ThemeConsumer>
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
            <ThemeConsumer>
                {({ theme }) => (
                    <form className='column player' onSubmit={this.handleSubmit}>
                    <label htmlFor='username' className='player-label'>
                        {this.props.label}
                    </label>
                    <div className='row player-inputs'>
                        <input 
                            type='text'
                            id='username'
                            className={`input-${theme}`}
                            placeholder='github username'
                            autoComplete='off'
                            // input field is controlled - controlled component
                            value={this.state.username}
                            onChange={this.handleChange}
                        ></input>
                        <button className={`btn ${theme === 'light' ? 'btn-dark' : 'btn-light'}`} type='submit' disabled={!this.state.username}>
                            Submit
                        </button>
                    </div>
                </form>
                )}
            </ThemeConsumer>
        );
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({ username, onReset, label}){
    return(
        <ThemeConsumer>
            {({ theme }) => (
                <div className='column player'>
                <h3 className='player-label'>{label}</h3>
                <div className={`row bg-${theme}`}>
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
            )}
        </ThemeConsumer>
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
            battle: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, player){
        this.setState({
            [id]: player
        })
    }

    handleReset(id){
        this.setState({
            [id]: null
        })
    }
    render(){
        const { playerOne, playerTwo, battle } = this.state;
        if(battle){
            return <Results 
                        playerOne={playerOne} 
                        playerTwo={playerTwo}
                        onReset={() => {
                            this.setState({
                                playerOne: null,
                                playerTwo: null,
                                battle: false,    
                            })
                        }}
                    ></Results>
        }
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
                                onReset={()=> this.handleSubmit('playerOne')}
                                username={playerOne}></PlayerPreview>}
                        {playerTwo === null 
                            ? <PlayerInput label='Player Two' 
                                onSubmit={(player) => this.handleSubmit('playerTwo',player)} /> 
                            : <PlayerPreview label='playerTwo'
                                onReset={()=> this.handleReset('playerTwo')}
                                username={playerTwo}></PlayerPreview>}
                    </div>

                    {playerOne && playerTwo && (<button className='btn btn-dark btn-space'
                        onClick={()=> this.setState({battle: true})}>Battle</button>)
                    }
                </div>
            </>
        );
    }
}

export default Battle;