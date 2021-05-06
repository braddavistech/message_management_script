#!/usr/bin/env node

const Scan = require("../dynamo/scan");
const Put = require("../dynamo/put");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.warn("\nSetting message for all users...\n\n");

Scan("Messages").then((messages) => {
  console.warn("\nMessages\n");
  console.warn(messages);
  console.warn("\n");

  rl.question(
    "What is the ID of the message you want to update?  ",
    function (id) {
      const message = messages.find((message) => message.id === id);
      rl.question(
        `\nDo you want this message to display now? (y or n)  Currently: ${
          message.displayMessage === false ? "No" : "Yes"
        }  \n`,
        function (displayNow) {
          const displayMessage = displayNow.charAt(0).toLowerCase() === "y";
          rl.question(
            `What is the message text you want displayed?  Currently: ${message.message}  \n`,
            function (messageText) {
              rl.question(
                `Do you want to set a display date in the future? (y or n)  Currently: ${
                  message.nextDisplayDate !== undefined ||
                  message.nextDisplayDate === false
                    ? "No"
                    : "Yes"
                }  \n`,
                function (futureDisplay) {
                  if (futureDisplay.charAt(0).toLowerCase() === "y") {
                    rl.question(
                      `What date do you want the message to display? (MM/DD/YYYY)  Currently: ${
                        message.nextDisplayDate || "Currently no date listed"
                      }  \n`,
                      function (nextDisplayDate) {
                        rl.question(
                          `What type of message is this?  Currently: ${message.messageType}  \n`,
                          function (thisMessageType) {
                            const messageType = message.messageType !== "" || messageText.trim() !== "" ? thisMessageType.trim() : message.messageType
                            const newMessage = {
                              id: message.id,
                              displayMessage,
                              message:
                                messageText.trim() === ""
                                  ? messageText.trim()
                                  : message.message,
                              nextDisplayDate,
                              nextCheckDate: undefined,
                              lastEmailSent: undefined,
                              lastTextSent: undefined,
                              linkUrl: message.linkUrl,
                              messageType,
                            };
                            console.warn(
                              "\nYou are about to create the following message.\n"
                            );
                            console.warn({ newMessage });
                            rl.question(
                              "\n\nUpdate this message now? (y or n)  \n",
                              function (saveNow) {
                                if (saveNow.charAt(0).toLowerCase() === "y") {
                                  Put("Messages", newMessage).then((_) => {
                                    console.warn(
                                      "\nSuccessfully saved message!"
                                    );
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
                      `What type of message is this?  Currently: ${message.messageType}  \n`,
                      function (thisMessageType) {
                        const messageType = thisMessageType !== "" || thisMessageType.trim() !== "" ? thisMessageType.trim() : message.messageType
                        const newMessage = {
                          id: message.id,
                          displayMessage,
                          message:
                            messageText !== "" || messageText.trim() !== ""
                              ? messageText.trim()
                              : message.message,
                          nextDisplayDate: undefined,
                          nextCheckDate: undefined,
                          lastEmailSent: undefined,
                          lastTextSent: undefined,
                          linkUrl: message.linkUrl,
                          messageType,
                        };
                        console.warn(
                          "\nYou are about to create the following message.\n"
                        );
                        console.warn({ newMessage });
                        rl.question(
                          "\n\nCreate this message now? (y or n)  \n",
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
    }
  );
});

rl.on("close", function () {
  console.log("\nClosing setMessage...");
  process.exit(0);
});
