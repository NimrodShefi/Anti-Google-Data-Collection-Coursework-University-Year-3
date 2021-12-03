export function sendData(url, body) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info: body })
    };
    var info = fetch(url, requestOptions)
        .then(response => {
            return response;
        })
        .catch(err => console.log("error: " + err));
    return info;
}

export function getData(url) {
    var info = fetch(url)
        .then(response => {
            return response.json();
        })
        .catch(err => console.error("error: " + err));

    return info;
}
