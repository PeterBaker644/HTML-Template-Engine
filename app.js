const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);
const render = require("./lib/htmlRenderer");

const employees = [];
const ids = [];
const choicesQuery = [
    {
        type: "list",
        message: "What would you like to do next?",
        name: "choice",
        choices: [
            {
                name: "Assign an engineer to the team",
                value: "addEngineer",
                short: "Assign Engineer"
            },
            {
                name: "Assign an intern to the team",
                value: "addIntern",
                short: "Assign Intern"
            },
            {
                name: "Complete team member entry and generate HTML page",
                value: "finish",
                short: "Generate HTML"
            },
            {
                name: "Exit application without generating page",
                value: "abort",
                short: "Exit Application"
            }
        ]
    }
];
const managerQuery = [
    {
        type: "input",
        message: "Enter the full name of your new team manager",
        name: "name"
    },
    {
        type: "input",
        message: "Enter the id of your team manager",
        name: "id",
        validate: (input) => (!Number(input) || ids.includes(Number(input))) ? "You must provide a new and valid id number" : true
    },
    {
        type: "input",
        message: "Enter the team manager's email address",
        name: "email",
        //If I were to add regex validation: ^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$ ultimately I decided not to. 
        validate: (input) => (!input) ? "You must provide a valid email address" : true
    },
    {
        type: "input",
        message: "Enter the office number of your team manager",
        name: "officeNumber",
        validate: (input) => !Number(input) ? "You must provide a valid office number" : true
    }
];
const engineerQuery = [
    {
        type: "input",
        message: "Enter the full name of your new engineer",
        name: "name"
    },
    {
        type: "input",
        message: "Enter the id of the new employee",
        name: "id",
        validate: (input) => (!Number(input) || ids.includes(Number(input))) ? "You must provide a new and valid id number." : true

    },
    {
        type: "input",
        message: "Enter the employee's email address",
        name: "email",
        validate: (input) => (!input) ? "You must provide a valid email address" : true
    },
    {
        type: "input",
        message: "Enter the new engineer's github username",
        name: "github",
        validate: (input) => (!input) ? "You must provide a github username" : true
    }
];
const internQuery = [
    {
        type: "input",
        message: "Enter the full name of your new intern",
        name: "name"
    },
    {
        type: "input",
        message: "Enter the id of the new employee",
        name: "id",
        validate: (input) => (!Number(input) || ids.includes(Number(input))) ? "You must provide a new and valid id number" : true
    },
    {
        type: "input",
        message: "Enter the employee's email address",
        name: "email",
        validate: (input) => (!input) ? "You must provide a valid email address" : true
    },
    {
        type: "input",
        message: "What school will/did the new intern graduate from?",
        name: "school",
        validate: (input) => (!input) ? "You must provide a school" : true
    }
];

function userPrompt(prompt) {return inquirer.prompt(prompt);}

async function generateTeam() {
    try {
        console.log(
            `\nWelcome to the automated html staff contact page generator! 
Please enter staff information as accurately as possible - all fields are required. 
The HTML file is created in the output folder.\n`
        );
        let manager = await userPrompt(managerQuery);
        ids.push(Number(manager.id));
        employees.push(new Manager(...Object.values(manager)));
        console.log("");
        for (employee of employees) {
            let { choice } = await userPrompt(choicesQuery);
            console.log("");
            switch (choice) {
                case "addEngineer":
                    let engineer = await userPrompt(engineerQuery);
                    ids.push(Number(engineer.id));
                    employees.push(new Engineer(...Object.values(engineer)));
                    console.log("");
                    break;
                case "addIntern":
                    let intern = await userPrompt(internQuery);
                    ids.push(Number(intern.id));
                    employees.push(new Intern(...Object.values(intern)));
                    console.log("");
                    break;
                case "finish":
                    console.log("Employee entry successfully completed.");
                    break;
                case "abort":
                    console.log("Application terminated by the user.");
                    return;
            } 
        }
        employees.sort((a, b) => a.id - b.id);
        const htmlString = render(employees);
        await writeFileAsync(outputPath, htmlString);
        console.log(`\nYour document, team.html has been successfully generated!`)
    } catch(err) {
        console.log(err);
    }
}

generateTeam();