canvasURL = "https://canvas.exeter.edu/api/v1/courses?per_page=100";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
    },
}

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
        let string = courseName + ': ' + 'https://canvas.exeter.edu/courses/' + id;
        console.log(string)
    }
    return response;
}