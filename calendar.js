canvasURL = "https://canvas.exeter.edu/api/v1/courses?per_page=100";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
    },
}

const events = [];

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
        createEvent(title, dueDate);
        console.log(subject + '\n' + title + '\n' + desc + '\n' + dueDate + '\n');
        
    }
    return response;
}

// Returns certain HTML tags and ornaments
function removeHTML (HTMLstr){
    HTMLstr = HTMLstr.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&apos;/g, '\''); // Removes tags such as <p> and </p>
    return HTMLstr;
}

date = new Date();
const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']

//GET CURRENT DATE IN MONTH FORM
month = date.getMonth() ;

monthString = monthNames[month];
document.getElementById("datetime").innerHTML = monthString;

const goPrev = document.querySelector(".calendar-previous");
const goNext = document.querySelector(".calendar-next");
const goToday = document.querySelector(".calendar-today");

goPrev.addEventListener('click', previousMonth);
goNext.addEventListener('click', nextMonth);
goToday.addEventListener('click', currentMonth);

function previousMonth() {
    console.log('previous');
    month--;
    if(month == -1){
        month = 11
    }
    console.log(month);
    monthString = monthNames[month];
    document.getElementById("datetime").innerHTML = monthString;
    generateCalendar();
}

function nextMonth() {
    console.log('next');
    month++;
    if(month == 12){
        month = 0
    }
    console.log(month);
    monthString = monthNames[month];
    document.getElementById("datetime").innerHTML = monthString;
    generateCalendar();
}

function currentMonth() {
    console.log('today');
    month = date.getMonth();
    console.log(month);
    monthString = monthNames[month];
    document.getElementById("datetime").innerHTML = monthString;
    generateCalendar();
}





// Function to generate calendar
function generateCalendar() {
    const daysContainer = document.querySelector(".days");
  
    // Clear previous calendar days
    daysContainer.innerHTML = "";
  
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    // Get first day of the month
    const firstDay = new Date(currentYear, month, 1);
    const startingDay = firstDay.getDay();
  
    // Get the number of days in the month
    const lastDay = new Date(currentYear, month + 1, 0).getDate();
  
    // Generate empty cells for previous month if necessary
    for (let i = 0; i < startingDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("empty");
      daysContainer.appendChild(emptyCell);
    }
  
    // Generate calendar days
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const calendarDay = document.createElement("div");
      calendarDay.textContent = day;
  
      // Check if the current date has an event
      const event = events.find((event) =>
        event.date.toDateString() === date.toDateString()
      );
  
      if (event) {
        calendarDay.classList.add("event");
        const eventTitle = document.createElement("div");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.name;
        calendarDay.appendChild(eventTitle);
      }
  
      daysContainer.appendChild(calendarDay);
    }
  }
  
  // Call the generateCalendar function to initially populate the calendar
  generateCalendar();


function createEvent(title, stringDate) {
    let Edate = new Date(stringDate);
    let formattedDate = new Date(Edate.getFullYear(), Edate.getMonth(), Edate.getDate());
    let name = title;
    events.push({formattedDate, name});
    console.log(formattedDate);
    console.log(events);
}