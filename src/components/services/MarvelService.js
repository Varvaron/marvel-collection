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
        return items.data.results.map(this.changeCharacter);
    }

    getCharacter = async (id) => {
        const item = await this.getResource(`${this._apiBase}/characters/${id}?&${this._apiKey}`);
        return this.changeCharacter(item.data.results[0]);
    }

    changeCharacter = (character) => {

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
}

export default MarvelService;