function post(url, entity) {
    let result = undefined;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(entity)
    }).then((response, error) => {
        result = response;
        return response.json();
    }).then(body => {
        result.data = body;
        return result;
    })
}

function get(url) {
    let result = undefined;
    return fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
        result = response;
        return response.json();
    }).then(body => {
        result.data = body;
        return result;
    })
}

function put(url, entity) {
    let result = undefined;
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(entity)
    }).then((response, error) => {
        result = response;
        return response.json();
    }).then(body => {
        result.data = body;
        return result;
    });
}

function del(url) {
    let result = undefined;
    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((response, error) => {
        result = response;
        return response.json();
    }).then(body => {
        result.data = body;
        return result;
    });
}

export {
    get,
    post,
    put,
    del
}