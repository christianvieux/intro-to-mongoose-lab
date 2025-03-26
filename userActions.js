const prompt = require('prompt-sync')();
const customers = require('./models/customers.js');


// Neatly display customers
function displayCustomerDetails(customer) {
    const displayableFields = Object.entries(customer.toObject())
        .filter(([key]) => !['__v', '_id'].includes(key)); // This basically filters out for these characters; in programing anything with a _ is supposed to be hidden.

    return [
        `id: ${customer._id}`,
        ...displayableFields.map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    ].join(', ');
}


// Make sure the user's prompts are good before continuing. if not, repeat :P
function validateInput(promptMessage, validator) {
    while (true) {
        const input = prompt(promptMessage);
        if (validator(input)) {
            return input;
        }
        console.log("Invalid input. Please try again.");
    }
}

// menu selection
function getMenuChoice(choices) {
    console.log("\nPlease select an option:");
    choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
    });

    while (true) {
        console.log("\n")
        const input = prompt("Enter your choice: ").trim().toLowerCase();
        
        // Check if input is a number
        const numChoice = parseInt(input);
        if (!isNaN(numChoice) && numChoice > 0 && numChoice <= choices.length) {
            return choices[numChoice - 1];
        }

        // Check if input matches a choice text
        const textChoice = choices.find(choice => 
            choice.toLowerCase() === input
        );
        
        if (textChoice) {
            return textChoice;
        }

        console.log("Invalid choice. Please try again.");
    }
}

// validations rules to check if values are good/valid.
const validators = {
    name: (input) => input.trim().length > 0,
    age: (input) => {
        const age = parseInt(input);
        return !isNaN(age) && age > 0 && age < 150;
    },
    id: async (input) => {
        try {
            const customer = await customers.findById(input);
            return !!customer;
        } catch {
            return false;
        }
    }
};

module.exports = {
    createCustomer: async function() {
        try {
            const name = validateInput(
                "What is the customer's NAME? ", 
                validators.name
            );

            const age = validateInput(
                "What is the customer's AGE? ", 
                validators.age
            );

            const result = await customers.create({ name, age });
            console.log("Customer created!\n", displayCustomerDetails(result));
        } catch (error) {
            console.error("Error creating customer:", error.message);
        }
    },

    viewCustomers: async function() {
        try {
            const customersFound = await customers.find({});
            
            if (customersFound.length === 0) {
                console.log("No customers found.");
                return;
            }

            console.log("\nHere's a list of all the customers:\n");
            customersFound.forEach((customer, index) => {
                const customerDetails = displayCustomerDetails(customer);
                console.log(`${index + 1}. ${customerDetails}`);
            });
            
            console.log(`\n${customersFound.length} Customer(s) found!`);
            
        } catch (error) {
            console.error("Error viewing customers:", error.message);
        }
    },

    updateCustomer: async function() {
        try {
            const customerId = await validateInput(
                "Please enter the customer's ID: ", 
                validators.id
            );

            const customerFound = await customers.findById(customerId);
            console.log("\nCustomer found: \n");
            console.log(displayCustomerDetails(customerFound)); 

            const updateableFields = Object.keys(customerFound.toObject())
                .filter(key => key !== "_id" && key !== "__v");

            const fieldToUpdate = getMenuChoice(updateableFields);
            
            const newValue = validateInput(
                `Enter new value for ${fieldToUpdate}: `, 
                validators[fieldToUpdate] || (() => true)
            );

            const updatedCustomer = await customers.findByIdAndUpdate(
                customerId,
                { [fieldToUpdate]: newValue },
                { new: true }
            );

            console.log(`Customer updated!\n`, displayCustomerDetails(updatedCustomer));
        } catch (error) {
            console.error("Error updating customer:", error.message);
        }
    },

    deleteCustomer: async function() {
        try {
            const customerId = await validateInput(
                "Please enter the customer's ID to delete: ", 
                validators.id
            );

            const customerFound = await customers.findById(customerId);
            console.log("Customer found: \n");
            console.log(displayCustomerDetails(customerFound));

            
            console.log("\nAre you sure you want to delete this customer?\n");
            const confirmation = getMenuChoice(['Yes', 'No']);

            if (confirmation === 'Yes') {
                const deletedCustomer = await customers.findByIdAndDelete(customerId);
                console.log("Customer deleted successfully!\n", displayCustomerDetails(deletedCustomer));
            } else {
                console.log("Deletion cancelled.");
            }
        } catch (error) {
            console.error("Error deleting customer:", error.message);
        }
    },

    quit: async function() {
        console.log("Exiting the application.");
        process.exit(0);
    },
}

// TODO: If i revisit this again: 1. add some better error validations. 2. Remove redundancies.