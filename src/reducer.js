import { createStore } from 'redux';

const initialState = {
	mistakes: 0,
	step: -1
};

const INCREMENT_MISTAKES = `INCREMENT_MISTAKES`;
const INCREMENT_STEP = `INCREMENT_STEP`;
const RESET = `RESET`;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case INCREMENT_MISTAKES:
			return { ...state, mistakes: state.mistakes + action.payload };
		case INCREMENT_STEP:
			return { ...state, question: state.step + action.payload };
		case RESET:
			return { ...state, initialState };
		default:
			return state;
	}
};

export const incrementStep = () => ({
	type: INCREMENT_STEP,
	payload: 1
});

export const incrementMistake = (userAnswer, question, mistakes, maxMistakes) => {
	let answerIsCorrect = false;

	switch (question.type) {
		case `artist`:
			answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
			break;
		case `genre`:
			answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
			break;
	}

	if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
		return {
			type: RESET
		};
	}

	return {
		type: INCREMENT_MISTAKES,
		payload: answerIsCorrect ? 0 : 1
	};
};

const store = createStore(reducer);

export default store;
