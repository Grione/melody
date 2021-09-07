import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player';

class ArtistQuestionScreen extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isPlaying: false
		};
	}

	render() {
		const { step, question, onAnswer } = this.props;
		const { answers, song } = question;
		const { isPlaying } = this.state;

		return (
			<section className="game__screen">
				<h2 className="game__title">Кто исполняет эту песню?</h2>
				<div className="game__track">
					<div className="track">
						<AudioPlayer
							src={song.src}
							isPlaying={isPlaying}
							onPlayButtonClick={() => {
								this.setState({ isPlaying: !isPlaying });
							}}
						/>
					</div>
				</div>

				<form className="game__artist">
					{answers.map((answer, i) => (
						<div key={answer.id} className="artist">
							<input
								className="artist__input visually-hidden"
								type="radio"
								name="answer"
								value={`answer-${i}`}
								id={`answer-${i}`}
								onClick={() => onAnswer(answer)}
							/>
							<label className="artist__name" htmlFor={`answer-${i}`}>
								<img className="artist__picture" src={answer.picture} alt={answer.artist} />
								{answer.artist}
							</label>
						</div>
					))}
				</form>
			</section>
		);
	}
}

ArtistQuestionScreen.propTypes = {
	onAnswer: PropTypes.func.isRequired,
	question: PropTypes.shape({
		answers: PropTypes.arrayOf(
			PropTypes.shape({
				picture: PropTypes.string.isRequired,
				artist: PropTypes.string.isRequired
			}).isRequired
		),
		song: PropTypes.shape({
			artist: PropTypes.string.isRequired,
			src: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
};
export default ArtistQuestionScreen;
