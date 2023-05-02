url = "https://canvas.exeter.edu/api/v1/courses";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
        
    },
};

fetch (url, options)
    .then( response => response.json())
    .then( response => console.log(JSON.stringify(response)))