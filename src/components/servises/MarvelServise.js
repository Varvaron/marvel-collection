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


  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}/characters?limit=9&offset=500&${this._apiKey }`);
  }

  getOneCharacter = (id) => {
    return this.getResource(`${this._apiBase}/characters/${id}?&${this._apiKey}`);
  }
}

export default MarvelServise;