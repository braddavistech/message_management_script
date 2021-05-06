#!/usr/bin/env node
const Delete = require("../dynamo/delete");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.warn("\nDelete message for all users...\n\n")

rl.question(
  "What is the id of the message you want to delete?  ",
  function (messageId) {
    rl.question(
      "Are you sure you want to delete this message? (y or n)  ",
      (deleteNow) => {
        if (deleteNow.charAt(0).toLowerCase() === "y") {
          Delete(messageId).then((_) => {
            console.warn("\nSuccessfully deleted message!");
            rl.close();
          });
        } else rl.close();
      }
    );
  }
);

rl.on("close", function () {
  console.log("\nClosing deleteMessage...");
  process.exit(0);
});
