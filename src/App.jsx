import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import './App.css';
import './styles/bootstrap.grid.css';
import './styles/bootstrap.utilities.css';
import './styles/spinner.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const googleURL = 'https://www.google.com/search?q=';
const youtubeURL = 'https://www.youtube.com/results?search_query=';

export class App extends Component {
	constructor() {
	  	super();
	  	this.state = {
			listening: false
		};
	}

	componentDidMount = () => {
		this.setState({ listening: true }, this.handleListen);
	}

	handleListen = () => {
		recognition.start();
		recognition.onresult = (e) => {
			const speech = e.results[0][0].transcript;
			window.open(googleURL + speech, '_blank');
		}
		recognition.onend = () => this.setState({ listening: false });
	}
	
	render = () => (
		<div className="container text-center">
			<h1 className="mt-5">Welcome to <span className="title">Speak-2-Search</span></h1>
			<p className="intro">Are you tired of writing questions on google? well, we are here to listen!</p>
			<div className="mt-5">
				<div className="listening">
					{ this.state.listening && 
						<div>
							<Animated animationIn="fadeInUp" animationInDuration="400" isVisible={true}>
								<div>App is Listening!</div>
								<div className="spinner mx-auto mt-3">
									<div className="double-bounce1"></div>
									<div className="double-bounce2"></div>
								</div>
							</Animated>
						</div>
					}
				</div>
				{ !this.state.listening && 
					<Animated animationIn="fadeInUp" animationInDuration="400" isVisible={true}>
						<button className="btn" onClick={this.componentDidMount}>Speak</button>
					</Animated>
				}
			</div>
		</div>
	);
}