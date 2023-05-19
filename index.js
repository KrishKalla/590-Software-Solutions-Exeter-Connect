const readline = require('readline-sync');

const settings = require('./graphSettings');
const graphHelper = require('./graphHelper');

async function main() {
  console.log('JavaScript Graph Tutorial');

  let choice = 0;

  // Initialize Graph
  initializeGraph(settings);

  // Greet the user by name
  await greetUserAsync();

  const choices = [
    'Display access token',
    'List my inbox',
    'Send mail',
    'Make a Graph call'
  ];

  while (choice != -1) {
    choice = readline.keyInSelect(choices, 'Select an option', { cancel: 'Exit' });

    switch (choice) {
      case -1:
        // Exit
        console.log('Goodbye...');
        break;
      case 0:
        // Display access token
        await displayAccessTokenAsync();
        break;
      case 1:
        // List emails from user's inbox
        await listInboxAsync();
        break;
      case 2:
        // Send an email message
        await sendMailAsync();
        break;
      case 3:
        // Run any Graph code
        await makeGraphCallAsync();
        break;
      default:
        console.log('Invalid choice! Please try again.');
    }
  }
}

main();

function initializeGraph(settings) {
    graphHelper.initializeGraphForUserAuth(settings, (info) => {
      // Display the device code message to
      // the user. This tells them
      // where to go to sign in and provides the
      // code to use.
      console.log(info.message);
    });
  }
  
  async function greetUserAsync() {
    // TODO
  }
  
  async function displayAccessTokenAsync() {
    try {
      const userToken = await graphHelper.getUserTokenAsync();
      console.log(`User token: ${userToken}`);
    } catch (err) {
      console.log(`Error getting user access token: ${err}`);
    }
  }
  
  async function listInboxAsync() {
    // TODO
  }
  
  async function sendMailAsync() {
    // TODO
  }
  
  async function makeGraphCallAsync() {
    // TODO
  }