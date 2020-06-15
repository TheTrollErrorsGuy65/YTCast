const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs')
const YT_API_KEY = ""
let currentVideo = ""

function log(message, level) {
    /*
    logging levels:
    0 - info
    1 - warn
    2 - error
    */
    let levels = ["INFO", "WARN", "ERROR"]
    console.log("[" + levels[level] + "] " + message)
}

const app = express();

function download(v, re) {
    ytdl(v, {
        format: 'mp4',
        quality: 'lowestvideo',
        filter: 'audioandvideo'
    }).pipe(fs.createWriteStream(v + '.mp4').on('finish', function() {
        log("Downloaded a YouTube video! Playing it on the client.", 0)
        currentVideo = v
        re.send("OK")
    }).on("error", function(err) {
        log(err, 2)
    }))
}

app.listen(80, () => {
	log("YTCast started successfully!", 0)
});

app.get("/", (req,res) => res.redirect("/computer_welcome.html"))
app.get("/search", (req,res) => res.redirect("/computer_search.html"))
app.get("/mobile", (req,res) => res.redirect("/mobile_client.html"))

app.get('/download', (req,res) => {
    var v = req.originalUrl.split("?v=")[1]
    console.log(req.originalUrl);
	try {
        log("Downloading YouTube video. Attempt 1/2.", 0)
        download(v, res)
    }
    catch(error) {
        log("First download attempt failed. Attempt 2/2.", 1)
        download(v, res)
    }
    
});

app.get('/ping', (req,res) => {
    // every some time, the mobile client sends a ping to a server to check if the connection is active
    // if the ping fails, a "Disconnected" message appears
    res.send("OK")
});

app.get('/api/video', (req,res) => {
    // returns a video ID to play on the client
    res.send(currentVideo)
});

app.get('/api/ytkey', (req,res) => {
    res.send(YT_API_KEY)
});

app.use(express.static("./"))

