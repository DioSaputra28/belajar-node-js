import { prismaClient } from "../application/database.js";
import { ResposeError } from "../error/response-error.js";
import { registrUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"

const register = async (request) => {
    const user = validate(registrUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResposeError(400, "Username Sudah Digunakan");
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })

    return result;
}

export default {
    register
}