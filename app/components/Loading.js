import React from 'react';

export default class Loading extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content: 'Loading'
        }
    }

    componentDidMount(){
        this.timer = window.setInterval(()=>{
            console.log("here");

            this.state.content === 'Loading' + '...'
            ? this.setState({
                content: 'Loading'
            })
            : this.setState((prevState) => {
                return {content: prevState.content + '.'}
            })
        },200);
    }
    // need to clearInterval onUnmount - otherwise it causes memory leak
    // the interval will still be going after the component unmounted
    componentWillUnmount(){
        window.clearInterval(this.timer);
    }
    
    render(){
        return(
            <p>
                {this.state.content}
            </p>
        );
    }
}