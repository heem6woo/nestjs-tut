import { ErrorMessageType } from './constants/error-messages.constant';

export class ResultEntity<T> {
    private readonly _success: boolean;
    private readonly _data?: T;
    private readonly _error?: ErrorMessageType;

    private constructor(
        success: boolean,
        data?: T,
        error?: ErrorMessageType
    ) {
        this._success = success;
        this._data = data;
        this._error = error;
    }

    public get data(): T | undefined {
        return this._data;
    }

    public get error(): ErrorMessageType | undefined {
        return this._error;
    }

    public get success(): boolean {
        return this._success;
    }

    public static success<T>(data: T): ResultEntity<T> {
        return new ResultEntity<T>(true, data);
    }

    public static error<T>(error: ErrorMessageType): ResultEntity<T> {
        return new ResultEntity<T>(false, undefined, error);
    }
}
