const fs = require('fs');
const superagent = require('superagent');

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file!');
      resolve('File saved!');
    });
  });
};

const getDogPic = async () => {
  try {
    const labrador = superagent.get(
      `https://dog.ceo/api/breed/labrador/images/random`
    );

    const pug = superagent.get(`https://dog.ceo/api/breed/pug/images/random`);

    const pomeranian = superagent.get(
      `https://dog.ceo/api/breed/pomeranian/images/random`
    );

    const all = await Promise.all([labrador, pug, pomeranian]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePromise('dogs-imgs.txt', imgs.join('\n'));
    console.log('Dog image saved to file!');
  } catch (err) {
    console.error(err);
    throw err;
  }
  return 'End of getDogPic function';
};

(async () => {
  try {
    console.log('Will get dog picture!');
    const dogFunc = await getDogPic();
    console.log(dogFunc);
    console.log('Done getting dog picture!');
  } catch (err) {
    console.log('Error!!!');
  }
})();
