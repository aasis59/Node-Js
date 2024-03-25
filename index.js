import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
  

mongoose.connect('mongodb://localhost:27017', {
  dbName:"backend",
}).then(() => console.log("Mongodb connected")).catch(err=>console.log(err));

const messageSchema = new mongoose.Schema({
  name:String,
  email: String,
});

const Message = mongoose.model('Message',messageSchema);

const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/add', async (req, res) => {
  console.log("Adding a new message...");
  await Message.create({
    name: "asis",
    email: "aasis@gmail.com"
  })
  .then(() => {
    console.log("Message added successfully.");
    res.send('nice');
  })
  .catch((error) => {
    console.error("Error while adding message:", error);
    res.status(400).send(error);
  });
});
app.get('/success', (req, res) => {
  res.render('success');
});
app.get("/addUser", async (req, res) => {
  try {
    const users = await Message.find(); 
    res.json(users); 
  } catch (error) {
    console.error("Error while fetching users from MongoDB:", error);
    res.status(500).send("Error while fetching users. Please try again later.");
  }
});
app.post('/login',(req,res)=>{
  req.cookies

})

app.post('/contact', async (req, res) => {
  const {name,email}= req.body;
  try {
    console.log("Received contact form data:", req.body);
    await Message.create({ name, email });
    res.redirect('/success');
  } catch (error) {
    console.error("Error while inserting data into MongoDB:", error);
    res.status(500).send("Error while saving data. Please try again later.");
  }
});
app.get('/contact', (req,res)=>{
  res.render('index')
});



app.listen(3000, () => {
  console.log('Server is ready');
}); 
