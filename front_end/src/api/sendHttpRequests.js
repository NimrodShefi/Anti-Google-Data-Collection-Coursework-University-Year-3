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

export function sendLoginData(url, body) {
    var data = encryptData(body);

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info: data })
    };
    var info = fetch(url, requestOptions)
        .then(response => {
            return response;
        })
        .catch(err => console.log("error: " + err));
    return info;
}

function encryptData(data) {
    var CryptoJS = require("crypto-js");
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();

    return ciphertext;
}

export function decryptData(data){
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(data, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}