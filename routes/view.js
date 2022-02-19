//Dependencies
const path=require('path');

//Start with index.html 
module.exports=function (app) {
    //Then notes.html

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


}