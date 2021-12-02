export function sendData(url, body) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info: body })
    };
    fetch(url, requestOptions)
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log("error: " + err));
}

export function getData(url) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(parsedData => {
            console.log(parsedData);
        })
        .catch(err => console.error("error: " + err));
}
