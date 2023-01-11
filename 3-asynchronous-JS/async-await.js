const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found!');
      resolve(data);
    });
  });
};

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
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise('dog-img.txt', res.body.message);
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
