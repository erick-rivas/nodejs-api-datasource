import Executor from "./Executor";

class Source extends Executor
{
  sendEmail(args: { to: string[], subject: string, content: string, attachmentUrls?: string[] }): Promise<boolean>
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