import Executor from "./Executor";

class Source extends Executor
{
  async verify(response: string): Promise<boolean>
  {
    let res = await this.exec(response);
    return res.success;
  }

  private static instance: Source;
  public constructor() { super(); }
  static getInstance(): Source { return this.instance || (this.instance = new this()); }
}
export default Source;