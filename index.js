const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
const webtorrent = require('webtorrent')
const client = new webtorrent();


app.set('views', path.join('views'));
app.set('view engine', 'ejs');



app.get('/',async(req,res) =>{
    let movieData = [];
    let page = req.query.page;
    let limit = req.query.limit;
    if(!page) {
        page = 1
    }

    if(!limit) {
        limit = 10
    }
    let url = `https://yts.mx/api/v2/list_movies.json?quality=1080p&page=${page}&limit=20&query_term=`
    await axios.get(url).then((allData) =>{
        let data = allData.data.data.movies
        
        for(i in data) {
            
            let name = data[i].title;
            let imdb_code = data[i].imdb_code;
            let year = data[i].year;
            let large_cover_image = data[i].large_cover_image;
            let small_cover_image = data[i].small_cover_image;
            let torrents = data[i].torrents;
            let slug = data[i].slug;
            let movieObject = {
                page_number:page,
                name:name,
                imdb_code:imdb_code,
                year:year,
                small_cover_image, small_cover_image,
                large_cover_image:large_cover_image,
                slug:slug,
                torrents:torrents[1],
                
            }
            movieData.push(movieObject)
            
        }
        
        res.render('home', {model:movieData, page:page })
        // res.json(movieData)
    })
    // res.render('home')
})


app.get('/watch/:slug/:hash/:title', async(req,res) =>{
    let magnet = `magnet:?xt=urn:btih:${req.params.hash}&dn=${req.params.slug}&tr=http://track.one:1234/announce&tr=udp://p4p.arenabg.com:1337&udp://tracker.leechers-paradise.org:6969&udp://tracker.openbittorrent.com:80`
    res.render('video', {videoMagnet: magnet, movieName:req.params.title})
    // getTorrentData(req.params.hash, req.params.slug);

})


function getTorrentData(slug, hash) {
    //TODO:create a webtorrent api to stream the movie
    let torrentId = `magnet:?xt=urn:btih:${hash}&dn=${slug}&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent`
    client.add(torrentId, (torrent) =>{
        const file = torrent.files.find((file) =>{
            return file.name.endsWith('.mp4')
        })
        console.log(file)
    })
}






app.listen(3000)


