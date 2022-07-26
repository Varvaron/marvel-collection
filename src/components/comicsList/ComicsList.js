import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(12);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [listEnded, setListEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onErrorCatch = () => {
        setLoading(true);
        setError(false);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        onComicsListLoading();
        marvelService.getAllComics(offset)
            .then(onComicsListLoaded)
            .catch(onErrorCatch)
    }

    const onComicsListLoading = () => {
        setNewItemLoading(true);
    }

    const onComicsListLoaded = (newComicsList) => {
        let endOfList = false;
        if (newComicsList.length < 8) {
            endOfList = true;
        }

        setComicsList([...comicsList, ...newComicsList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setListEnded(endOfList);
    }

    const renderComics = (array) => {
        const items = array.map((item, i) => {
            return (
                <li className="comics__item" key={i}> 
                    <a href="#">
                        <img src={item.thumbnail} alt={`${item.name}`} className='comics__item-img'/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
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
}

export default ComicsList;