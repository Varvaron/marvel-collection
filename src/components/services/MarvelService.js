import  {useHttp } from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=8ebab3a29ee910e5a766eae1b55cf57b';
    const _baseOffset = '210';

    const getAllCharacters = async (offset = _baseOffset) => {
        const items = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey }`);
        return items.data.results.map(changeCharacter);
    }

    const getCharacter = async (id) => {
        const item = await this.getResource(`${_apiBase}/characters/${id}?&${_apiKey}`);
        return changeCharacter(item.data.results[0]);
    }

    const changeCharacter = (character) => {

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

  return {loading, error, clearError, getAllCharacters, getCharacter}
}

export default useMarvelService;