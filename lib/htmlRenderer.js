const path = require("path");
const fs = require("fs");

// Writes the absolute path of templates to templatesDir. Not sure why relative isn't adequate. Some kind of handling in case the pathing is different per client?
const templatesDir = path.resolve(__dirname, "../templates");

// Defines the 'render' function. Given the 'employees' array containing all employee objects, creates an empty html array. For every item with the role "Manager" in the employees array, return render manager html template given 'manager'. Repeat for Engineer and Intern. Returns the result of renderMain given the joined html array string.

const render = employees => {
    const html = [];

    html.push(employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
    );
    html.push(employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderEngineer(engineer))
    );
    html.push(employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderIntern(intern))
    );

    return renderMain(html.join(""));

};

// Given the 'manager' variable, let 'template' equal the contents "manager.html". Modify the html string in 'template' to equal the results of the replacePlaceholders function given the passed parameters. Parameters are the "manager.html" (string to be modified), a string describing the what is to be found and replaced in the "manager.html" string, and a function specific to the trait given the 'manager' variable. The template string will get injected with information returned by the 'get****' functions given the manager variable at the specified "****" location.

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
};

// Same for the following two functions as above.

const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};

const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};

//renderMain is called at the end of the render function, and is passed the completed HTML string of the joined team member html section. It then saves the contents of the "main.html" file to a template string. It takes the team 'html' variable containing the html information and injects it into the template string containing the "main.html" content at location "team".

const renderMain = html => {
    const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
};

//replacePlaceholders looks through a given string for a given value 'placeholder' which is converted into a pattern that is searched for. This pattern is replaced with the 'value' element. This could be a simple value string or an html string.

const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
};

// This file defines the render function which encompasses all the other functions in the document. It uses the 'manager', 'engineer', and 'intern' objects from the passed in employees array. Each of these objects defines their own version of the "get****" functions which are used to replace the placeholders in the html templates. It then returns the modified html string with all of the correct information appended and assembled into a string.
module.exports = render;
