import Executor from "./Executor";

class Source extends Executor
{
  generate(data: string): Promise<string>
  {
    return this.exec(data);
  }

  private static instance: Source;
  private constructor() { super(); }
  static getInstance(): Source { return this.instance || (this.instance = new this()); }
}
export default Source;