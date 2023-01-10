exports.post = (url, content_type = "application/json", body = null) => {
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': content_type},
        body: body
    };
    return fetch(url, requestOptions)
}

exports.get = (url, content_type = "application/json", body = null) => {
    const requestOptions = {
        method: "GET",
        headers: {'Content-Type': content_type},
        body: body
    };
    return fetch(url, requestOptions)
}

exports.put = (url, body = null, content_type = "application/json") => {
    const requestOptions = {
        method: "PUT",
        headers: {'Content-Type': content_type},
        body: body
    };
    return fetch(url, requestOptions)
}