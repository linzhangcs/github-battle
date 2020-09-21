import React from 'react'
import PropTypes from 'prop-types'
import {ThemeConsumer} from '../contexts/theme'

function Card({ header, subheader, avatar, href, name, children }){
    return(
        <ThemeConsumer>
            {({ theme }) => (
                <div className={`card bg-${theme}`}>
                    <h4 className="header-lg center-text">
                        {header}
                    </h4>
                    <img
                        className='avatar'
                        src={avatar}
                        alt={`avatar for ${name}`} />

                {subheader && (<h4 className='center-text'>
                        {subheader}
                    </h4>)} 
                    <h2 className='center-text'>
                        <a href={href} className='link'>
                            {name}
                        </a>
                    </h2>
                    {/* render the children JSX */}
                    {children}
                </div>
            )}
        </ThemeConsumer>
    )
}
Card.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}
export default Card;