import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css'

//component
//state
//lifecycle
//ui render
class App extends Component{
    render(){
        return(
            <div>Hello world ✨🖐🐶</div>
        ) 
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)