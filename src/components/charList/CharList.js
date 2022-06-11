import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServise from '../servises/MarvelServise';

import './charList.scss';

class CharList extends Component {
    state = {
        charactersList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 556,
        listEnded: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharactersLoading();
        this.marvelServise.getAllCharacters(offset)
            .then(this.onCharactersListLoaded)
            .catch(this.onErrorCatch)
    }

    onCharactersListLoaded = (newCharactersList) => {
        let endOfList = false;
        if (newCharactersList.length < 9) {
            endOfList = true;
        }

        this.setState(({charactersList, offset}) => ({
            charactersList: [...charactersList, ...newCharactersList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            listEnded: endOfList,
        }))
    }

    onCharactersLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onErrorCatch = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    renderItems = (array) => {
        const items = array.map((item) => {
            let imageStyle = {'objectFit': 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imageStyle = {'objectFit': 'unset'}
            }

            return (
                <li className="char__item" key={item.id}
                    onClick={() => this.props.onSelectedCharacter(item.id)}>
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

    render() {
        const { charactersList, loading, error, offset, newItemLoading, listEnded } = this.state;
        const items = this.renderItems(charactersList);
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = items ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': listEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
};

export default CharList;