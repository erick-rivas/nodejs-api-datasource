import Executor from "./Executor";
import Repository from "@v1/sources/PdfGen";

class Source extends Executor implements Repository
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