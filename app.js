/*------------------------------- Starter Code -------------------------------*/
const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// Import the Todo model
const menu = require("./menu.js");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(
    process.env.MONGODB_URI.replace("<db_password>", process.env.PASSWORD)
  );
  console.log("Connected to MongoDB");
};

connect()
  .then(async () => {
    const getMenuItemFromUserChoice = (userChoice) => {
      for (let i = 0; i < menu.length; i++) {
        const menuItem = menu[i];
        // Check if input matches menu number or text (case insensitive)
        if (
          userChoice === (i + 1).toString() ||
          menuItem.option.toLowerCase().includes(userChoice.toLowerCase())
        ) {
          return menuItem;
        }
      }
    };
    const promptUser = async () => {
      console.log("\n\nHello, ADMIN. What would you like to do? \n");
      menu.forEach((menuOption, index) => {
        console.log(`${index + 1}. ${menuOption.option}`);
      });

      console.log("\n");
      let userChoice = prompt("Pick a choice: ");

      // Get the menu item based on the user's choice
      const menuItem = getMenuItemFromUserChoice(userChoice);

      // If the choice is invalid, prompt the user again
      if (!menuItem) {
        console.log("Invalid choice. Please select a valid option.");
        return promptUser(); // Recursively call promptUser if the choice is invalid
      }

      return menuItem;
    };

    while (true) { // always show the menu selection
      const menuItem = await promptUser();
      const menuAction = await menuItem.action();

      if (menuAction == "exit") { // if the user chooses the "exit option"
        console.log("Exiting the application.");
        await mongoose.connection.close();
        process.exit(0);
      }
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
