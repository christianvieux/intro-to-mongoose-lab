const userActions = require("./userActions");

module.exports = [
    {
        option: "Create a customer",
        action: userActions.createCustomer,
    },
    {
        option: "View all customers",
        action: userActions.viewCustomers,
    },
    {
        option: "Update a customer",
        action: userActions.updateCustomer,
    },
    {
        option: "Delete a customer",
        action: userActions.deleteCustomer,
    },
    {
        option: "quit",
        action: userActions.quit,
    },
]