import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import { AuthorizationError, ConflictError, NotFoundError } from "../../utils/errorFormats.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
import type { IUserLoginPayload, IUserRegisterPayload } from "./auth.interface.js";
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

const login = async (payload: IUserLoginPayload) => {
    const { email, password } = payload;

	const user = await authRepository.getUserByEmailFromDB(email);
	if (!user) {
		throw new NotFoundError("user not found");
	}

	const isValidPass = await bcrypt.compare(password, user.password);
	if (!isValidPass) {
		throw new AuthorizationError("invalid password");
	}

	const tokenPayload = {
		id: user.id,
		email: user.email,
	};
	const accessToken = createAccessToken(tokenPayload);
	const refreshToken = createRefreshToken(tokenPayload);

	return {
		accessToken,
		refreshToken,
	};
}

const getMe = async (id: string) => {
    const user = await authRepository.getUserByIdFromDB(id);
    if (!user) {
        throw new NotFoundError("user not found");
    }

    return user;
}

const authService = {
    register,
    login,
    getMe,
}
export default authService;