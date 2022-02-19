//Dependencies
const express=require('express');

//Set PORT
const PORT=process.env.PORT || 3000;

//Create Express server
const app=express();

//Parse incoming string
app.use(express.urlencoded({extended: true}));
//Parse incoming JSON
app.use(express.json());
app.use(express.static(__dirname + '/public'));

require('./routes/api')(app);
require('./routes/view')(app);

//Listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
