import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../../errorboundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        charId: null
    }

    onChangeId = (id) => {
        this.setState({
            charId: id
        })
    }

        return (
            <div className="app">
                <ErrorBoundary>
                    <AppHeader/>
                </ErrorBoundary>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onChangeId={onChangeId}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={charId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

export default App;