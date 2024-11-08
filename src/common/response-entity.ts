
export class ResponseEntity<T> {
    private _data: T;
    private _message: string;
    private _status: number;

    constructor(data: T, message: string = '', status: number = 200) {
        this._data = data;
        this._message = message;
        this._status = status;
    }

    get data(): T {
        return this._data;
    }

    get message(): string {
        return this._message;
    }

    get status(): number {
        return this._status;
    }

    public static success<T>(data: T, message: string = 'Success'): ResponseEntity<T> {
        return new ResponseEntity<T>(data, message, 200);
    }

    public static error<T>(message: string, status: number = 500): ResponseEntity<T> {
        return new ResponseEntity<T>(null, message, status);
    }
}
