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

const expectedFlatArrayUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAO0lEQVR4AYXB0Q0A' +
  'EBBEwbdyHem/BDUtER9HhBkB5iEYzJ2AYJHZWEyFTK7IlaTwEWRW4xAsFlcCzEMHq+YKSPX/JJQAAAAASUVORK5CYII=';


exports['Convert RGBA to PNG datauri'] = {
  'from flat array of rgba quads': function(done) {
    this.timeout(5000);

    let startTime = new Date().valueOf();

    let uri = rgbaToDataUri.convert(testFlatArray, 8, 8)

    expect(uri).to.eql(expectedFlatArrayUri);

    var timeElapsed = new Date().valueOf() - startTime;
    console.log(timeElapsed + ' ms');
    done();
  }
};
