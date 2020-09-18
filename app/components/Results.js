import React from 'react';
import PropTypes from 'prop-types';
import { battle } from '../utils/api';
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';

const styles = {
    container: {
      position: 'relative',
      display: 'flex'
    },
    tooltip: {
      boxSizing: 'border-box',
      position: 'absolute',
      width: '160px',
      bottom: '100%',
      left: '50%',
      marginLeft: '-80px',
      borderRadius: '3px',
      backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
      padding: '7px',
      marginBottom: '5px',
      color: '#fff',
      textAlign: 'center',
      fontSize: '14px',
    }
  }

class ProfileList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            hoveringLocation: false,
            hoveringCompany: false,
        }

        this.mouseOut = this.mouseOut.bind(this);
        this.mouseover = this.mouseOver.bind(this);
    }

    mouseOver(id){
        this.setState({
            [id]: true
        })
    }
    mouseOut(id){
        this.setState({
            [id]: false
        })
    }
    render(){
        const size = 20;
        const { profile } = this.props;
        const { hoveringCompany, hoveringLocation} = this.state;
        return(
                <ul className='card-list'> 
                    <li>
                        <FaUser color='rgb(239, 115, 115)' size={size} />
                        {profile.name}
                    </li>
                    {profile.location &&(
                        <li onMouseOver={() => this.mouseOver('hoveringLocation')}
                            onMouseOut= {()=>this.mouseOut('hoveringLocation')}
                            style={styles.container}>
                            {hoveringLocation && <div style={styles.tooltip}>User's location</div>}
                            <FaCompass color='rgb(239, 115, 115)' size={size} />
                            {profile.location}
                        </li>
                    )}
                    {profile.company &&(
                        <li onMouseOver={()=>this.mouseOver('hoveringCompany')} 
                            onMouseOut= {()=>this.mouseOut('hoveringCompany')}
                            style={styles.container}>
                            {hoveringCompany && <div style={styles.tooltip}>User's company</div>}
                            <FaBriefcase color='rgb(239, 115, 115)' size={size} />
                            {profile.company}
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

}
// function ProfileList ({ profile }){
//     const size = 20;
//     return(
//             <ul className='card-list'> 
//                 <li>
//                     <FaUser color='rgb(239, 115, 115)' size={size} />
//                     {profile.name}
//                 </li>
//                 {profile.location &&(
//                     <li>
//                         <FaCompass color='rgb(239, 115, 115)' size={size} />
//                         {profile.location}
//                     </li>
//                 )}
//                 {profile.company &&(
//                     <li>
//                         <FaBriefcase color='rgb(239, 115, 115)' size={size} />
//                         {profile.company}
//                     </li>
//                 )}
//                     <li>
//                         <FaUsers color='rgb(239, 115, 115)' size={size} />
//                         {profile.followers.toLocaleString()} followers
//                     </li>
//                     <li>
//                         <FaUserFriends color='rgb(239, 115, 115)' size={size} />
//                         {profile.following.toLocaleString()} followings
//                     </li>
//             </ul>
//     );
// }

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