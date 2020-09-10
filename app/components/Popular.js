import React from 'react'

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
        const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
        return(
        <ul className='flex-center'>
            {
                languages.map((language, index) => (
                <li key={language}>
                    <button className='btn-clear nav-link'
                        style={ language === this.state.selectedLanguage ? { color: 'rgb(59, 7, 150)' } : null }
                        onClick={() => this.updateSelectedLanguage(language)}
                    >
                        {language}
                    </button>
                </li>
                ))
            }
        </ul>)
    }
}

export default Popular;