var graphEndpoint = 'https://graph.microsoft.com/v1.0/me';

msalInstance.handleRedirectPromise()
    .then(function(authResult) {
        if (!sessionStorage.getItem('msalRedirectInProgress')) {
            if (authResult && authResult.account) {
                getUserData();
            } else {
                msalInstance.loginRedirect({
                    scopes: ['user.read']
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

function getUserData() {
    msalInstance.acquireTokenSilent({
        scopes: ['user.read']
    }).then(function(response) {
        var headers = new Headers();
        var bearer = "Bearer " + response.accessToken;
        headers.append("Authorization", bearer);

        fetch(graphEndpoint, {
            method: "GET",
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            var nameElement = document.getElementById("name");
            var dateElement = document.getElementById("date");
            var emailElement = document.getElementById("email");
            var birthdayElement = document.getElementById("birthday");

            nameElement.textContent = data.displayName;
            dateElement.textContent = data.createdDateTime;
            emailElement.textContent = data.mail;
            birthdayElement.textContent = data.birthday || "N/A";
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}
