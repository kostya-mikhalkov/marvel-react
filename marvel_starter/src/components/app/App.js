import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../../errorboundary/ErrorBoundary";
import { Comics } from "../page_comics/comics/comics";

import decoration from '../../resources/img/vision.png';

function App() {

    const [charId, setCharId] = useState(null)

    const onChangeId = (id) => {
        setCharId(id)
    }

        return (
            <div className="app">
                <ErrorBoundary>
                    <AppHeader/>
                </ErrorBoundary>
                <main>
                    {/* <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onChangeId={onChangeId}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={charId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/> */}
                    <Comics />
                </main>
            </div>
        )
    }

export default App;