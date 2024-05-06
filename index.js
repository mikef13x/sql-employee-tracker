const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: "mikef",
    database: "employee_db",
});

db.connect(() => {
    mainMenu();
});
function mainMenu() {


    inquirer
        .prompt([
            {
                type: 'list',
                message: 'what would you like to do?',
                name: 'intention',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            },
        ]).then(answer => {

            if (answer.intention === 'add a department') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'what is the name of the department?',
                            name: 'addDepartment'
                        }
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

            } else if (answer.intention === 'add a role') {
                inquirer
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
            } else if (answer.intention === 'add an employee') {
                inquirer
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
            } else if (answer.intention === 'update an employee role') {
                inquirer
                    .prompt([
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
            } else if(answer.intention === 'view all departments') {
                db.query('select * from department', (err, result)=> {
                    if(err) {
                        console.log('error getting department', err)
                    } else {
                        console.table(result)
                    }
                })
            }
        })
};
