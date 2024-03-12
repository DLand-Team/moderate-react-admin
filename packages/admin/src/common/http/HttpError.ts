export class HttpError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
    toString() {
        return `code: ${this.code}\n${super.toString()}`
    }
}