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
  * Redirect to a relative url
  */

  static redirect(res: Response, req: Request, url: String)
  {
    res.redirect(`${req.protocol}://${req.get('host')}${url}`);
  }
}

export default Responses;