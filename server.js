

/**
  Generate a dummy data in this format in a collection called employees in a db called company
 {
    name:"Harry",
    salary: 4500000,
    language: "Python",
    city: "New York",
    isManager: true
 }

Generate 10 such records when a button called generate data is clicked!

create an express app with to achieve it.
Everytime the button is clicked, you should clear the collection.



 */

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

// --- 1. Connect to MongoDB via Mongoose ---
mongoose.connect("mongodb://localhost:27017/company")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));

// --- 2. Define the Schema ---
const employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  language: String,
  city: String,
  isManager: Boolean,
});

// --- 3. Create the Model ---
// Mongoose will use the collection "employees" (auto-pluralizes "Employee")
const Employee = mongoose.model("Employee", employeeSchema);

// --- 4. Helper: Generate one random employee ---
function generateEmployee() {
  const names     = ["Harry", "Hermione", "Ron", "Draco", "Luna", "Neville", "Ginny", "Dumbledore", "Snape", "McGonagall"];
  const languages = ["Python", "JavaScript", "Java", "Go", "Rust", "TypeScript", "C++", "Ruby"];
  const cities    = ["New York", "London", "Tokyo", "Berlin", "Mumbai", "Toronto", "Sydney", "Paris"];

  return {
    name:      names[Math.floor(Math.random() * names.length)],
    salary:    Math.floor(Math.random() * 9000000) + 1000000,
    language:  languages[Math.floor(Math.random() * languages.length)],
    city:      cities[Math.floor(Math.random() * cities.length)],
    isManager: Math.random() > 0.5,
  };
}

// --- 5. Route: POST /generate ---
app.post("/generate", async (req, res) => {
  try {
    // Clear the collection
    await Employee.deleteMany({});

    // Generate 10 employees
    const employees = Array.from({ length: 10 }, generateEmployee);

    // Insert them all at once
    const inserted = await Employee.insertMany(employees);

    res.json({ success: true, employees: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});