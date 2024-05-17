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
        return this._transformCharacter(res);
    }

    getCharacters = async (id) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=916197d592e0c46ca82d7a622dfd9d5d`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = ({name, description, thumbnail, ...res}) => {
        return {
            name: name,
            description: description,
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url
        }
    }
}

export default MarvelService;