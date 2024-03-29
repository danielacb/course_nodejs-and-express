const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(app.get('env'));
// console.log(process.env);

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 App running on port ${port}...`);
});
