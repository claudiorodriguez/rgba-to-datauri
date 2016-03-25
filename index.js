'use strict';

const PNG = require('pngjs').PNG;
const Datauri = require('datauri');
const datauri = new Datauri();

const rgbaToDataUri = {
  convert: function (rgbaArray, width, height) {
    // TODO: validate input, accept buffers?
    // TODO: add promises, don't do this all on sync
    // Create a png image
    let flat = [], x, r;
    for (x = 0; x < width * height; x++) {
      r = rgbaArray[x];
      flat.push(r[0]);
      flat.push(r[1]);
      flat.push(r[2]);
      flat.push(r[3]);
    }
    let data = new Buffer(flat);
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
