import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        fontSize: '2em',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center',
    }
}

export default class Loading extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content: props.text
        }
    }

    componentDidMount(){
        const { text, speed } = this.props;

        this.timer = window.setInterval(()=>{
            console.log("here");

            this.state.content === text + '...'
            ? this.setState({
                content: text
            })
            : this.setState((prevState) => {
                return {content: prevState.content + '.'}
            })
        },speed);
    }
    // need to clearInterval onUnmount - otherwise it causes memory leak
    // the interval will still be going after the component unmounted
    componentWillUnmount(){
        window.clearInterval(this.timer);
    }
    
    render(){
        return(
            <p style={styles.content}>
                {this.state.content}
            </p>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 200,
}