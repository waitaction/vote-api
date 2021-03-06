import { ResponseCodeEnum } from "./response-code.enum";

/**
 * εεΊη»ζ
 */
export class ResponseModel<T>{
    code: ResponseCodeEnum;
    data: T;
    error: any;

    constructor(code: ResponseCodeEnum, data: T, error: any = null) {
        this.code = code;
        this.data = data;
        this.error = error;
    }
}