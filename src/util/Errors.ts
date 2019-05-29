import { Response, Next } from "express";

enum Code
{
  BAD_REQUEST = 400,
  UNAUTHORIZED = 403
}

class Errors
{

  /**
   * Call next() method to continue to following handlers, 
   * In other words it is an equivalent to success response.
   */

  static next(next: Next)
  {
    next();
  }

  /**
   * Send an error message based on response code.
   */

  static sendError(res: Response, code: Code)
  {
    res.status(code);
    res.send(`(${code}) ${Code[code].toLocaleString()}`);
  }

  /**
   * Send a custom error message based on response code.
   */

  static sendErrorMessage(res: Response, code: Code, message: string)
  {
    res.status(code);
    res.send(`(${code}) ${Code[code].toLocaleString()} : ${message}`);
  }

  /**
   * Send a bad request message
   */

  static sendBadRequest(res: Response, message: string)
  {
    this.sendErrorMessage(res, Code.BAD_REQUEST, message);
  }

  /**
   * Send a unauthorized error
   */

  static sendUnauthorized(res: Response)
  {
    this.sendError(res, Code.UNAUTHORIZED);
  }
}

export default Errors;