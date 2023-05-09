url = "https://canvas.exeter.edu/api/v1/courses?per_page=100";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
    },
}

var array = new Array();

fetch(url, options)
    .then(response => response.json())
    .then(response => load(response))
    .then(response => console.log(JSON.stringify(response)))

function load(response) {
    for (let i = 0; i < response.length; i++) {
        console.log(typeof response);
    }
    return response;
}
