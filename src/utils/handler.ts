import { STATUSCODE } from "../constants";
import { Response } from "../interface";

class ErrorHandler extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = STATUSCODE.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      error: {
        message: this.message,
      },
    };
  }
}

const SuccessHandler = (
  res: Response,
  message: string,
  details: any,
  token?: string
) => {
  res.status(STATUSCODE.SUCCESS).json({
    success: true,
    message: message,
    details: details,
    ...(token && { access: token }),
  });
};

export { ErrorHandler, SuccessHandler };
