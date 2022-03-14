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

let API_BASE_URL = 'https://api.spoonacular.com';
let API_KEY = process.env.REACT_APP_API_KEY;

export { estimatedReadingTime, stripHTML, truncateString, API_BASE_URL, API_KEY };