import React from 'react';
import PropTypes from 'prop-types';
import Button from './VirtualButton';
import SampleData from './SampleData';

class AlphabetGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...SampleData, showResult: false};
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(event) {
        console.log(`handling button click: ${event.currentTarget.name}, value: ${event.currentTarget.value}`);

        const correctLetter = this.state.alphabet.value;
        const selectedLetter = event.currentTarget.name;

        if (correctLetter === selectedLetter) {
            this.setState({isShowResult: true, isCorrect: true});
        } else {
            this.setState({isShowResult: true, isCorrect: false});
        }
    }

    render() {
        const {title, alphabet, settings, keyboard, isShowResult, isCorrect} = this.state;
        const alphabetStyle = {width: 200, height: 200};
        return (
            <div>
                <h1>{title}</h1>
                <div>
                    {alphabet.image && <img style={alphabetStyle} src={alphabet.image} alt={alphabet.label} />}
                </div>
                <div>
                    {alphabet.audio &&
                    <audio controls
                           autoPlay={settings.audioAutoPlay && 'autoPlay'}
                           loop={settings.audioLoop && 'loop'}
                    >
                        <source src={alphabet.audio} type={alphabet.audioType} />
                    </audio>
                    }
                </div>

                {isShowResult &&
                    <div className={isCorrect ? "correct" : "incorrect"} >
                        {isCorrect ? "Correct!" : "Try Again!"}
                    </div>
                }

                {isShowResult && isCorrect &&
                <div>
                    {alphabet.cursive && <img style={alphabetStyle} src={alphabet.cursive} alt={alphabet.label} />}
                </div>
                }
                <div>
                    {keyboard
                    && keyboard.map(
                        (letter) => {
                            return <Button key={letter.value}
                                           name={letter.value}
                                           value={letter.label}
                                           clickHandler={this.handleButtonClick}/>;
                        }
                    )
                    }
                </div>
            </div>
        )
    }
}

export default AlphabetGame;