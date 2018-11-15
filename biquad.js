module.exports = {

    normalize: function(inp) {
        const inpAry = inp.slice();
        var highestAmp = 0.0;
        for(n=0;n<inpAry.length;n++) {
            if(inpAry[n] > highestAmp) {
            highestAmp = inpAry[n];
        }
    }
    var normFac = 1/highestAmp;

    for(n=0;n<inpAry.length;n++) {
        inpAry[n] = inpAry[n] * normFac;
    }
    return inpAry;
},

biquad: function(inBuf, coeffs) {
    for(var i=0;i<coeffs.length;i++) {
        // console.log(coeffs[i]);
    }
    var outBuf = new Float32Array(inBuf.length);

    var b = new Float32Array(2);
    var a = new Float32Array(2);

    b[0] = 0.0; b[1] = 0.0;
    a[0] = 0.0; a[1] = 0.0;

    for(var ndx=0; ndx<inBuf.length; ndx++) {
    outBuf[ndx] = inBuf[ndx] * coeffs[0] + b[0] * coeffs[1] + b[1] * coeffs[2] + a[0] * coeffs[3] + a[1] * coeffs[4];

    b[1] = b[0.0]; b[0] = inBuf[ndx];
    a[1] = a[0.0]; a[0] = outBuf[ndx];
}
    return outBuf;
},

reverse: function(inBuf) {
    var temp = new Float32Array(inBuf.length);
    var length = inBuf.length;
    for(var ndx=0;ndx<length;ndx++) {
        temp[length-ndx-1] = inBuf[ndx];
    }
    return temp;
},

scale: function(inBuf, gainFac) {
    var temp = new Float32Array(inBuf.length);
    var length = inBuf.length;
    for(var ndx=0;ndx<length;ndx++) {
        temp[ndx] = inBuf[ndx] * gainFac;
    }
    return temp;
}

};