async function FetchData(url) {
    const fetchedURL = await fetch(url);
    if (fetchedURL.ok) {
        var data = await fetchedURL.json()
        return data;
    }
}

module.exports = FetchData;