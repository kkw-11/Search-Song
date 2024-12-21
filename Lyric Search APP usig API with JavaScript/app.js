const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

// API URL
const apiURL = 'https://api.lyrics.ovh';

//listen even in form input
form.addEventListener('submit', e => {
    e.preventDefault();
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

    // console.log(data);
    showData(data);
}

// Display final result

function showData(data) {
    result.innerHTML = `
        <ul class="song-list"> 
            ${data.data.map(song => `
                
                    <li>
                        <div>
                            <img src="${song.artist.picture}"  alt= "Artist name"/>
                            <strong>${song.artist.name}</strong>
                        </div>
                        <span data-artist="${song.artist.name}" data-songtitle=${song.title}>Get lyrics</span>
                    </li>
                `)
            .join(``)}
        
        </ul>
    `;
}

//Event listenr for get lyrics button
result.addEventListener('click', e => {
    
    const clickElement = e.target;

    // checking clicking element is button or not
    if(clickElement.tagName === 'SPAN'){
        const artist = clickElement.getAttribute('data-artist');
        const songTitle = clickElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }

})

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    console.log("test1");
    const data = await res.json();
    console.log("test2");
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    console.log("test3");
    console.log(artist);
    console.log(lyrics);
    result.innerHTML = `
        <div class="full-lyrics">
            <h2>${artist} - ${songTitle}</h2><br>
            <p>${lyrics}</p>
        </div>
    `;
    console.log("test4");
};