class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=8ebab3a29ee910e5a766eae1b55cf57b';
    _baseOffset = '210';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const items = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey }`);
        return items.data.results.map(this._changeCharacter);
    }

    getCharacter = async (id) => {
        const item = await this.getResource(`${this._apiBase}/characters/${id}?&${this._apiKey}`);
        return this._changeCharacter(item.data.results[0]);
    }

    getAllComics = async (offset = 0) => {
        const res = await this.getResource(`${this._apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformComics);
    }

    getComics = async (id) => {
        const res = await this.getResource(`${this._apiBase}comics/${id}?${this._apiKey}`);
        return this._transformComics(res.data.results[0]);
    }

    _changeCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? character.description.slice(0, 225) : 'There is no description for this characher',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items,
        }
    }

    _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
}

export default MarvelService;