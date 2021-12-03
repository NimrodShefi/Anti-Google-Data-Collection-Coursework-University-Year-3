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
            console.log(response);
            return response.json();
        })
        .then(parsedData => {
            console.log(parsedData);
            return parsedData;
        })
        .catch(err => console.log("error: " + err));
    return info;
}

export function getData(url) {
    var info = fetch(url)
        .then(response => {
            var info = response.json();
            return info;
        })
        .catch(err => console.error("error: " + err));

    return info;
}
