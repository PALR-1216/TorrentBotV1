const axios = require('axios')
const readline = require('readline').createInterface({
    input:process.stdin,
    output:process.stdout
})
// const prompt = require('prompt-sync')({sigint:true});
// const prompt = requrie('prompt')


// magnet:?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://p4p.arenabg.com:1337&udp://tracker.leechers-paradise.org:6969&udp://tracker.openbittorrent.com:80



async function searchMovie(search) {
    let url = `https://yts.mx/api/v2/list_movies.json?quality=1080p&limit=20&query_term=${search}`
    await axios.get(url).then((allData) =>{
        let response = allData.data.data.movies;
        for(i in response) {
            let torrents = response[i].torrents;
            console.log(`${response[i].title} -- ${response[i].year} -- ${response[i].imdb_code} -- ${torrents[1].quality} -- ${torrents[1].size}`)
            let magnet =`magnet:?xt=urn:btih:${torrents[1].hash}&dn=${response[i].slug}&tr=http://track.one:1234/announce&tr=udp://p4p.arenabg.com:1337&udp://tracker.leechers-paradise.org:6969&udp://tracker.openbittorrent.com:80`
            console.log(magnet)

        }
    })
}

async function getMovie() {
    console.log("Movie shere")
}

function main() {
    console.log("Enter 1 to search a Movie with the imdbID")
    console.log("Enter 2 to search from a year")
    readline.question("\nEnter your op :", op =>{
        if(op == 1) {
            let search = "Enter the imdbID to search: "
            readline.question("Enter the imdbID to search: ", id =>{
                searchMovie(id)

            })
        }

        if(op == 2) {
            getMovie();
        }
    })
    
}

main()

