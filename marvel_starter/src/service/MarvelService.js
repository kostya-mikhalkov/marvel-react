import { useHttp } from "../hooks/http.hooks";

const MarvelService = () => {
    const _offsetReq = 210;
    const {loading, request, error, clearError} = useHttp();

    const getAllCharacters = async (offset = _offsetReq) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=916197d592e0c46ca82d7a622dfd9d5d
        `);
        return res.data.results.map(item => _transformCharacter(item));
    }

    const getCharacters = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=916197d592e0c46ca82d7a622dfd9d5d`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharactersByName = async (name) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=916197d592e0c46ca82d7a622dfd9d5d`);
        return res.data.results.map(item => _transformCharacter(item));
    }

    const _transformCharacter = ({name, description, thumbnail, id, ...res}) => {
        const imgNotAvalible = thumbnail.path.slice(thumbnail.path.length - 9, thumbnail.path.length);
        let bool;
        if (imgNotAvalible === 'available') {
            bool = true;
        } else {
            bool = false;
        }
        return {
            id: id,
            name: name,
            description: description.length > 190 ? `${description.slice(0, description.length - 3)}...`:
                         description ? description : 'Sorry',
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            bool: bool,
            comics: res.comics.items
        }
    }
    return {loading, error, getAllCharacters, getCharacters, clearError, getCharactersByName};
}

export default MarvelService;