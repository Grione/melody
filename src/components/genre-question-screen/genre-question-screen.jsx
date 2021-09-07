import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player';
class GenreQuestionScreen extends React.PureComponent {
	constructor(props) {
		super(props);

    const { question } = this.props;
    const { answers } = question;

		this.state = {
			activePlayer: -1,
      userAnswer: new Array(answers.length).fill(false),
		};
	}

	render() {
		const { step, question, onAnswer } = this.props;
		const { answers, genre } = question;
		return (
				<section className="game__screen">
					<h2 className="game__title">{`Выберите ${genre} треки`}</h2>
					<form
						className="game__tracks"
						onSubmit={(evt) => {
							evt.preventDefault();
							onAnswer(this.state.userAnswer);
						}}
					>
						{answers.map((answer, i) => (
							<div className="track" key={answer.id}>
								<AudioPlayer
									src={answer.src}
									isPlaying={i === this.state.activePlayer}
									onPlayButtonClick={() =>
										this.setState({
											activePlayer: this.state.activePlayer === i ? -1 : i
										})}
								/>

								<div className="game__answer">
									<input
                    checked={this.state.userAnswer[i]}
										className="game__input visually-hidden"
										type="checkbox"
										name="answer"
										value={`answer-${i}`}
										id={`answer-${i}`}
                    onChange={() => {
                      const userAnswer = [...this.state.userAnswer];
                      userAnswer[i] = !userAnswer[i];
                      this.setState({userAnswer});
                    }}
									/>
									<label className="game__check" htmlFor={`answer-${i}`}>
										Отметить
									</label>
								</div>
							</div>
						))}

						<button className="game__submit button" type="submit">
							Ответить
						</button>
					</form>
				</section>
		);
	}
}

GenreQuestionScreen.propTypes = {
	onAnswer: PropTypes.func.isRequired,
	question: PropTypes.shape({
		answers: PropTypes.arrayOf(
			PropTypes.shape({
				src: PropTypes.string.isRequired,
				genre: PropTypes.string.isRequired
			})
		).isRequired,
		genre: PropTypes.string.isRequired,
		type: PropTypes.oneOf([ `genre`, `artist` ]).isRequired
	}).isRequired
};

export default GenreQuestionScreen;
