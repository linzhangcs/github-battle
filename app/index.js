import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Popular from './components/Popular';

//component
//state
//lifecycle
//ui render
class App extends Component{
    render(){
        return(
            // <div>Hello world ✨🖐🐶</div>
            <div className="container">
                <Popular />
            </div>
        ) 
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)