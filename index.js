// adding inquirer for the prompts
const inquirer = require('inquirer');
//adding mysql for the database
const mysql = require('mysql2');
//creating database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: "mikef",
    database: "employee_db",
});
//main menu function starts the inquirer function
db.connect(() => {
    mainMenu();
});
// main function that runs the prompts
function mainMenu() {


    inquirer
        .prompt([
            {
                // the first question which dictates what the user is trying to do
                type: 'list',
                message: 'what would you like to do?',
                name: 'intention',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            },
        ]).then(answer => {
            // the following code will help the user add a department into the database
            if (answer.intention === 'add a department') {
                inquirer
                // asking the name of the department
                    .prompt([
                        {
                            type: 'input',
                            message: 'what is the name of the department?',
                            name: 'addDepartment'
                        }
                        //the following code is taking the given answer and inserting it into the database
                    ]).then((answer) => {
                        db.query("INSERT INTO department SET ?", {
                            department_name: answer.addDepartment
                        }, (err, results) => {
                            if (err) {
                                console.log("there was an error adding department name:", err);
                            } else {
                                console.log("success adding department");
                            }
                            mainMenu();
                        });
                    });
                    // functionality for adding a role
            } else if (answer.intention === 'add a role') {
                inquirer
                // asking the user questions about the new role
                    .prompt([
                        {
                            type: 'input',
                            message: 'what role would you like to add',
                            name: 'roleName'

                        },
                        {
                            type: 'input',
                            message: 'what is the salary for this role',
                            name: 'roleSalary'
                        },
                        {
                            type: 'input',
                            message: 'what department id will this role belong to',
                            name: 'roleDepartment'
                        }]).then((answer) => {
                            // taking the data given by the user and inserting it into the database
                            db.query("INSERT INTO role SET ?", {
                                title: answer.roleName,
                                salary: answer.roleSalary,
                                department_id: answer.roleDepartment
                            }, (err, results) => {
                                if (err) {
                                    console.log("there was an error adding role", err);
                                } else {
                                    console.log("success adding role");
                                }
                                mainMenu();
                            });
                        })
                        // the code for adding a new employee
            } else if (answer.intention === 'add an employee') {
                inquirer
                // the questions the user must answer
                    .prompt([
                        {
                            type: 'input',
                            message: "what is the employee's first name",
                            name: 'employeeFirstName'
                        },
                        {
                            type: 'input',
                            message: "what is the employee's last name",
                            name: 'employeeLastName'
                        },
                        {
                            type: 'input',
                            message: "what is the employee's role id",
                            name: 'employeeRole'
                        },
                        {
                            type: 'input',
                            message: "what is the employee's manager id",
                            name: 'employeeManager'
                        }
                    ]).then((answer) => {
                        // the code taking the given data and inserting it into the database
                        db.query("INSERT INTO employee SET ?", {
                            first_name: answer.employeeFirstName,
                            last_name: answer.employeeLastName,
                            role_id: answer.employeeRole,
                            manager_id: answer.employeeManager
                        }, (err, results) => {
                            if (err) {
                                console.log("there was an error adding employee", err);
                            } else {
                                console.log("success adding employee");
                            }
                            mainMenu();
                        });
                    });
                    // how to update employee role
            } else if (answer.intention === 'update an employee role') {
                inquirer
                    .prompt([
                        // asking the user questions about the update
                        {
                            type: 'input',
                            message: 'which employee would you like to update',
                            name: 'updateEmployee',
                        },
                        {
                            type: 'input',
                            message: "what is the employee's new role",
                            name: 'updateRole'
                        },

                    ]).then((answer) => {
                        // the code taking the data and updating the database with the new information
                        db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                            answer.updateRole,
                            answer.updateEmployee,
                        ], (err, results) => {
                            if (err) {
                                console.log('error updating employee', err);
                            } else {
                                console.log('successful employee update');
                            }
                            mainMenu();
                        });
                    });
                    // the code for viewing all departments
            } else if (answer.intention === 'view all departments') {
                db.query('select * from department', (err, result) => {
                    if (err) {
                        console.log('error getting department', err)
                    } else {
                        console.table(result)
                    }
                    mainMenu();
                })
                // the code for viewing all roles
            } else if (answer.intention === 'view all roles') {
                db.query('select * from role', (err, result) => {
                    if (err) {
                        console.log('error getting role', err)
                    } else {
                        console.table(result)
                    }
                    mainMenu()
                })
                // the code for viewing all employees
            } else if(answer.intention === 'view all employees') {
                db.query('select * from employee', (err, result)=> {
                    if(err) {
                        console.log('error getting employees', err)
                    } else {
                        console.table(result)
                    }
                    mainMenu()
                })
            }
        })

};
