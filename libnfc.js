const {NFC, NFCReader} = require('libnfc-js')
const {playFile} = require("./AudioPlayer")

// Core API:
let nfc = new NFC();
console.log(nfc.listDevices())
nfc.close();

// Reader API:
let nfcReader = new NFCReader();
nfcReader.open("pn532_uart:/dev/tty.usbserial"); // or nfcReader.open(); to open the default device

nfcReader.poll(); // polls for the next card
nfcReader.on('card', card => {
    console.log(card);

   // let result = await nfcReader.transceive(Buffer.from([0]));
   // console.log(result);
	
    async function process() {
        // Sending data:
        let result = await nfcReader.transceive(Buffer.from([0]));
        console.log(result);

        await nfcReader.release();
        console.log('card released');
        playFile(0);
        nfcReader.poll(); // polls for the next card
    }

    process();
});

// triggered if polling has failed
nfcReader.on('error', err => {
    throw err;
})
