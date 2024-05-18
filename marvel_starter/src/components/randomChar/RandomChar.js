import {Component} from 'react'
import ClampLines from 'react-clamp-lines';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../service/MarvelService';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }
    state = {
        char: {}
    }

    marvelSerice = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({char})
    }

    updateChar = () => {
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelSerice
            .getCharacters(id)
            .then(this.onCharLoaded)
    }

    render() {
        const {char : {name, description, thumbnail, homepage, wiki}} = this.state;
        function truncateText(text, maxLength) {
            if (text && text.length > maxLength) {
              return text.substring(0, maxLength - 3) + '...';
            } else {
              return text;
            }
          }
        const changeText = truncateText(description, 10);

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {changeText}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;