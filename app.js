const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Maybe something like this? Or do we just check through objects?
// const employeeIds = [];
const employees = [];

const choicesQuery = [
    {
        type: "list",
        message: "What would you like to do next?",
        name: "choice",
        choices: [
            {
                name: "Assign an engineer to the team",
                value: "addEngineer",
                short: "Assign Engineer",
            },
            {
                name: "Assign an intern to the team",
                value: "addIntern",
                short: "Assign Intern",
            },
            {
                name: "Complete team member entry and generate HTML page",
                value: "finish",
                short: "Generate HTML",
            },
            {
                name: "Exit application without generating page.  ",
                value: "abort",
                short: "Exit Application",
            },
        ]
    }
];

const managerQuery = [
    {
        type: "input",
        message: "Enter the full name of your new team manager",
        name: "name"
        // regex validation?
    },
    {
        type: "input",
        message: "Enter the id of your team manager",
        name: "id",
        validate: (input) => !Number(input) ? "You must provide a valid id number." : true
        // Validate for existing id numbers. Can use string or use the employees object array.
    },
    {
        type: "input",
        message: "Enter the team manager's email address.",
        name: "email",
        //Add regex validation.
        validate: (input) => (!input) ? "You must provide a valid email address." : true
    },
    {
        type: "input",
        message: "Enter the office number of your team manager",
        name: "officeNumber",
        validate: (input) => !Number(input) ? "You must provide a valid office number." : true
    }
];

const engineerQuery = [
    {
        type: "input",
        message: "Enter the full name of your new engineer",
        name: "name"
        // regex validation?
    },
    {
        type: "input",
        message: "Enter the id of the new employee.",
        name: "id",
        validate: (input) => {
            !Number(input) ? "You must provide a valid id number." : true;
        }
        // Validate for existing id numbers. Can use string or use the employees object array.
    },
    {
        type: "input",
        message: "Enter the employee's email address.",
        name: "email",
        //Add regex validation.
        validate: (input) => (!input) ? "You must provide a valid email address." : true
    },
    {
        type: "input",
        message: "Enter the new engineer's github username.",
        name: "github",
        validate: (input) => (!input) ? "You must provide a github username." : true
    }
];

const internQuery = [
    {
        type: "input",
        message: "Enter the full name of your new intern",
        name: "name"
        // regex validation?
    },
    {
        type: "input",
        message: "Enter the id of the new employee.",
        name: "id",
        validate: (input) => {
            !Number(input) ? "You must provide a valid id number." : true;
        }
        // Validate for existing id numbers. Can use string or use the employees object array.
    },
    {
        type: "input",
        message: "Enter the employee's email address.",
        name: "email",
        //Add regex validation.
        validate: (input) => (!input) ? "You must provide a valid email address." : true
    },
    {
        type: "input",
        message: "What school will/did the new intern graduate from?",
        name: "school",
        validate: (input) => (!input) ? "You must provide a school." : true
    }
];

function userPrompt(prompt) {return inquirer.prompt(prompt);}

async function generateTeamPrompt() {
    try {
        console.log("This is a welcome statement");
        const manager = await userPrompt(managerQuery)
        employees.push(new Manager(...Object.values(manager)));
        console.log(employees[0].getName())
    } catch(err) {
        console.log(err);
    }
}

generateTeamPrompt();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```





//Use the Inquirer npm package to prompt the user for their email, id, and specific information based on their role with the company. For instance, an intern may provide their school, whereas an engineer may provide their GitHub username.
//Your app will run as a Node CLI to gather information about each employee.