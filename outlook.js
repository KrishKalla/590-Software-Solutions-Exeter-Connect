// Configuration
const clientId = 'bcad00d2-32d2-49fa-a7f6-ae61448b587c';
const tenantId = 'b8710300-e17a-4f12-92c5-869695e07115';
const redirectUri = 'http://localhost:3000/outlook/outlook.html';

// Microsoft Graph API endpoints
const graphApiEndpoint = 'https://graph.microsoft.com/v1.0';
const scopes = ['user.read', 'mail.read'];

// Get the login button element
const loginBtn = document.getElementById('loginBtn');

// Get the fetch emails button element
const fetchEmailsBtn = document.getElementById('fetchEmailsBtn');

// Get the emails list element
const emailsList = document.getElementById('emailsList');

// Get the email details container element
const emailDetailsContainer = document.getElementById('emailDetailsContainer');

// Get the email details element
const emailDetails = document.getElementById('emailDetails');

// Check if the user is already authenticated
if (localStorage.getItem('accessToken')) {
    loginBtn.disabled = true;
    fetchEmailsBtn.disabled = false;
    getEmails();
} else {
    loginBtn.disabled = false;
    fetchEmailsBtn.disabled = true;
}

// Attach click event listener to the login button
loginBtn.addEventListener('click', login);

// Attach click event listener to the fetch emails button
fetchEmailsBtn.addEventListener('click', getEmails);

// Function to initiate the login process
function login() {
    // Use the Microsoft Authentication Library (MSAL) for authentication
    const msalConfig = {
        auth: {
            clientId: clientId,
            authority: `https://login.microsoftonline.com/${tenantId}`,
            redirectUri: redirectUri
        }
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);

    msalInstance.loginPopup({ scopes: scopes })
        .then((response) => {
            // Save the access token in local storage
            localStorage.setItem('accessToken', response.accessToken);

            // Disable the login button and enable the fetch emails button
            loginBtn.disabled = true;
            fetchEmailsBtn.disabled = false;

            // Fetch emails
            getEmails();
        }) 
        .catch((error) => {
            console.error(error);
        });
}

// Function to fetch emails from Outlook
async function getEmails() {
    try {
        // Get the access token from local storage
        const accessToken = localStorage.getItem('accessToken');

        // Create the headers for the API request
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);

        // Make the API request to fetch emails
        const response = await fetch(`${graphApiEndpoint}/me/messages?$top=35`, { headers: headers });
        const data = await response.json();

        // Clear the emails list
        emailsList.innerHTML = '';

        // Iterate over the emails and add them to the list
        data.value.forEach(email => {
            const listItem = document.createElement('li');
            listItem.classList.add('card');
            listItem.innerHTML = `
                <strong>From:</strong> ${email.sender.emailAddress.name} (${email.sender.emailAddress.address})<br>
                <strong>Subject:</strong> ${email.subject}<br>
                <span>${email.bodyPreview}</span>
            `;
            // Set the email content as a data attribute
            listItem.dataset.content = email.body.content;
            emailsList.appendChild(listItem);

            // Attach click event listener to the email card
            listItem.addEventListener('click', () => {
                showEmailDetails(email.body.content);
            });
        });

        // Function to show email details
        function showEmailDetails(content) {
            emailDetails.innerHTML = content;
            emailDetailsContainer.style.display = 'block';
        }
    } catch (error) {
        console.error(error);
        // Handle the error appropriately (e.g., display an error message)
    }
}
