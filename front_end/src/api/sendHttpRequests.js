export function sendHttpRequestJson(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            console.log(data);
        }

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.response);
            }
        }
        xhr.send(JSON.stringify(data));
    });

    return promise;
}


export function fetchDataTo(method, url, body) {
    const requestOptions = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: body }),

    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(res => console.log("response: " + res))
        .catch(err => console.log("error: " + err));
}
