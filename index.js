const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

inquirer
    .prompt([
        {
            type: 'list',
            message: 'what would you like to do?',
            name: 'intention',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']

        },


    ])
if (answer.choices === 'add a department') {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'what is the name of the department?',
                name: 'addDepartment'
            }
        ])
} else if (answer.choices === 'add a role') {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'what role would you like to add',
                name: 'addRole'

            }
        ])
} else if (answer.choices === 'add an employee') {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "what is the employee's name",
                name: 'addEmployee'
            }
        ])
}
