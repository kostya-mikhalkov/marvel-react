class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error("Please sorry your URL in error")
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource("https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=20&apikey=916197d592e0c46ca82d7a622dfd9d5d");
    }

    getCharacters = (id) => {
        return this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=916197d592e0c46ca82d7a622dfd9d5d`);
    }
}

export default MarvelService;