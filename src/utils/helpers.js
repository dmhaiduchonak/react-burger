export const checkResponse = (response) => {
    if (response && response.ok) {
        return response;
    }
    throw Error(`${response.status} ${response.statusText}`);
}