import axios from "axios";
import getLetterMatchCount from "../helpers";

//action types
export const actionTypes={
    CORRECT_GUESS: 'CORRECT_GUESS',
    GUESS_WORD: 'GUESS_WORD',
    SET_SECRET_WORD: 'SET_SECRET_WORD'
}

//actions for guessed word
export const guessword = (guessedWord)=>{
    return function(dispatch, getState){
        //this get the secret word
        // const secretWord='truck'; //hard coded this before the implementation of the secretword
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        //dispatch action

       

        if(guessedWord === secretWord){
            dispatch({type: actionTypes.CORRECT_GUESS})
        }
            dispatch({
                type: actionTypes.GUESS_WORD,
                payload: {guessedWord, letterMatchCount}
            });
        
    }
}


//action for secret word

export const getSecretWord = ()=>{
    return function(dispatch){
        return axios.get('http://localhost:3030').then((response=>{
            dispatch({
                type:actionTypes.SET_SECRET_WORD,
                payload:response.data
            })
        }))
    }
}