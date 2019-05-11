import Repository from "@v1/sources/Smtp";
import Executor from "./Executor";

class Source extends Executor implements Repository
{
  sendEmail(args: { to: string[], content: string, subject: string, attachmentUrls?: string[] }): Promise<boolean>
  {
    return this.exec(
      args.to,
      args.subject,
      args.content,
      args.attachmentUrls ? args.attachmentUrls : []
    );
  }

  private static instance: Source;
  public constructor() { super(); }
  static getInstance(): Source { return this.instance || (this.instance = new this()); }

}
export default Source;