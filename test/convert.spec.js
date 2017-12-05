import {convert} from '../index';

// ----- Basic tests ----- //

const testFlatArray = [
  [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255],
  [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255],
  [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 0, 0, 255],
  [0, 255, 0, 255], [0, 255, 0, 255], [0, 255, 0, 255], [0, 255, 0, 255], [255, 0, 0, 255], [0, 0, 0, 255],
  [0, 0, 0, 255], [255, 0, 0, 255], [0, 255, 0, 255], [0, 0, 255, 50], [0, 0, 255, 50], [0, 255, 0, 255],
  [255, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 0, 0, 255], [0, 255, 0, 255], [0, 0, 255, 50],
  [0, 0, 255, 50], [0, 255, 0, 255], [255, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 0, 0, 255],
  [0, 255, 0, 255], [0, 255, 0, 255], [0, 255, 0, 255], [0, 255, 0, 255], [255, 0, 0, 255], [0, 0, 0, 255],
  [0, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255], [255, 0, 0, 255],
  [255, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255],
  [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255]
];

const testFlatBuffer = Buffer.alloc(8 * 8 * 4);
let idx = 0;

while (idx < 8 * 8 * 4) {
  idx = testFlatBuffer.writeUInt8(
    testFlatArray[Math.floor(idx / 4)][idx % 4],
    idx
  );
}

const expectedUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAO0lEQVR4AYXB0Q0A' +
  'EBBEwbdyHem/BDUtER9HhBkB5iEYzJ2AYJHZWEyFTK7IlaTwEWRW4xAsFlcCzEMHq+YKSPX/JJQAAAAASUVORK5CYII=';

test('from flat array of rgba quads', () => {
  const uri = convert(testFlatArray, 8, 8);

  expect(uri).toEqual(expectedUri);
});

test('from flattened buffer', () => {
  const uri = convert(testFlatBuffer, 8, 8);

  expect(uri).toEqual(expectedUri);
});

test('invalid input throws error', () => {
  expect(() => {
    convert(Buffer.from([1, 2, 3, 4, 5]), 8, 8);
  }).toThrow();
});
