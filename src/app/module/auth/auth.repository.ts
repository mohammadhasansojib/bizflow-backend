import { prisma } from "../../lib/prisma.js";
import type { IUserRegisterPayload } from "./auth.interface.js";


class AuthRepository {
    async getUserByEmailFromDB(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    }

    async createUserIntoDB(payload: IUserRegisterPayload) {
        const user = await prisma.user.create({
            data: {
                ...payload,
            },
            omit: {
                password: true,
            }
        });

        return user;
    }
}

const authRepository = new AuthRepository();
export default authRepository;