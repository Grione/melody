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
    const {src} = this.props;
    audio.src = src;

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

  componentWillUnmount() {
    const audio = this.myRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

	render() {
		const { isLoading, isPlaying } = this.state;

		return (
			<React.Fragment>
				<button
					className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
					type="button"
					disabled={isLoading}
					onClick={(this._onPlayButtonClick)}
				/>

				<div className="track__status">
					<audio ref={this.myRef} />
				</div>
			</React.Fragment>
		);
	}

	componentDidUpdate() {
		const audio = this.myRef.current;

		if (this.props.isPlaying) {
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

AudioPlayer.propTypes = {
	src: PropTypes.string.isRequired,
	isPlaying: PropTypes.bool.isRequired,
};

export default AudioPlayer;
