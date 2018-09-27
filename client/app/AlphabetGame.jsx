import React from 'react';
import axios from 'axios';
import AlphabetCursive from './AlphabetCursive';
import Button from './VirtualButton';
import SampleData from './SampleData';

class AlphabetGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...SampleData, showResult: false};
        this.handleKeyboardButtonClick = this.handleKeyboardButtonClick.bind(this);
        this.loadNextAlphabet = this.loadNextAlphabet.bind(this);
    }

    componentDidMount() {
        const {language} = this.state.settings;

        this.loadNextAlphabet();

        axios.get(`/api/alphabet/keyboard?language=${language}`).then(resp => {
            this.setState({keyboard: resp.data})
        })
    }

    loadNextAlphabet() {
        const {language} = this.state.settings;
        axios.get(`/api/alphabet/next?language=${language}`).then(resp => {
            this.setState({alphabet: resp.data, isShowResult: false, isCorrect: false})
        })
    }

    handleKeyboardButtonClick(event) {
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

        let buttonSection;
        if (isShowResult && isCorrect) {
            buttonSection = <div>
                {alphabet.cursive && <AlphabetCursive origCurves={alphabet.cursive} origHeight={400} origWidth={400} />}

                <div className="next">
                    <Button name="nextAlphabet" value="Next" clickHandler={this.loadNextAlphabet} />
                </div>
            </div>;
        } else {
            buttonSection = keyboard && keyboard.map(
                    (letter) => {
                        return <Button key={letter.value}
                                       name={letter.value}
                                       value={letter.label}
                                       clickHandler={this.handleKeyboardButtonClick}/>;
                    }
                )
        }

        return (
            <div>
                <h1>{title}</h1>
                <div>
                    {alphabet && alphabet.image && <img style={alphabetStyle} src={alphabet.image} alt={alphabet.label}/>}
                </div>
                <div>
                    {alphabet && alphabet.audio &&
                    <audio controls
                           autoPlay={settings.audioAutoPlay && 'autoPlay'}
                           loop={settings.audioLoop && 'loop'}
                    >
                        <source src={alphabet.audio} type={alphabet.audioType}/>
                    </audio>
                    }
                </div>

                {isShowResult &&
                <div className={isCorrect ? "correct" : "incorrect"}>
                    {isCorrect ? "Correct!" : "Try Again!"}
                </div>
                }

                {buttonSection}
            </div>
        )
    }
}

export default AlphabetGame;