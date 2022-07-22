import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, []);

    const onErrorCatch = () => {
        setLoading(false);
        setError(true);
    }
    
    const onCharacterLoading = () => {
        setLoading(true);
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
        setLoading(false);
    }
    
    const updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharacterLoading();
        
        marvelService
            .getCharacter(id)
            .then(onCharacterLoaded)
            .catch(onErrorCatch);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <CharacterView character={character}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">Random character for today!</p>
                <p className="randomchar__title">Do you want to get to know him better?</p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const CharacterView = ({character}) => {
    const { name, description, thumbnail, homepage, wiki} = character;
    let imageClasses = 'randomchar__img';

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imageClasses += ' randomchar__img--notavailable';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imageClasses}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
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
    )
}

export default RandomChar;