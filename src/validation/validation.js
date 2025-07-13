import { ResposeError } from "../error/response-error.js";

const validate = (scema, request) => {
    const result = scema.validate(request)
    if (request.error) {
        throw new ResposeError(400, result.error.message);
    } else {
        return result.value;
    }
}

export {
    validate
}
