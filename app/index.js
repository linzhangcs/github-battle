import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular';
import Battle from './components/Battle';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route} from 'react-router-dom';
//component
//state
//lifecycle
//ui render
class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            theme: "light",
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light',
                }))
            }
        }
    }
    
    render(){
        return(
            // <div>Hello world ✨🖐🐶</div>
            // <Battle />
            // <Popular />
         /* <Popular /> */
            <Router >
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />
                            {/* <Battle /> */}
                            {/* <Popular /> */}
                            <Route exact path='/' component={Popular} />
                            <Route path='/battle' component={Battle} />
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        ) 
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)