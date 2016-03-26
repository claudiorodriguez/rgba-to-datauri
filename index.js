'use strict';

const PNG = require('pngjs').PNG;
const Datauri = require('datauri');
const datauri = new Datauri();

const rgbaToDataUri = {
  convert: function (rgbaInput, width, height) {
    // TODO: validate input
    // TODO: add promises, don't do this all on sync
    const SIZE = width * height * 4;
    let data;

    if (Buffer.isBuffer(rgbaInput)) {
      // input is flattened buffer
      if (rgbaInput.length !== SIZE) {
        throw new Error('Invalid input buffer length, must be ' + SIZE + ' bytes');
      }
      data = rgbaInput;
    } else {
      // input is array of quadruplets
      if (rgbaInput.length !== (width * height)) {
        throw new Error('Invalid length of quadruplet array input, must be ' + (width * height));
      }
      data = Buffer(SIZE);
      var idx = 0;
      while ((idx = data.writeUInt8(rgbaInput[Math.floor(idx / 4)][idx % 4], idx)) < SIZE);
    }

    // Create png instance with metadata
    let png = new PNG();
    png.width = width;
    png.height = height;
    png.data = data;

    // Write image into buffer
    let buffer = PNG.sync.write(png);
    let uri = datauri.format('.png', buffer);
    return uri.content
  }
};

module.exports = rgbaToDataUri;
