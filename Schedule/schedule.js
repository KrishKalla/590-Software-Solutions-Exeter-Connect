$(document).ready(function() {
    var clientId = 'bcad00d2-32d2-49fa-a7f6-ae61448b587c';
    var tenantId = 'b8710300-e17a-4f12-92c5-869695e07115';
    var graphEndpoint = 'https://graph.microsoft.com/v1.0/me/events';

    var msalConfig = {
        auth: {
            clientId: clientId,
            authority: 'https://login.microsoftonline.com/' + tenantId,
            redirectUri: 'http://localhost:3000/Schedule/schedule.html',
            storeAuthStateInCookie: true
        },
        cache: {
            cacheLocation: 'localStorage'
        }
    };

    var msalInstance = new msal.PublicClientApplication(msalConfig);

    msalInstance.handleRedirectPromise()
        .then(function(authResult) {
            if (!sessionStorage.getItem('msalRedirectInProgress')) {
                if (authResult && authResult.account) {
                    fetchEvents();
                } else {
                    msalInstance.loginRedirect({
                        scopes: ['user.read', 'calendars.read']
                    });
                }
                sessionStorage.setItem('msalRedirectInProgress', 'true');
            } else {
                sessionStorage.removeItem('msalRedirectInProgress');
            }
        })
        .catch(function(error) {
            console.log(error);
        });

    function fetchEvents() {
        var now = new Date();
        var currentDay = now.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
        var startOffset = currentDay === 0 ? 6 : currentDay - 1; // Offset to Sunday
        var endOffset = 6 - currentDay; // Offset to Saturday
        var startDate = new Date(now.getTime() - startOffset * 24 * 60 * 60 * 1000); // Start date (Sunday)
        var endDate = new Date(now.getTime() + endOffset * 24 * 60 * 60 * 1000); // End date (Saturday);
        startDate.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC
        endDate.setUTCHours(23, 59, 59, 999); // Set time to 23:59:59.999 UTC
    
        var startTime = startDate.toISOString();
        var endTime = endDate.toISOString();
    
        msalInstance.acquireTokenSilent({
            scopes: ['https://graph.microsoft.com/.default'],
            authority: 'https://login.microsoftonline.com/' + tenantId
        }).then(function(response) {
            $.ajax({
                url: 'https://graph.microsoft.com/v1.0/me/calendarView',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + response.accessToken
                },
                data: {
                    startDateTime: startTime,
                    endDateTime: endTime
                },
                success: function(response) {
                    displayEvents(response.value);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }).catch(function(error) {
            console.log(error);
            msalInstance.loginRedirect({
                scopes: ['https://graph.microsoft.com/.default'],
                authority: 'https://login.microsoftonline.com/' + tenantId
            });
        });
    }
        
        
        
        

    function displayEvents(events) {
        var eventsTableBody = $('#events tbody');
        eventsTableBody.empty(); // Clear existing events
      
        // Create an object to map each day of the week (0-6) to an array of events
        var weekEvents = {
          0: [], // Sunday
          1: [], // Monday
          2: [], // Tuesday
          3: [], // Wednesday
          4: [], // Thursday
          5: [], // Friday
          6: []  // Saturday
        };
      
        // Group events by the day of the week
        events.forEach(function(event) {
          var eventStartDate = new Date(event.start.dateTime);
          var dayOfWeek = eventStartDate.getDay();
          weekEvents[dayOfWeek].push(event);
        });
      
        // Loop through each row in the table body and populate events
        for (var i = 0; i < 24; i++) {
          var row = $('<tr>');
          row.append('<td>' + i + ':00</td>'); // Time column
      
          // Loop through each day of the week and populate events for that day
          for (var j = 0; j < 7; j++) {
            var cell = $('<td>');
            var eventsForDay = weekEvents[j];
      
            // Find events that occur at the current day and hour
            var eventsAtHour = eventsForDay.filter(function(event) {
              var eventStartDate = new Date(event.start.dateTime);
              var eventDayOfWeek = eventStartDate.getDay();
              var eventStartHour = eventStartDate.getHours();
              return eventDayOfWeek === j && eventStartHour === i;
            });
      
            // Create a string with event details to display in the cell
            var eventDetails = '';
            eventsAtHour.forEach(function(event) {
              eventDetails += event.subject + '<br>';
            });
      
            cell.html(eventDetails);
            row.append(cell);
          }
      
          eventsTableBody.append(row);
        }
      
        // Print all events to the console
        events.forEach(function(event) {
          console.log('Subject:', event.subject);
          console.log('Start:', event.start.dateTime);
          console.log('End:', event.end.dateTime);
          console.log('-----------------------------');
        });
      }
    
    
    
    
});
