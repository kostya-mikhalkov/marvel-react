import { Component } from 'react';
import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        char: [],
        loading: true,
        error: false
    }

    marvel = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    updateChar = () => {
        this.marvel
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onErrorMessage)
    }

    onCharLoaded = (char) => {
        console.log(char)
        this.setState({
            char: char,
            loading: false
        })
    }
    onErrorMessage = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onRenderListElemnt = (char) => {
        const elem = char.map(({name, thumbnail, bool, id}) => {
            let charImgStyle = bool ? 'contain' : 'cover';
            return (
                <li className="char__item"
                    key={id}
                    onClick={() => this.props.onChangeId(id)}>
                    <img src={thumbnail} style={{objectFit: `${charImgStyle}`}} alt="abyss"/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {elem}
            </ul>
        )
    }

    render() {
        const {char, loading, error} = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const elem = this.onRenderListElemnt(char);
        const content = !(loading || error) ? elem : null;

        return (
            <div className="char__list">
                    {spinner || errorMessage || content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;