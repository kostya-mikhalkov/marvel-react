class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error("Please sorry your URL in error")
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource("https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=20&apikey=916197d592e0c46ca82d7a622dfd9d5d");
        return res.data.results.map(item => this._transformCharacter(item));
    }

    getCharacters = async (id) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=916197d592e0c46ca82d7a622dfd9d5d`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = ({name, description, thumbnail, id, ...res}) => {
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
            bool: bool
        }
    }
}

export default MarvelService;