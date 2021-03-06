const initialState = {
	mistakes: 0,
	step: -1
};

const isArtistAnswerCorrect = (userAnswer, question) => userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) =>
	userAnswer.every((it, i) => it === (question.answers[i].genre === question.genre));

const ActionType = {
	INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
	INCREMENT_STEP: `INCREMENT_STEP`,
	RESET: `RESET`
};

const ActionCreator = {
	incrementStep: () => ({
		type: ActionType.INCREMENT_STEP,
		payload: 1
	}),

	incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
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
				type: ActionType.RESET
			};
		}

		return {
			type: ActionType.INCREMENT_MISTAKES,
			payload: answerIsCorrect ? 0 : 1
		};
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.INCREMENT_MISTAKES:
			return { ...state, mistakes: state.mistakes + action.payload };
		case ActionType.INCREMENT_STEP:
			return { ...state, step: state.step + action.payload };
		case ActionType.RESET:
			return { ...state, initialState };
		default:
			return state;
	}
};

export { reducer, ActionCreator, isArtistAnswerCorrect, isGenreAnswerCorrect };
