require('dotenv').config();

import app from './app';

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log();
  console.log(`Listening por ${PORT}`);
  console.log(`CTRL + Clique http://localhost:${PORT}`);
});
