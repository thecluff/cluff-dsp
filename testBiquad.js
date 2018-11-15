const fs = require("fs");
const WavDecoder = require("wav-decoder");
const bq = require('./biquad.js');
const WavEncoder = require("wav-encoder");

var fn = 'filteredSweep.wav';
var gain = 1.0;

var bqCoeffs = [1.0,0.0,0.0,0.0,-0.81];

function runEncoder(lchan, rchan) {
    const sampleSeq = {
        sampleRate: 44100,
        channelData: [
            lchan, rchan
        ]
    };
    WavEncoder.encode(sampleSeq).then((buffer) => {
        fs.writeFileSync(fn, new Buffer(buffer));
    });
}
const readFile = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, buffer) => {
            if (err) {
                return reject(err);
            }
            return resolve(buffer);
        });
    });
};

readFile("sweep44x16x2.wav").then((buffer) => {
    return WavDecoder.decode(buffer); 
}).then(function(audioData) {
    console.log(audioData.sampleRate);
    var leftChan = bq.biquad(audioData.channelData[0], bqCoeffs);
    var rightChan = bq.biquad(audioData.channelData[1], bqCoeffs);
    leftChan = bq.normalize(leftChan);
    rightChan = bq.normalize(rightChan);
    leftChan = bq.scale(leftChan, gain);
    rightChan = bq.scale(rightChan, gain);

    runEncoder(leftChan, rightChan);
})