
// Get all the entries from the backend API
const fetchEntries = async (dispatch) => {
    try {
        const entryResponse = await fetch('http://localhost:4000/api/entries');

        if (!entryResponse.ok) return console.log(entryResponse);

        const entryJSON = await entryResponse.json();

        entryJSON.map((item) => {
            const date = new Date(item.submittedDate).toUTCString();
            item.submittedDate = date;
        });

        dispatch({ type: "FETCH_ENTRIES", payload: entryJSON });

        return entryJSON;

    } catch (error) {
        console.log(error);
        return [];
    }
}

export default fetchEntries