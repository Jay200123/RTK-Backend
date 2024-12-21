import jwt, { SignOptions } from "jsonwebtoken";
import { mongoose } from "../mongoose";
import { User } from "../models/user";
import { Request } from "../routes";

interface TokenPayload {
    _id: mongoose.Types.ObjectId;
}

interface DecodeToken {
    _id: string,
    exp: number
}

interface AuthenticatedRequest extends Request {
    user?: User
}

export {
    jwt,
    SignOptions,
    TokenPayload,
    DecodeToken,
    AuthenticatedRequest
}