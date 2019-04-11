var soundplayer = require("sound-player");

var options = {
    filename: "ate_english.wav",
    gain: 100,
    debug: true,
    player: "aplay", // "afplay" "aplay" "mpg123" "mpg321"
    device: "plughw:0,0"   //
}

var soundfiles = ["ate_english.wav","punching_english.wav"];
var player = new soundplayer(options);
var index = 0;

var playFile = (index) => {
  options.filename = soundfiles[index];
   player.play();
}

player.on('complete', function() {
    console.log('Done with playback!');
    index++;
    if(index < soundfiles.length) {
        playFile(index);
    } else {
      console.log("finished all the files")
    }
});

player.on('error', function(err) {
    console.log('Error occurred:', err);
});

module.exports = {
    playFile
}

//playFile(index);


// var Sound = require('aplay');

// // with ability to pause/resume:
// var music = new Sound();
// music.play('ate_english.wav');


// // you can also listen for various callbacks:
// music.on('complete', function () {
//   console.log('Done with playback!');
// });
