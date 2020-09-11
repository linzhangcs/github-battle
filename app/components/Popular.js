import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api.js'

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
            selectedLanguage: 'All',
            repos: {},
            error: null,
        }

        this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
    }
    componentDidMount(){
        this.updateSelectedLanguage('All');
    }
    updateSelectedLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null,
        })

        // only fetch if there is no repos for this language
        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage)
            .then((data) => {
                this.setState(({ repos }) =>({
                    repos:{
                        ...repos,
                        [selectedLanguage]: data
                    }
                }))
            })
            .catch((error) => {
                console.warn('Error fetching repos', error);
    
                this.setState({
                    error: 'There was an error fetching the repos'
                })
            })

            // fetchPopularRepos(selectedLanguage)
            // .then((repos) => this.setState({
            //     repos,
            //     error: null
            // }))
        }
    }
    isLoading(){
        const{ selectedLanguage, repos, error} = this.state
        return !repos[selectedLanguage] && error === null;
    }

    render(){
        const{error, selectedLanguage, repos} = this.state;
        return(
            <>
                <LanguageNav
                    selectedLanguage = {this.state.selectedLanguage}
                    updateSelectedLanguage = {this.updateSelectedLanguage}
                ></LanguageNav>
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {console.log(repos)}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </>
        )
    }
}

export default Popular;