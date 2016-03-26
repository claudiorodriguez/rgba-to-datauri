'use strict';

const chai = require('chai'),
    rgbaToDataUri = require('../index');

const expect = chai.expect,
    assert = chai.assert;

// ----- Basic tests ----- //

const testFlatArray = [
  [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255],
  [0,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [0,0,0,255],
  [0,0,0,255], [255,0,0,255], [0,255,0,255], [0,255,0,255], [0,255,0,255], [0,255,0,255], [255,0,0,255], [0,0,0,255],
  [0,0,0,255], [255,0,0,255], [0,255,0,255], [0,0,255,50], [0,0,255,50], [0,255,0,255], [255,0,0,255], [0,0,0,255],
  [0,0,0,255], [255,0,0,255], [0,255,0,255], [0,0,255,50], [0,0,255,50], [0,255,0,255], [255,0,0,255], [0,0,0,255],
  [0,0,0,255], [255,0,0,255], [0,255,0,255], [0,255,0,255], [0,255,0,255], [0,255,0,255], [255,0,0,255], [0,0,0,255],
  [0,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [255,0,0,255], [0,0,0,255],
  [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255], [0,0,0,255]
];

const testFlatBuffer = Buffer(8 * 8 * 4);
var idx = 0;
while ((idx = testFlatBuffer.writeUInt8(testFlatArray[Math.floor(idx / 4)][idx % 4], idx)) < (8 * 8 * 4));

const expectedUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAO0lEQVR4AYXB0Q0A' +
  'EBBEwbdyHem/BDUtER9HhBkB5iEYzJ2AYJHZWEyFTK7IlaTwEWRW4xAsFlcCzEMHq+YKSPX/JJQAAAAASUVORK5CYII=';

exports['Convert RGBA to PNG datauri'] = {
  'from flat array of rgba quads': function(done) {
    this.timeout(5000);

    let startTime = new Date().valueOf();

    let uri = rgbaToDataUri.convert(testFlatArray, 8, 8);

    expect(uri).to.eql(expectedUri);

    var timeElapsed = new Date().valueOf() - startTime;
    console.log(timeElapsed + ' ms');
    done();
  },

  'from flattened buffer': function(done) {
    this.timeout(5000);

    let startTime = new Date().valueOf();

    let uri = rgbaToDataUri.convert(testFlatBuffer, 8, 8);

    expect(uri).to.eql(expectedUri);

    var timeElapsed = new Date().valueOf() - startTime;
    console.log(timeElapsed + ' ms');
    done();
  },

  'invalid input throws error': function(done) {
    this.timeout(5000);
    expect(function () {
        rgbaToDataUri.convert(new Buffer([1,2,3,4,5]), 8, 8);
      }).to.throw(Error);
    done();
  }
};
