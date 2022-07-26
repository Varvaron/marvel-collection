import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charactersList, setCharacterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(556);
    const [listEnded, setListEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharactersListLoaded)
            .catch(onErrorCatch)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharactersListLoaded = (newCharactersList) => {
        let endOfList = false;
        if (newCharactersList.length < 9) {
            endOfList = true;
        }

        setCharacterList(charactersList => [...charactersList, ...newCharactersList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setListEnded(endOfList);
    }

    const onErrorCatch = () => {
        setLoading(true);
        setError(false);
    }

    const renderItems = (array) => {
        const items = array.map((item) => {
            let imageStyle = {'objectFit': 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imageStyle = {'objectFit': 'unset'}
            }

            return (
                <li className="char__item" key={item.id}
                    onClick={() => {
                        props.onSelectedCharacter(item.id);
                    }}>
                    <img src={item.thumbnail} alt={`${item.name}`} style={imageStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charactersList);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': listEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset, false)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
};

export default CharList;