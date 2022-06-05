class MarvelServise {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=8ebab3a29ee910e5a766eae1b55cf57b';

    getResource = async (url) => {
        let resource = await fetch(url);

        if (!resource.ok) {
            throw new Error(`Could not fetch ${url}, status: ${resource.status}`);
    }

    return await resource.json();
    }


    getAllCharacters = async () => {
        const items = await this.getResource(`${this._apiBase}/characters?limit=9&offset=500&${this._apiKey }`);
        return items.data.results.map(this.changeCharacter);
    }

    getCharacter = async (id) => {
        const item = await this.getResource(`${this._apiBase}/characters/${id}?&${this._apiKey}`);
        return this.changeCharacter(item.data.results[0]);
    }

    changeCharacter = (character) => {

    return {
        name: character.name,
        description: character.description ? character.description.slice(0, 225) : 'The description is not available',
        thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
        homepage: character.urls[0].url,
        wiki: character.urls[1].url,
    }
  }
}

export default MarvelServise;