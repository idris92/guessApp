import React from 'react';
import { shallow } from 'enzyme';
import GuessWords from './GuessWords';
import { Provider } from 'react-redux';
import { findByTestAttr, checkProps, storeFactory } from '../test/testUtils';

//creating default props
const defaultProps = {
	guessedWords: [ { guessedWord: 'train', letterMatchCount: 3 } ]
};

//setup
const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	return shallow(<GuessWords {...setupProps} />);
};

//props type
test('Doesnt not throw warning with expected props', () => {
	checkProps(GuessWords, defaultProps);
});

//test for no render error
test('renders without error', () => {
	const wrapper = setup();
	const guessedCompoent = findByTestAttr(wrapper, 'guessed-compoennt');
	expect(guessedCompoent.length).toBe(1);
});


//test if there is no word guessed
describe('if there is no word guessed', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = setup({guessedWords:[]});
    })


    test('run without error', ()=>{
        const guessedComponent = findByTestAttr(wrapper, 'guessed-compoennt');
        expect(guessedComponent.length).toBe(1);
    })

    //expect the guessed word instruction to show
    test('renders instruction to guess a word', ()=>{
        const instruction = findByTestAttr(wrapper, 'guess-instruction');
        expect(instruction.length).not.toBe(0);
    })
})


//test idf there are guessed word
describe('if there are words guessed', ()=>{
    const guessedWords=[
        {guessedWord: 'train', letterMatchCount: 3 },
		{guessedWord: 'agile', letterMatchCount: 1 },
		{guessedWord: 'party', letterMatchCount: 5 }
    ]
    let wrapper
    beforeEach(()=>{
        wrapper = setup({guessedWords})
    })

    test('run without error', ()=>{
        const guessedComponent = findByTestAttr(wrapper, 'guessed-compoennt');
        expect(guessedComponent.length).toBe(1);
    })

    test('renders the guessed word section', ()=>{
        const guessedWordSection=findByTestAttr(wrapper, 'guessedWordsSection')
        expect(guessedWordSection.exists()).toBe(true);
    })

    test('correct number of guessed words', ()=>{
        const guessedNumber = findByTestAttr(wrapper, 'guessedRow');
        expect(guessedNumber.length).toBe(guessedWords.length);
    })
})