import {z} from "zod";


export const UserSchema = z.object({
        username: z.string().min(3).max(50).trim(),
        email: z.string().email().min(5).max(50).trim().transform((val) => val.toLowerCase()),
        password: z.string().min(8).max(50).trim()
    })

