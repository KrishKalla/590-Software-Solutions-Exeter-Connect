canvasURL = "https://canvas.exeter.edu/api/v1/courses?per_page=100";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
    },
}

let numCourses;

fetch(canvasURL, options)
    .then( response => response.json())
    .then( response => getCurrentCourses(response))
    .then( response => getCourseLinks(response))







function getCurrentCourses(response) {
    const filteredResponse = response.filter(course => !course.access_restricted_by_date);
    console.log(filteredResponse);
    return filteredResponse;
}

function getCourseNames(response) {
    numCourses = response.length;
    for (let i = 0; i < response.length; i++) {
        console.log(response[i].name)
    }
    return response;
}

function getCourseCodes(response) {
    for (let i = 0; i < response.length; i++) {
        console.log(response[i].course_code)
    }
    return response;
}

function getCourseID(response) {
    for (let i = 0; i < response.length; i++) {
        console.log(response[i].id)
    }
    return response;
}

function getCourseLinks(response) {
    for (let i = 0; i < response.length; i++) {
        let id = (response[i].id)
        let courseName = (response[i].name)
        let webString = 'https://canvas.exeter.edu/api/v1/courses/' + id + '/assignments?per_page=999';
        let consoleString = courseName + ': ' + 'https://canvas.exeter.edu/courses/' + id;
        getCourseInfo(webString);
        console.log(webString);
        console.log(consoleString);
    }
    return response;
}

function getCourseInfo (webString) {
    fetch(webString, options) 
        .then( response => response.json())
        .then( response => console.log(response))
}