const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const users = [];
app.post("/api/register", (req, res) => {
    const { username, password, typingSpeed } = req.body;
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: "Username already exists" });
    }
    const newUser = { username, password, typingSpeed };
    users.concat(newUser);
    res.json({ message: "Account successfully made", user: newUser });
});
app.get("/api/users", (req, res) => {
    res.json({ "users": ["George", "Allison", "Jacob", "Backend Demon", "Radhika"] });
});
  
app.listen(4000, () => {
    console.log(`Server started on port 4000`);
});
