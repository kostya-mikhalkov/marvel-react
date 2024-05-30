import { Component } from 'react';
import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/Error';
import { PropTypes } from 'prop-types';

import './charList.scss';

class CharList extends Component {

    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoaded: false,
        offset: 210,
        charEnded: false
    }
    arrRef = [];
    setRefFunction = (elem) => {
        this.arrRef.push(elem);
    }

    marvel = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.setState({
            newItemLoaded: true,
        })
        this.marvel
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onErrorMessage)

    }
    onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar < 9) {
            ended = true;
        }
        this.setState((({char, offset}) => ({
            char: [...char, ...newChar],
            loading: false,
            newItemLoaded: false,
            offset: offset + 9,
            charEnded: ended
        })))
    }
    onErrorMessage = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    onChangeBorder = (ind,id) => {
        // const elements = document.querySelectorAll(".char__item");
        // elements.forEach(item => item.classList.remove("activeBg"))
        // e.currentTarget.classList.add("activeBg")
        this.arrRef.forEach(item => item.classList.remove("activeBg"))
        this.arrRef[ind].classList.add("activeBg");
        this.props.onChangeId(id)
    }
    onChangeInTab = (e, ind, id) => {
        if (e.key === 'Tab') {
            this.onChangeBorder(ind, id);
        }
    }
    onRenderListElemnt = (char) => {
        const elem = char.map(({name, thumbnail, bool, id}, ind) => {
            let charImgStyle = bool ? 'contain' : 'cover';
            return (
                <li className="char__item"
                    ind={ind}
                    ref={this.setRefFunction}
                    key={id}
                    tabIndex={0}
                    onClick={() => this.onChangeBorder(ind, id)}
                    onKeyDown={(e) => this.onChangeInTab(e, ind, id)}>
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
        const {char, loading, error, offset, charEnded} = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const elem = this.onRenderListElemnt(char);
        const content = !(loading || error) ? elem : null;
        console.log(this.arrRef)
        return (
            <div className="char__list">
                    {spinner || errorMessage || content}
                <button className="button button__main button__long"
                        disabled={this.state.newItemLoaded}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

CharList.propTypes = {
    onChangeId: PropTypes.func.isRequired
}