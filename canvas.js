// chrome.exe --disable-web-security --user-data-dir=C:\my-chrome-data\data

canvasURL = "https://canvas.exeter.edu/api/v1/courses?per_page=100";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx",
    },
}

let numCourses;

fetch(canvasURL, options)
    .then( response => response.json())
    .then( response => getCurrentCourses(response))
    .then( response => getCourseLinks(response))

function getCurrentCourses(response) {
    const filteredResponse = response.filter(course => !course.access_restricted_by_date);
    // console.log(JSON.stringify(filteredResponse));
    return filteredResponse;
}

function getCourseLinks(response) {
    for (let i = 0; i < response.length; i++) {
        let id = (response[i].id);
        let courseName = (response[i].name);
        let webString = 'https://canvas.exeter.edu/api/v1/courses/' + id + '/assignments?per_page=100';
        let consoleString = courseName + ': ' + 'https://canvas.exeter.edu/courses/' + id;
        getCourseInfo(webString, courseName);
        // console.log(consoleString);
    }
    return response;
}

function getCourseInfo (webString, course_name) {
    fetch(webString, options) 
        .then( response => response.json())
        .then( response => getAssignmentInfo(response, course_name))
        // .then( response => console.log(JSON.stringify(response)))
}

// Gets Info for assignments such as subject, description, due date, and the course name
function getAssignmentInfo (response, course_name) {

    for (let i = 0; i < response.length; i++) {
        let subject = (course_name);
        let title = (response[i].name);
        if(subject == 'undefined')
            continue;
        let desc = removeHTML(response[i].description);
        if(desc == 'undefined')
            desc = '';
        let dueDate = (response[i].due_at);
        console.log(subject + '\n' + title + '\n' + desc + '\n' + dueDate + '\n');
    }
    return response;
}

// Returns certain HTML tags and ornaments
function removeHTML (HTMLstr){
    HTMLstr = HTMLstr.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&apos;/g, '\''); // Removes tags such as <p> and </p>
    return HTMLstr;
}

