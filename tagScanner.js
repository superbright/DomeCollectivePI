var nfc  = require('nfc').nfc
  , util = require('util');

const {playFile} = require("./AudioPlayer")

var fileArray = [];
var queuetag = "79:b6:7f:4d";
var playtag = "19:c5:3e:7c";
var qmode = false;

var phitags = [
  {
    id : 0,
    uid: "70:ae:6e:31"
  },
  {
    id : 1,
    uid: "b0:59:75:31"
  }
]
 //playFile(0);

var device = new nfc.NFC();
device.on('read', function(tag) {
    // { deviceID: '...', name: '...', uid: '...', type: 0x04 (Mifare Classic) or 0x44 (Mifare Ultralight) }
    console.log(tag.uid); 
    
    if(tag.uid == queuetag) {
      fileArray = [];
      console.log("qmode ");
      qmode = true;
    }
    
    if(qmode && tag.uid == playtag) {
       console.log("play all");
       var k =0;
       fileArray.forEach((audioId) => {
         setTimeout( () => playFile(audioId), 1200 * k)
         k++;
       });
       qmode = false;
    } 

    phitags.forEach( (phitag) => {
      if(phitag.uid == tag.uid) {
        if(qmode) {
          fileArray.push(phitag.id);
          console.log(fileArray);
        } else {
          playFile(phitag.id);
        }
        
      }
    });

    /*
    if(qmode) {
       console.log("add file to q");
    } else {

      if(tag.uid == "70:ae:6e:31") {
        playFile(0);
      } else if(tag.uid =="b0:59:75:31") {
        playFile(1);
      }

    }
    */
    //if ((!!tag.data) && (!!tag.offset)) console.log(util.inspect(nfc.parse(tag.data.slice(tag.offset)), { depth: null }));
}).on('error', function(err) {
    // handle background error;
}).start();
// optionally the start function may include the deviceID (e.g., 'pn53x_usb:160:012')

