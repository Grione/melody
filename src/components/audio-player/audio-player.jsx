import React from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();

		this.state = {
			progress: 0,
			isLoading: true,
			isPlaying: props.isPlaying
		};

		this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
	}

	componentDidMount() {
		const audio = this.myRef.current;

		audio.oncanplaythrough = () =>
			this.setState({
				isLoading: false
			});

		audio.onplay = () => {
			this.setState({
				isPlaying: true
			});
		};

		audio.onpause = () => {
			this.setState({
				isPlaying: false
			});
		};

		audio.ontimeupdate = () =>
			this.setState({
				progress: audio.currentTime
			});
	}

	render() {
		const { isLoading, isPlaying } = this.state;
		const { src } = this.props;

		return (
			<React.Fragment>
				<button
					className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
					type="button"
					disabled={isLoading}
					onClick={this._onPlayButtonClick}
				/>

				<div className="track__status">
					<audio src={src} ref={this.myRef} />
				</div>
			</React.Fragment>
		);
	}

	componentDidUpdate() {
		const audio = this.myRef.current;

		if (this.props.isPlaying) {
			console.log(this.state.isPlaying);
			audio.play();
		} else {
			audio.pause();
		}
	}

	_onPlayButtonClick() {
		this.props.onPlayButtonClick();
		this.setState({ isPlaying: !this.state.isPlaying });
	}
}

AudioPlayer.PropTypes = {
	src: PropTypes.string.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	onPlayButtonClick: PropTypes.func.isRequired
};

export default AudioPlayer;
