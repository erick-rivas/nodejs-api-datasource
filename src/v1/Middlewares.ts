import { Router } from "express";
import Factory from "@v1/middlewares/Factory";
import Authentication from "@v1/middlewares/Authentication";

class Middlewares
{
  private router: Router;
  private auth: Authentication;

  constructor()
  {
    this.router = Router();
    this.auth = Factory.createAuthentication();
  }

  init(): Router
  {
    this.router.get("*", (req, res, next) => this.auth.authenticate(req, res, next));
    return this.router;
  }
}

export default Middlewares;
