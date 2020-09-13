import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Popular from './components/Popular';
import Battle from './components/Battle'
//component
//state
//lifecycle
//ui render
class App extends Component{
    render(){
        return(
            // <div>Hello world ✨🖐🐶</div>
            <div className="container">
                {/* <Popular /> */}
                <Battle />
            </div>
        ) 
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)