
import { Request, Response } from "express";
import Res from "@v1/util/Responses"

import PdfGen from "@v1/sources/pdfgen/Source";
import QrGen from "@v1/sources/qrgen/Source";
import Smtp from "@v1/sources/smtp/Source";

class Controllers
{
  constructor() { }

  async email_send(req: Request, res: Response)
  {
    const source = Smtp.getInstance()
    let to = req.body.to;
    let subject = req.body.subject;
    let content = req.body.content;
    let attachments = req.body.attachments;
    let result = await source.sendEmail({
      to: to,
      subject: subject,
      content: content,
      attachmentUrls: attachments
    });
    return Res.sendResult(res, result, "sent", req.body);
  }
  
  async pdf_generate(req: Request, res: Response)
  {
    const source = PdfGen.getInstance()
    let content = req.body.content;
    let fileName = await source.generate(content);
    return Res.sendFileName(res, fileName, req.body);
  }

  async qr_generate(req: Request, res: Response)
  {
    const source = QrGen.getInstance()
    let content = req.body.content;
    let fileName = await source.generate(content);
    return Res.sendFileName(res, fileName, req.body);
  }
}

export default Controllers;
