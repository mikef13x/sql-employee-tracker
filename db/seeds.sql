USE employee_db;

INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Engineering")
INSERT INTO department (name)
VALUES ("Science")
INSERT INTO department (name)
VALUES ("Mathematics");

Insert INTO role (title, salary, department_id)
VALUES ("Management Officer", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Chief Engineer", 200000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Head of Science", 175000, 3);
INSERT INTO role  (title, salary, department_id)
VALUES ("Mathematics Professor", 145000, 4);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jack", "Johnson", 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mike", "Johns", 2);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Yuki", "Adams", 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kiba", "Smith", 4);