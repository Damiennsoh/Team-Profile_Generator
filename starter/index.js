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
const engineerQuestions = [
 {
    // name of engineer
    type: 'input',
    name: 'engineerName',
    message: 'What is the engineers name?',
  },
 {
    // Give input to engineer's ID
    type: 'input',
    name: 'engineerId',
    message: 'what is the engineers id?',
 },
 {
    // Inputs for engineer
    type: 'input',
    name: 'engineer email',
    message: 'What is the email of the engineer?',
    validate: function(answer){
        if(answer.length < 2) {
            return console.log("Email not valid, enter a valid one to proceed.");

        }
    }
 },
 {
    // Inputs for engineer's Github username
    type: 'input',
    name: 'github',
    message: 'What is github usename of engineer?',

 }

];
