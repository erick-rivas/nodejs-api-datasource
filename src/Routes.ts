import { Router } from "express";
import Controllers from "@lt/Controllers";

class Routes
{
  private router: Router;
  private ctrls: Controllers;

  constructor()
  {
    this.router = Router();
    this.ctrls = new Controllers();
  }

  init(): Router
  {

    /**
    * @api {post} /1/email/send Send an email
    * @apiName EmailSend
    * @apiGroup Email
    * @apiVersion 1.0.0
    * 
    * @apiParam {String[]} to Email recipients.
    * @apiParam {String} subject Email subject.
    * @apiParam {String} content Email content.
    * @apiParam {String[]} [attachments] Email attachment urls.
    *
    * @apiSampleRequest off
    * @apiParamExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "to": ["name@email.com", "name2@email.com"],
    *       "subject": "subject",
    *       "content": "content",
    *       "attachments": ["http://localhost/document.png", "http://localhost/image.png"]
    *       "req": {}
    *     }
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "sent": true,
    *       "req": {}
    *     }
    */

    this.router.post("/email/send", (req, res) => this.ctrls.email_send(req, res));

    /**
    * @api {post} /1/pdf/generate Generate a pdf from html
    * @apiName PdfGenerate
    * @apiGroup Pdf
    * @apiVersion 1.0.0
    * 
    * @apiParam {String} content Html content to parse.
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "url": "http://localhost/res/file.pdf",
    *       "req": {}
    *     }
    */

    this.router.post("/pdf/generate", (req, res) => this.ctrls.pdf_generate(req, res));

    /**
    * @api {post} /1/qr/generate Generate a qr code
    * @apiName QrGenerate
    * @apiGroup Qr
    * @apiVersion 1.0.0
    * 
    * @apiParam {String} content Qr content.
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "url": "http://localhost/res/code.png",
    *       "req": {}
    *     }
    */

    this.router.post("/qr/generate", (req, res) => this.ctrls.qr_generate(req, res));
    return this.router;
  }
}

export default Routes;