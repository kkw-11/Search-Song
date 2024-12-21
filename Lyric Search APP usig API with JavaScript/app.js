const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

// API URL
const apiURL = 'https://api.lyrics.ovh';

//listen even in form input
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(search.value);
    searchValue = search.value.trim();

    if(!searchValue){
        alert("There is nothing to search!");
    }
    else{
        alert("Search");
        searchSong(searchValue);
    }
});

async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    console.log(data);
    // showData(data);
}

// Display final result

// function showData(data) {
//     result.innerHTML = `
//         <ul class="song-list"> 
//             ${data.datal.map(song => `
                
//                     <li>
//                         <div>
//                             <img src="${song.artist.picutre}" />
//                         </div>
//                     </li>
//                 `)}
        
//         </ul>
//     `;
// }