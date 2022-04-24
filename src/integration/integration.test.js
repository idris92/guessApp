//storeFactory take in initialState props
import { storeFactory } from '../test/testUtils';

//guessword take in props of guessword
import { guessword } from '../actions';

describe('guessword action dispatcher', () => {
	const secretWord = 'party';
	const unsuccessfulGuess = 'train';

	describe('no guessed words', () => {
		let store;
		const initialState = { secretWord };

		beforeEach(() => {
			store = storeFactory(initialState);
		});

		test('updates state correctly for unsuccessful guess', () => {
			store.dispatch(guessword(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				...initialState,
				success: false,
				guessedWords: [
					{
						guessedWord: unsuccessfulGuess,
						letterMatchCount: 3
					}
				]
			};
			expect(newState).toEqual(expectedState);
		});

		test('updates state correctly for successful guess', () => {
			store.dispatch(guessword(secretWord));
			const newState = store.getState();
			const expectedState = {
				...initialState,
				success: true,
				guessedWords: [
					{
						guessedWord: secretWord,
						letterMatchCount: 5
					}
				]
			};
			expect(newState).toEqual(expectedState);
		});
	});
	describe('some guessed words', () => {
		//when there use already guessed some words
		//this is the word user have guessed before
		const guessedWords = [ { guessedWord: 'agile', letterMatchCount: 1 } ];
		//out initial state will contain the guessedwords and the secretword and our success will be default which is false
		const initialState = { guessedWords, secretWord };
		let store;
		beforeEach(() => {
			store = storeFactory(initialState);
		});

		test('updates state correctly for unsuccessful guess', () => {
			store.dispatch(guessword(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				secretWord,
				success: false,
				guessedWords: [
					...guessedWords,
					{
						guessedWord: unsuccessfulGuess,
						letterMatchCount: 3
					}
				]
			};

			expect(newState).toEqual(expectedState);
		});

        test('update state correctly for successful guess', ()=>{
            store.dispatch(guessword(secretWord));
            const newState = store.getState();
            const expectedState={
                secretWord,
                success:true,
                guessedWords:[
                    ...guessedWords,
                    {
                        guessedWord:secretWord,
                        letterMatchCount:5
                    }
                ]
            }
            expect(newState).toEqual(expectedState);
        })
	});
});
