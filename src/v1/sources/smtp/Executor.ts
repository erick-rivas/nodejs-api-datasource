import * as Mail from 'nodemailer';
import *  as path from 'path';
import *  as fs from 'fs';

class Executor
{

  protected transporter;
  protected mailer;
  protected sender;

  protected constructor()
  {
    this.mailer = Mail;
    this.sender = process.env.SMTP_EMAIL;
    this.transporter = this.mailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: this.sender,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  protected exec(to: string[], subject: string, content: string, attachmentUrls: string[]): Promise<boolean>
  {
    const attachments = this.parseUrls(attachmentUrls);
    const data = {
      from: this.sender,
      to: to,
      subject: subject,
      html: content,
      attachments: attachments
    }
    return this.execute(data);
  }

  private parseUrls(urls): any[]
  {
    let paths = [];
    for (let url of urls) {
      let urlPath = new URL(url).pathname;
      let subPaths = urlPath.split("/");
      let fileName = subPaths[subPaths.length - 1];
      const rootDir = path.dirname(require.main.filename) + "/../";
      const dir = rootDir + "public/res/" + fileName;
      if (fs.existsSync(dir))
        paths.push({
          filename: fileName,
          path: dir
        })
    }
    return paths;
  }

  private execute(data: any): Promise<boolean>
  {
    return new Promise((resolve, reject) =>
    {
      this.transporter.sendMail(data, function (err, body)
      {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }
}

export default Executor;