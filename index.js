const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')
const webtorrent = require('webtorrent')
const client = new webtorrent();


app.set('views', path.join('views'));
app.set('view engine', 'ejs');
let movieData = [];

let url = `https://yts.mx/api/v2/list_movies.json?quality=1080p&page=1&limit=20&query_term=`
app.get('/',async(req,res) =>{
    await axios.get(url).then((allData) =>{
        let data = allData.data.data.movies
        let page = allData.data.page_number;
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
        res.render('home', {model:movieData, pageNumber:page})
        // res.json(movieData)
    })
    // res.render('home')
})

app.listen(3000)