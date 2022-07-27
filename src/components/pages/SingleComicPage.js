import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../services/MarvelService';

import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateComic();
    }, [comicId])

    const marvelService = new MarvelService();

    const onErrorCatch = () => {
        setLoading(false);
        setError(true);
    }
    
    const onComicLoading = () => {
        setLoading(true);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
        setLoading(false);
    }

    const clearError = useCallback(() => setError(null), []);

    const updateComic = () => {
        onComicLoading();
        
        clearError();
        
        marvelService
            .getComics(comicId)
            .then(onComicLoaded)
            .catch(onErrorCatch);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const comicContent = !(loading || error || !comic) ? <ComicView comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {comicContent}
        </>
    )
}

const ComicView = ({comic}) => {
    const {title, thumbnail, description, language, price, pageCount} = comic;

    return (
        <>
        <div className='single-comic'>
            <img src={thumbnail} alt={`${title} cover`} className='single-comic__img'/>
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
                <p className='single-comic__descr'>{pageCount}</p>
                <p className='single-comic__descr'>{`Language: ${language}`}</p>
                <div className='single-comic__price'>{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
        </>
    )
}

export default SingleComicPage;