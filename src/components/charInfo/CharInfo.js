import { useState, useEffect, Fragment, useCallback } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../services/MarvelService';
import Skeleton from '../skeleton/Skeleton.js';
import './charInfo.scss';

const CharInfo = (props) =>  {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.characterId]);

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

    const clearError = useCallback(() => setError(null), []);

    const updateCharacter = () => {
        const {characterId} = props;

        if (!characterId) {
            return;
        }

        onCharacterLoading();
        
        clearError();
        
        marvelService
            .getCharacter(characterId)
            .then(onCharacterLoaded)
            .catch(onErrorCatch);
    }

    const skeleton = character || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <CharacterView character={character}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const CharacterView = ({character}) => {
    const { name, description, thumbnail, homepage, wiki, comics} = character;
    let imageStyle = {'objectFit': 'cover'};

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imageStyle = {'objectFit': 'unset'}
    }

    return (
        <Fragment>
             <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imageStyle}/>
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
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {
                        comics.map((item, i) => {
                            if (i > 9) return;

                            return (
                                <li key={i} className="char__comics-item">
                                    {`№${i + 1} ${item.name}`}
                                </li>
                            )
                        })
                    }
                </ul>
        </Fragment>
    )
}

export default CharInfo;