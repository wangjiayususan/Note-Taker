//Dependencies
const fs=require("fs");
const uuid= require("uuid");
const path=require('path');


//GET, POST API Endpoints
//Get request
module.exports=function (app) {
app.get('/api/notes',(req, res)=> {
  res.sendFile(path.join(__dirname, "../db/db.json"))
});

//Post request
app.post("/api/notes",(req, res)=> {
  const notes=JSON.parse(fs.readFileSync('../db/db.json'));
  const newNote=req.body;
  newNote.id=uuid.v4();
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
  res.json(notes);
});
}
