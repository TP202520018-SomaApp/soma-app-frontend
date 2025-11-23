export default class Response {
    constructor(response = null, error = null) {
        this.error = error;
        this.response = response;
    }
}