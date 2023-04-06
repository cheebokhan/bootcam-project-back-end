const express = require('express');
const app = express();

//Passing body data
app.use(express.json());


//Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is up and runing ${PORT}`);
});