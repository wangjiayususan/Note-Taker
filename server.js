//Dependencies
const express=require('express');
const fs = require("fs");
const uuid = require("uuid");
const path=require('path');

//Set PORT
const PORT=process.env.PORT || 3001;

//Create Express server
const app=express();

//Parse incoming string
app.use(express.urlencoded({extended: true}));
//Parse incoming JSON
app.use(express.json());
app.use(express.static('public'));

//Start with index.html then notes.html
app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res)=> {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



//GET, POST API Endpoints
//Get request
app.get('/api/notes',(req, res)=> {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes=JSON.parse(data);
    res.json(notes);
})
});

//Post request
app.post("/api/notes",(req, res)=> {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
      if (err) throw err;
      const notes=JSON.parse(data);
      const newNote=req.body;
      newNote.id=uuid.v4();
      notes.push(newNote);

      // Write the db.json file again.
      const createNote=JSON.stringify(notes);
      fs.writeFile(path.join(__dirname, "./db/db.json"), createNote, (err) =>{
        if (err) {
        return console.log(err);
    }
    console.log("Note was saved.");
});

// Gives back the response, which is the user's new note. 
res.json(newNote)})
});


//Listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
