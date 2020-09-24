import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { NavLink } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa';

const activeStyle ={
    color: 'rgb(100, 100, 234)'
}
function Nav(){
    return(
        <ThemeConsumer>
            {({theme, toggleTheme}) => (
                <nav className = 'row space-btw'>
                    <ul className='row nav'>
                        <li><NavLink className='nav-link' exact activeStyle={activeStyle} to='/'>Popular</NavLink></li>
                        <li><NavLink className='nav-link' activeStyle={activeStyle} to='/battle'>Battle</NavLink></li>
                    </ul>
                    <button
                     style={{fontSize: 30}}
                     className="btn-clear"
                     onClick={toggleTheme}
                     >
                         {theme === 'light' ? "🔦" : "💡"}
                     </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}

export default Nav;