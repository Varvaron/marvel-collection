import { useState } from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedCharacter, setCharacter] = useState(null);

    const onSelectedCharacter = (id) => {
        setCharacter(id)
    }

    return (
        <>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onSelectedCharacter={onSelectedCharacter}/>
            </ErrorBoundary>
            <ErrorBoundary>
                <CharInfo characterId={selectedCharacter}/>
            </ErrorBoundary>  
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;