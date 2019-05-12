import Executor from "@v1/sources/sql/Executor";

class Source extends Executor
{
  private static instance: Source;
  private constructor() { super(); }
  static getInstance(): Source { return this.instance || (this.instance = new this()); }
}

export default Source;