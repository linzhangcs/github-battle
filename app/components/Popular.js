import React from 'react'

class Popular extends React.Component{
    render(){
        const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
        return(
        <ul className='flex-center'>
            {
                languages.map((language, index) => (
                <li key={index}>
                    <button className='btn-clear nav-link'>
                        {language}
                    </button>
                </li>
                ))
            }
        </ul>)
    }
}

export default Popular;