import { Response, Request } from "express";

class Responses
{
  /**
   * Send a simple 200 response.
   */

  static sendOk(res: Response)
  {
    res.send("Ok");
  }

  /**
   * Send a json response with the information defined in the 
   * toJSON() method of a Model collection.
   */

  static sendList(res: Response, result: any[])
  {
    res.setHeader("Content-Type", "application/json");
    const out = [];
    for (let r of result)
      out.push(r.toJSON());
    res.send(JSON.stringify(out ? out : []));
  }

  /**
  * Send a json response with the information of any object.
  */

  static sendObject(res: Response, result: any)
  {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result ? result : {}));
  }


  /**
  * Send result
  */

  static sendResult(res: Response, value: any, key?: string, request?: any)
  {
    res.setHeader("Content-Type", "application/json");
    let result = {}
    result[key ? key : "res"] = value
    if (request != null) result["req"] = request
    res.send(JSON.stringify(result));
  }

  /**
  * Send fileName
  */

  static sendFileName(res: Response, fileName: string, request?: any)
  {
    return Responses.sendResult(res,
      process.env.HOST_NAME + "/res/" + fileName, "url", request)
  }



  /**
  * Redirect to a relative url
  */

  static redirect(res: Response, req: Request, url: String)
  {
    res.redirect(`${req.protocol}://${req.get('host')}${url}`);
  }
}

export default Responses;