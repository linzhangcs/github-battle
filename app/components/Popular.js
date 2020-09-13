import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api.js'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function  LanguageNav({selectedLanguage, updateSelectedLanguage}){
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    return(
        <ul className='flex-center'>
            {
                languages.map((language) => (
                    <li key={language}>
                        <button className='btn-clear nav-link'
                            style={ language === selectedLanguage ? { color: 'rgb(143 19 253)' } : null }
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

function ReposGrid({repos}){
    return(
        <ul className='grid space-around'>
            {/* <pre>{JSON.stringify(repos, null, 2)}</pre> */}
            {
                repos.map((repo, index) => {
                    const{name, owner, html_url, stargazers_count, forks, open_issues} = repo;
                    const{ login, avatar_url } =owner;

                    return(
                        <li key={html_url} className='repo bg-light'>
                            <h4 className='header-lg center-text'>
                                # {index + 1}
                            </h4>
                            <img
                                className='avatar'
                                src={avatar_url}
                                alt={`avatar for ${login}`}
                            />
                            <h2 className='center-text'>
                                <a className='link' href={html_url}>{login}</a>
                            </h2>
                            <ul className='card-list'>
                                <li>
                                    <FaUser color="rgb(255, 191, 116)" size={18}></FaUser>
                                    <a href={`https://github.com/${login}`}>{login}</a>
                                </li>
                                <li>
                                    <FaStar color='rgb(255, 215, 0)' size={18}></FaStar>
                                    {stargazers_count.toLocaleString()} starts
                                </li>
                                <li>
                                    <FaCodeBranch color='rgb(129, 195, 245)' size={18}></FaCodeBranch>
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color='rgb(241, 138, 147)' size={18}></FaExclamationTriangle>
                                    {open_issues.toLocaleString()} open issues
                                </li>
                            </ul>
                        </li>
                    );
                })
            }
        </ul>
    );
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired,
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
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}></ReposGrid>}
            </>
        )
    }
}

export default Popular;