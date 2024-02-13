var inp = document.getElementById("inp")
let btn = document.getElementById("search_btn");
const result = document.getElementById("result")
const sound = document.getElementById("sound")
const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


dataFetch = () => {
    const word = inp.value

    fetch(`${URL}${word}`)
        .then(data => data.json())
        .then(item => {
            const synonyms = item[0].meanings[0].synonyms.map(synonym => `${synonym}`).join(' , ');

            result.innerHTML = `<div class="dict_container_word">
                <h3>${word}</h3>

                <button type="button" onclick="soundPlay()" ><i class="fa-solid fa-volume-high" onclick="soundPlay()"></i></button>
            </div>

            <div class="dict_container_detail">
           
                <p>${item[0].meanings[0].partOfSpeech}</p>
                <p>/${item[0].phonetic
                }</p >
            </div >

            <div class="dict_container_meaning" id="meaning">
                
             ${item[0].meanings[0].definitions[0].definition}
            </div >

                  <h5>synonyms : </h5 >
                  <p style="color:grey">${synonyms || 'Not found'} </p>

    <div class="dict_container_example">
        ${item[0].meanings[0].definitions[0].example || '', console.log(item[0].phonetics[0])
                }
    </div > `
            sound.setAttribute("src", `${item[0].phonetics[0].audio}`)
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error"> oops! Word is not found 😦</h3 > `
        })

}
inp.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        dataFetch()
    }
})
btn.addEventListener("click", () => {
    dataFetch()
})

function soundPlay() {
    sound.play();
}
soundPlay()