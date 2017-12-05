import {PNG} from 'pngjs';
import Datauri from 'datauri';

const datauri = new Datauri();

export const convert = (rgbaInput, width, height) => {
  // (performance)
  // eslint-disable-next-line no-var
  var idx = 0;

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
    if (rgbaInput.length !== width * height) {
      throw new Error('Invalid length of quadruplet array input, must be ' + width * height);
    }
    data = Buffer.alloc(SIZE);

    while (idx < SIZE) {
      idx = data.writeUInt8(
        rgbaInput[Math.floor(idx / 4)][idx % 4],
        idx
      );
    }
  }

  // Create png instance with metadata
  const png = new PNG();

  png.width = width;
  png.height = height;
  png.data = data;

  // Write image into buffer
  const buffer = PNG.sync.write(png);
  const uri = datauri.format('.png', buffer);

  return uri.content;
};
