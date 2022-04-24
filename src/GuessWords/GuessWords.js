import React from 'react'
import PropTypes from 'prop-types'


const GuessWords = (props) => {
    let contents;
    if(props.guessedWords.length === 0){
        contents = <span data-test='guess-instruction'>Try to guess the secret words!</span>;
    }else{
        const guessedWordRows = props.guessedWords?.map((word, index)=>(
            <tr data-test='guessedRow' key={index}>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ))
        contents = (
            <div data-test='guessedWordsSection'>
                <h3>Guessed Words</h3>
                <table className='table table-sm'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Guess</th>
                            <th>Matching Letter</th>
                        </tr>
                    </thead>
                    <tbody>
                       {guessedWordRows}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div data-test='guessed-compoennt'>{contents}</div>
    )
}

GuessWords.propTypes ={
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord:PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    )
}

export default GuessWords
