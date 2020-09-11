import React from 'react'
import PropTypes from 'prop-types'

function  LanguageNav({selectedLanguage, updateSelectedLanguage}){
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return(
        <ul className='flex-center'>
            {
                languages.map((language) => (
                    <li key={language}>
                        <button className='btn-clear nav-link'
                            style={ language === selectedLanguage ? { color: 'rgb(59, 7, 150)' } : null }
                            onClick={() => updateSelectedLanguage(language)}
                        >
                            {language}
                        </button>
                    </li>
                    ))
            }
        </ul>
    );
}

LanguageNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    updateSelectedLanguage: PropTypes.func.isRequired,
}

class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }

        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
    }

    updateSelectedLanguage(selectedLanguage){
        this.setState({
            selectedLanguage
        })
    }

    render(){
        return(
            <LanguageNav
                selectedLanguage = {this.state.selectedLanguage}
                updateSelectedLanguage = {this.updateSelectedLanguage}
            ></LanguageNav>
        )
    }
}

export default Popular;