import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './styles.scss';
import '../../commonStyles.scss';
import PropTypes from 'prop-types';
import { alignCenter } from './styles';
function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class AnswerInfoPopup extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleOkClick = this.handleOkClick.bind(this);
	}

	handleClick() {
		this.props.handleClose();
		this.props.showRightAnswer();
	}

	handleOkClick() {
		const { moduleScenario } = this.props;
		this.props.handleClose();
		if (!moduleScenario) {
			this.props.nextQuestion();
		}
	}

	render() {
		const { open, handleClose, imageUrl, answerStatus, message, moduleScenario, currentScore } = this.props;
		return (
			<Dialog
				className="dialog-content"
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
			>
				<DialogTitle id="dialog-slide-image" style={alignCenter}>
					<img className="answer-status-logo" src={imageUrl} alt="answer-status" />
				</DialogTitle>
				<DialogContent>
					<DialogContentText className="greet-message" id="dialog-slide-description">
						<span> {answerStatus ? '¡Felicitaciones!' : ''}</span>
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText className="answer-status-message" id="dialog-slide-description">
						<span>{message}</span>
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText className="points-status" id="dialog-slide-description">
						<span>Haz</span>
						{answerStatus ? (
							<span>
								<span>ganado</span>
								<span className="correct-points"> {moduleScenario ? currentScore : 10} </span>
							</span>
						) : (
							<span>
								<span>perdido</span>
								<span className="wrong-points"> -10</span>
							</span>
						)}{' '}
						<span>puntos.</span>{' '}
						{!answerStatus && (
							<button className="show-right-answer-button" onClick={this.handleClick}>
								Muéstrame la respuesta
							</button>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{answerStatus ? (
						<Button className="ok-button" onClick={this.handleOkClick} color="primary">
							OK
						</Button>
					) : null}
				</DialogActions>
			</Dialog>
		);
	}
}

AnswerInfoPopup.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	imageUrl: PropTypes.string,
	answerStatus: PropTypes.bool,
	message: PropTypes.string,
	showRightAnswer: PropTypes.func,
	nextQuestion: PropTypes.func
};

export default AnswerInfoPopup;
