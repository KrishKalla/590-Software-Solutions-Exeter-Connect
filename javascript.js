url = "https://canvas.exeter.edu/api/v1/courses?per_page=9999";

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
        
    },
};

fetch (url, options)
    // .then( response => response.json())
    // .then( response => console.log(JSON.stringify(response)))
    .then(async(response) => {
        let clone = response.clone();
        let res = await clone.json();
        console.log(res);
        return response.blob()
    })
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "jsonfile.txt";
        a.click();
    })
    .catch(function(err) {
        console.error(err);
    })