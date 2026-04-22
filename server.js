// Import Express framework
const express = require("express");

// Create an app (your server)
const app = express();

// Middleware → allows server to read JSON data from requests
app.use(express.json());

// Temporary storage (array to store todos)
let todos = [];
let id = 1; // add this line
// =========================
// GET API → Fetch all todos
// =========================
app.get("/todos", (req, res) => {
    // Send the todos array as response
    res.json(todos);
});

// =========================
// POST API → Add a new todo
// =========================
app.post("/todos", (req, res) => {
    const text = req.body.text;

    // validation
    if (!text || text.trim() === "") {
        return res.status(400).json({ message: "Text is required" });
    }

    // const newTodo = {
    //     id: id,
    //     text: text
    // };
    const newTodo = {
    id: id,
    text: text,
    completed: false
};

    id++;

    todos.push(newTodo);
    res.json(newTodo);
});

// ======================================
// DELETE API → Delete todo using index
// ======================================
app.delete("/todos/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);

    // filter out the todo with matching id
    todos = todos.filter(todo => todo.id !== idToDelete);

    res.json({ message: "Deleted" });
});
app.put("/todos/:id", (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const text = req.body.text;

    if (!text || text.trim() === "") {
        return res.status(400).json({ message: "Text is required" }); 
    }

    const todo = todos.find(t => t.id === idToUpdate);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.text = text;

    res.json(todo);
});
app.patch("/todos/:id", (req, res) => {
    const idToUpdate = parseInt(req.params.id);

    const todo = todos.find(t => t.id === idToUpdate);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    // toggle completed
    todo.completed = !todo.completed;

    res.json(todo);
});
// =========================
// Start the server
// =========================
app.listen(3000, () => {
    console.log("Server running on port 3000");
});