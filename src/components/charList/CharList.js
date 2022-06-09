import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServise from '../servises/MarvelServise';

import './charList.scss';

class CharList extends Component {
    state = {
        charactersList: [],
        loading: true,
        error: false
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.marvelServise.getAllCharacters()
            .then(this.onCharactersListLoaded)
            .catch(this.onErrorCatch)
    }

    onCharactersListLoaded = (charactersList) => {
        this.setState({
            charactersList,
            loading: false,
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
        const { charactersList, loading, error } = this.state;
        const items = this.renderItems(charactersList);
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = items ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
};

export default CharList;