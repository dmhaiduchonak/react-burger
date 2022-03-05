
export const checkResponse = (response: Response): Response | PromiseLike<Response> => {
    if (response && response.ok) {
        return response;
    }
    throw Error(`${response.status} ${response.statusText}`);
}