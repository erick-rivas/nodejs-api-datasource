require("module-alias/register");
import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet"
import * as logger from "morgan";
import * as path from "path";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Router } from "express";

class App
{
  public app;
  public server;

  public static start(): App
  {
    return new App();
  }

  constructor()
  {
    this.app = express();
    this.app.use(logger("dev"));

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    const rootDir = path.dirname(require.main.filename) + "/../";
    const isDebug = process.env.IS_DEBUG == null ||
      process.env.IS_DEBUG.toLowerCase() == "true";
    dotenv.config({
      path: rootDir + (isDebug ? ".env.dev" : ".env.prod")
    });

    this.app.use('/', express.static(rootDir + 'public'));
    this.app.use('/docs', express.static(rootDir + 'docs'));

    //API version initialization
    this.app.use("/1", new v1().init());


    const port = this.normalizePort(process.env.PORT || "4004");
    this.server = this.app.listen(port);
    console.log("Listening port: " + port);
  }

  private normalizePort(val)
  {
    const port = parseInt(val, 10);
    if (isNaN(port))
      return val;
    if (port >= 0)
      return port;
    return false;
  }
}


//Latest (v1)

import Routes from "@lt/Routes";
import Resources from "@lt/Resources";
import Middlewares from "@lt/middlewares";

class v1
{
  private router: Router;

  constructor()
  {
    this.router = Router();
  }

  public init()
  {
    this.router.use("/", new Middlewares().init());
    this.router.use("/", new Routes().init());
    this.router.use("/", new Resources().init());
    return this.router;
  }
}

export { App };