const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employees = [];

//Now building the team to render on HTML
console.log("Begin building your team");

// Array of questions with respect to the teams.
// starting with Team manager
const teamManagerQuestions = [
    {
        type: 'input',
        name: 'teamManagerName',
        message: 'Name of manager',
    },
    // Manager's ID
    {
        type: 'input',
        name: 'teamManagerId',
        message: 'what is the manager id?',
    },
    {
        // Inputs for manager's email
        type: 'input',
        name: 'teamManagerEmail',
        message: 'What is the team managers email?',
        validate: function(answer){
            if (answer.length < 1){
                return console.log("email is invalid please type again")

            }
            return true;
        }  
    },
    {
        // manager's phone number
        type: 'input',
        name: 'managerPhoneNumber',
        message: "What is the team manager's office number?",
        validate: function(answer){
            if (answer.length < 10){
                return console.log("email is invalid please type again")

            }
            return true;
        }  
    },
    
];

// Questions to find out if more members are to be add to the team or to build what has been gathered so far.
const moreQuestions = {
    type: 'list',
    name: 'addMembers',
    message: 'Are there more members to be added to the team?',
    choices: [
        "Add an employee?",
        "Add an engineer?",
        "Add an intern?",
        "Build and render team to HTML?",
    ]
};

//Assuming adding an engineer as a team member is chosen as a choice
// Array of questions for engineer
const engineerQuestions =[
    {
        //Inputs for engineer's name
        type: 'input',
        name: 'engineer',
        message: 'What is the nanme of the engineer?',
    },
    {
        //Taking inputs for engineer's ID
        type: 'input',
        name: 'engineerId',
        message: 'What is the engineers Id?',
    },
    {
        //Taking inputs for enginner's email
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the email of the engineer?',
        validate: function(answer){
            if(answer.length < 1){
                return console.log("kindly provida a valid email address to prooceed");

            }
            return true;
        }
    },
    {
        // Engineer's Github username
        type: 'input',
        name: 'github',
        message: 'What is the engineer github username?',
    },
];

// Array of questions for intern
const internQuestions = [
    {
        // Enter intern's name
        type: 'input',
        name: 'internName',
        message: 'What is the name of the intern?',
    },
    {
        // Input for intern's ID
        type: 'input',
        name: 'internID',
        message: 'What is the ID of the intern?',
    },
    {
        // Input for intern's email address
        type: 'input',
        name: 'internEmail',
        message: 'What is the email address of the intern?',
    },
    {
        // Input for intern's school
        type: 'input',
        name: 'school',
        message: 'What is the name of interns school?',
    }
];

// Creating a function to link array of questions from teamManager to manager.js file
function getManagerInfo() {
    inquirer.prompt(teamManagerQuestions).then((responseManager) => {
        console.log(responseManager);
        employees.push(new Manager(
            responseManager.teamManagerName,
            responseManager.teamManagerId,
            responseManager.teamManagerEmail,
            responseManager.officeNumber
        ));
        addEmployees()
    })
}
// Function to call more question to determine whether more team members are to be added or building the team is the choice to be made.
function addEmployees() {
    return inquirer.prompt(moreQuestions).then((response) => {
        console.log(response);

        if (response.menu === "Add an engineer?") {
            getEngineerInfo()
        }
        else if (response.menu === "Add an intern?") {
            getInternInfo()
        }
        else{
            console.log('Complete!')
            fs.writeFile(outputPath,render(employees),(err) => err ? console.log("err") : console.log("Success"))
        }
    })
}

// Function to pass engineer response array to Engineer.js 

function getEngineerInfo() {
    inquirer.prompt(engineersQuestions).then((responseEngineer) => {
        console.log(responseEngineer);
        employees.push(new Engineer(
            responseEngineer.engineerName,
            responseEngineer.engineerId,
            responseEngineer.engineerEmail,
            responseEngineer.github
        ));
        addEmployees()
    })
}

// Function to pass intern response array to Engineer.js

function getInternInfo() {
    inquirer.prompt(internQuestions).then((responseIntern) => {
        console.log(responseIntern);
        employees.push(new Intern(
            responseIntern.internName,
            responseIntern.internId,
            responseIntern.internEmail,
            responseIntern.school
        ));
        addEmployees()
    })
}

getManagerInfo()
Footer
