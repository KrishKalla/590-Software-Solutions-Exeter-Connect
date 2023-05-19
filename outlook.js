canvasURL = "https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 920a7377-2efb-495a-8c45-87b91630a09e"
    },
}
fetch(canvasURL, options)
    .then( response => response.json())
    .then( response => console.log(response))


// function getInbox(response) {
//     for (let i = 0; i < response.length; i++) {
//         let id = (response[i].id);
//         let subject = (response[i].name);
//         let webString = 'https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?' + id + '$select=subject,from,receivedDateTime&$top=25&$orderby=receivedDateTime%20DES';
//         getCourseInfo(webString, subject);
//         // console.log(consoleString);
//     }
//     return response;
// }