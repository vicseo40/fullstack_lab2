const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://victorseong:aFoVbEGKllgllPKO@company.ds8oeh4.mongodb.net/?retryWrites=true&w=majority&appName=company",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true },
  full_name: String,
  email: String,
  hashed_password: String,
});

const projectSchema = new mongoose.Schema({
  project_code: { type: String, unique: true },
  project_name: String,
  project_description: String,
});

const projectAssignmentSchema = new mongoose.Schema({
  employee_id: String,
  project_code: String,
  start_date: Date,
});

const Employee = mongoose.model("Employee", employeeSchema);
const Project = mongoose.model("Project", projectSchema);
const ProjectAssignment = mongoose.model("ProjectAssignment", projectAssignmentSchema);

async function populateDatabase() {
  const employeeCount = await Employee.countDocuments();
  const projectCount = await Project.countDocuments();
  const assignmentCount = await ProjectAssignment.countDocuments();

  if (employeeCount === 0 && projectCount === 0 && assignmentCount === 0) {
    const employees = [
      { employee_id: "E1", full_name: "John Doe", email: "john@example.com", hashed_password: "pass123" },
      { employee_id: "E2", full_name: "Jane Smith", email: "jane@example.com", hashed_password: "pass123" },
      { employee_id: "E3", full_name: "Jim Beam", email: "jim@example.com", hashed_password: "pass123" },
      { employee_id: "E4", full_name: "Jack Daniels", email: "jack@example.com", hashed_password: "pass123" },
      { employee_id: "E5", full_name: "Johnny Walker", email: "johnny@example.com", hashed_password: "pass123" },
    ];

    const projects = [
      { project_code: "P1", project_name: "Project Alpha", project_description: "Alpha description" },
      { project_code: "P2", project_name: "Project Beta", project_description: "Beta description" },
      { project_code: "P3", project_name: "Project Gamma", project_description: "Gamma description" },
      { project_code: "P4", project_name: "Project Delta", project_description: "Delta description" },
      { project_code: "P5", project_name: "Project Epsilon", project_description: "Epsilon description" },
    ];

    const assignments = [
      { employee_id: "E1", project_code: "P1", start_date: new Date("2023-01-01") },
      { employee_id: "E2", project_code: "P2", start_date: new Date("2023-02-01") },
      { employee_id: "E3", project_code: "P3", start_date: new Date("2023-03-01") },
      { employee_id: "E4", project_code: "P4", start_date: new Date("2023-04-01") },
      { employee_id: "E5", project_code: "P5", start_date: new Date("2023-05-01") },
    ];

    await Employee.insertMany(employees);
    await Project.insertMany(projects);
    await ProjectAssignment.insertMany(assignments);

    console.log("Database populated with initial data");
  }
}

module.exports = {
  Employee,
  Project,
  ProjectAssignment,
  populateDatabase,
};
