import express from "express";
const cors = require('cors') ;

app.use(cors());


const app = express();
app.use(express.json());

const users = [
  { att: '80', uid: 108243, total_sub: 14, bonus: '20', name: 'Dax' },
  { att: '92', uid: 108244, total_sub: 16, bonus: '25', name: 'Aaryan' },
  { att: '75', uid: 108245, total_sub: 12, bonus: '15', name: 'Prateek' },
  { att: '88', uid: 108246, total_sub: 15, bonus: '22', name: 'Rohan' }
];

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// get user by id
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// add new user
app.post("/user", (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

// update user
app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = req.body;

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
