const SampleData = {
    //alphabet: {
    //    label: "B",
    //    value: "b",
    //    image: "http://pngimg.com/uploads/football/football_PNG52781.png",
    //    cursive: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/B_cursiva.gif/400px-B_cursiva.gif",
    //    audio: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Voiced_bilabial_plosive.ogg",
    //    audioType: "audio/ogg"
    //},
    //keyboard: [{value: "a", label: "A"}, {value: "b", label: "B"}, {value: "c", label: "C"}],
    title: "The Alphabet Game",
    settings: {
        language: "BN",
        audioAutoPlay: false,
        audioLoop: false
    },
    alphabets: [
        {
            "id": "101",
            "label": "ক",
            "audioUrl": "/sounds/ka.ogg",
            "words": [
                {"text": "কলা", "imageUrl": "/images/banana.jpg", "audioUrl": "/sounds/kola.ogg"},
                {"text": " কলম", "imageUrl": "/images/pen.jpg", "audioUrl": "/sounds/kolom.ogg"}
            ]
        },
        {
            "id": "102",
            "label": "খ",
            "audioUrl": "/sounds/kha.ogg",
            "words": [
                {"text": "খরগোশ", "imageUrl": "/images/rabbit.jpg", "audioUrl": "/sounds/khorgosh.ogg"}
            ]
        }
    ]
};

export default SampleData;