export function sendHttpRequestJson(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status === 200){
                resolve(xhr.response);
            } else {
                reject(xhr.response);
            }
        }
        xhr.onerror = () => {
            reject('Something went wrong!');
        }

        xhr.send(JSON.stringify(data));
    });

    return promise;
}
