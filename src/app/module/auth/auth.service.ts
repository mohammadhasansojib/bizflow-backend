import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import { ConflictError } from "../../utils/errorFormats.js";
import type { IUserRegisterPayload } from "./auth.interface.js";
import authRepository from "./auth.repository.js";


const register = async (payload: IUserRegisterPayload) => {
    // check user with this email already exist or not
    const user = await authRepository.getUserByEmailFromDB(payload.email);
    if (user) {
        throw new ConflictError("user with this email already exist");
    }

    // hash password with bcrypt
    const hashPassword = await bcrypt.hash(payload.password, config.BCRYPT_SALT_ROUND);

    // create the user
    const createdUser = await authRepository.createUserIntoDB({
        ...payload,
        password: hashPassword,
    });

    // return the user
    return createdUser;
}

const authService = {
    register,
}
export default authService;