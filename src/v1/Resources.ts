import { Router } from "express";
import * as path from "path";
import * as multer from "multer";

import Res from "@v1/util/Responses";
import Generator from "@v1/util/Generator";

var upload = multer({
  storage: multer.diskStorage(
    {
      destination: function (req, file, cb)
      {
        const rootDir = path.dirname(require.main.filename) + "/../";
        cb(null, rootDir + 'assets/public/resources')
      },
      filename: function (req, file, cb)
      {
        let extension = "";
        if (file.originalname)
          extension = "." + file.originalname.split('.').pop();
        cb(null, Generator.getId() + extension);
      }
    }
  )
});

export class Resources
{
  private router: Router;

  constructor()
  {
    this.router = Router();
  }

  init(): Router
  {

    /**
    * @api {post} /1/files Save a file
    * @apiName SaveFile
    * @apiGroup Files
    * @apiVersion 1.0.0
    * 
    * @apiParam {Object} file File data.
    * @apiSampleRequest off
    * @apiSuccess {String} url File path.
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "url": "http://localhost/res/file.jpg"
    *     }
    */

    this.router.post("/files", upload.single("file"), (req, res) =>
    {
      return Res.sendFileName(res, req.file.filename);
    });

    return this.router;
  }
}

export default Resources;
