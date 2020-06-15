# YTCast
Cast YouTube to your devices straight from your computer.

## Requirements
- Stable Wi-Fi connection,
- YouTube API V3 key

## Installation
1. Install node.js, if you don't have it already.
2. In your working directory, install `express` and `ytdl-core` modules using `npm install express ytdl-core`
3. Edit the start.js file and fill the `YT_API_KEY` variable with your YouTube API key.
4. Start the script with `node start.js`.
5. Go to http://localhost/. If everything went right, you should see a page with further instructions.

## Other
- If you just loaded the page on a target device, you have to click the play button for the first video due to autoplay policy.
- Due to Google's quota system, if you use this a lot, you might need to enter direct video links instead of search terms later.
