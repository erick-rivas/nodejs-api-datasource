import { Router } from "express";
import Factory from "@v1/controllers/Factory";

class Routes
{
  private router: Router;

  constructor()
  {
    this.router = Router();
  }

  init(): Router
  {
    return this.router;
  }
}

export default Routes;