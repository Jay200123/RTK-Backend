// import { jwt, SignOptions, TokenPayload } from "../interface";

// export const generateToken = (
//     payload: TokenPayload = {} as TokenPayload,
//     expiresIn: string = '1d'
// ): string => {
//     const options: SignOptions = { expiresIn };

//     const TokenPayload = {
//         ...payload,
//         _id: payload._id.toString(),
//     }

//     return jwt.sign(TokenPayload, process.env.JWT_SECRET, options);
// }