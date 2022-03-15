const estimatedReadingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
}

function stripHTML(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function truncateString(str, num = 50) {
    if (str.length > num) {
        return str.slice(0, num) + "..";
    } else {
        return str;
    }
}

function stripSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, "")
}

function randomID() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

let API_BASE_URL = 'https://api.spoonacular.com';
let API_KEY = process.env.REACT_APP_API_KEY;

export { estimatedReadingTime, stripHTML, truncateString, stripSpecialCharacters, randomID, API_BASE_URL, API_KEY };