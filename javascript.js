import fetch from node-fetch

url = "https://canvas.exeter.edu/api/v1/courses?per_page=9999";
let response = [];

const options = {
    method: "GET",
    headers: {
        Authorization: "Bearer 6333~6sJWbBtnXlJHdgr7MFtWP1axcnk1A7SFdP7hkdCwk2eOlVc5ebpMoDOMgal9avSx"
        
    },
};


fetch (url, options)
  
