import { useHttp } from "../hooks/http.hooks";

export const ComicsServices = () => {
    const {loading, request, error, clearError} = useHttp();
    const _offsetReq = 210;

    const getAllCharacters = async (offset = _offsetReq) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=916197d592e0c46ca82d7a622dfd9d5d`);
        return res.data.results.map(item => _transformCharacter(item));
    }

    const getCharacters = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=916197d592e0c46ca82d7a622dfd9d5d`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = ({images, prices, pageCount, title, description, thumbnail, id, ...res}) => {
        const imgNotAvalible = thumbnail.path.slice(thumbnail.path.length - 9, thumbnail.path.length);
        let bool;
        if (imgNotAvalible === 'available') {
            bool = true;
        } else {
            bool = false;
        }
        return {
            id: id,
            prices: prices[0].price,
            pageCount: pageCount,
            title: title,
            images: images[0].path + '.' + images[0].extension,
            description: description,
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            bool: bool,
        }
    }
    return {loading, error, getAllCharacters, getCharacters, clearError};
}