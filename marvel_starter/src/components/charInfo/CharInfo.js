import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import MarvelService from '../../service/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvel = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return
        }
        this.setState({
            loading: true
        })
        this.marvel
            .getCharacters(charId)
            .then(this.onCharLoaded)
            .catch(this.onCharError)
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }
    onCharError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton || errorMessage || spinner || content}
            </div>
        )
    }
}

const View = (char) => {
    const {name, thumbnail, description, homepage, wiki, comics, bool} = char.char;
    const styleImg = bool ? 'contain' : 'cover';
    return (
        <>
                <div className="char__basics">
                <img src={thumbnail} 
                     alt={name}
                     style={{objectFit: `${styleImg}`}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">{comics.length !== 0 ? 'Comics:' : 'Sorry, but this character doesn\'t have any comics in our database'}</div>
            <ul className="char__comics-list">
                {comics.map((item, i) => {
                        if (i <= 9) {
                            return (
                                <li className="char__comics-item"
                                    key={i}>
                                        {item.name}
                                </li>
                            )
                        }
                    })}
            </ul>
        </>      
    )
}
export default CharInfo;