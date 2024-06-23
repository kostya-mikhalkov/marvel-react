import { Route, Routes } from "react-router-dom";
import React, {lazy, Suspense} from "react";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../../errorboundary/ErrorBoundary";
// import { Comics } from "../page_comics/comics/comics";
// import { Main } from "../page_comics/main/main";
// import { LostPage } from "../page_comics/lostPage/lostPage";
// import { SinglePage } from "../page_comics/singlePage/SinglePage";

const Main = lazy(() => import('../page_comics/main/main.js'));
const Comics = lazy(() => import('../page_comics/comics/comics.js'));
const SinglePage = lazy(() => import('../page_comics/singlePage/SinglePage.js'));
const LostPage = lazy(() => import('../page_comics/lostPage/lostPage.js'));

function App() {

        return (
            <div className="app">
                <ErrorBoundary>
                    <AppHeader/>
                </ErrorBoundary>
                <main>
                   <Suspense fallback={<div>...Load</div>}>
                       <Routes>
                                <Route path="/" element={<Main />}/>
                                <Route path="/comics" element={<Comics />}/>
                                <Route path="/comics/:comicId" element={<SinglePage />}/>
                                <Route path="*" element={<LostPage />}/>
                       </Routes>
                   </Suspense>
                </main>
            </div>
        )
    }

export default App;