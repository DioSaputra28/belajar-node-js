import { ResposeError } from "../error/response-error.js"

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }


    if (err instanceof ResposeError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}