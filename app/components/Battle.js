import React from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';

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
class Battle extends React.Component{
    render(){
        return(
            <>
                <Instructions />
                <PlayerInput label='Label!' onSubmit={(value) => console.log(value)} />
            </>
        );
    }
}

export default Battle;