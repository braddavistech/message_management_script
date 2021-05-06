#!/usr/bin/env node
const Put = require("../dynamo/put");
const uniqid = require("uniqid");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.warn("\nCreating message for all users...\n\n")

rl.question(
  "Do you want this message to display now? (y or n)  ",
  function (displayNow) {
    const displayMessage = displayNow.charAt(0).toLowerCase() === "y";
    rl.question(
      "What is the message text you want displayed?  ",
      function (messageText) {
        rl.question(
          "Do you want to set a display date in the future? (y or n)  ",
          function (futureDisplay) {
            if (futureDisplay.charAt(0).toLowerCase() === "y") {
              rl.question(
                "What date do you want the message to display? (MM/DD/YYYY)  ",
                function (nextDisplayDate) {
                  rl.question(
                    "What type of message is this?  ",
                    function (messageType) {
                      const newMessage = {
                        id: uniqid(),
                        displayMessage,
                        message: messageText.trim(),
                        nextDisplayDate,
                        nextCheckDate: undefined,
                        lastEmailSent: undefined,
                        lastTextSent: undefined,
                        messageType,
                      };
                      console.warn(
                        "\nYou are about to create the following message.\n"
                      );
                      console.warn({ newMessage });
                      rl.question(
                        "\n\nCreate this message now? (y or n)  ",
                        function (saveNow) {
                          if (saveNow.charAt(0).toLowerCase() === "y") {
                            Put("Messages", newMessage).then((_) => {
                              console.warn("\nSuccessfully saved message!");
                              rl.close();
                            });
                          } else rl.close();
                        }
                      );
                    }
                  );
                }
              );
            } else {
              rl.question(
                "What type of message is this?  ",
                function (messageType) {
                  const newMessage = {
                    id: uniqid(),
                    displayMessage,
                    message: messageText.trim(),
                    nextDisplayDate: undefined,
                    nextCheckDate: undefined,
                    lastEmailSent: undefined,
                    lastTextSent: undefined,
                    messageType,
                  };
                  console.warn(
                    "\nYou are about to create the following message.\n"
                  );
                  console.warn({ newMessage });
                  rl.question(
                    "\n\nCreate this message now? (y or n)  ",
                    function (saveNow) {
                      if (saveNow.charAt(0).toLowerCase() === "y") {
                        Put("Messages", newMessage).then((_) => {
                          console.warn("\nSuccessfully saved message!");
                          rl.close();
                        });
                      } else rl.close();
                    }
                  );
                }
              );
            }
          }
        );
      }
    );
  }
);

rl.on("close", function () {
  console.log("\nClosing createMessage...");
  process.exit(0);
});
