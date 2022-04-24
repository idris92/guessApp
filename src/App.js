
import './App.css';
import { useEffect } from 'react';
import Input from './Input/Input';
import Congrat from './Congrat/Congrat';
import GuessWords from './GuessWords/GuessWords';
import { useSelector, useDispatch } from 'react-redux';
import { getSecretWord } from './actions';

function App() {
  const dispatch = new useDispatch();
  const guessedWords = useSelector(state => state.guessedWords);
  const secretWord = useSelector(state=>state.secretWord)
  const success = useSelector(state=>state.success)

  useEffect(() => {
    dispatch(getSecretWord())
  }, [])

  return (
    <div className="container">
      <h1>Jotto</h1>
      <h4>The secret word is: {secretWord}</h4>
      <Congrat success={success}/>
      <Input/>
      <GuessWords guessedWords={guessedWords}/>
    </div>
  );
}

export default App;
