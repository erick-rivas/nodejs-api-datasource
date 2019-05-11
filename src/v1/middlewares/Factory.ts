import Authentication from "@v1/middlewares/Authentication";

class Factory
{
  static createAuthentication()
  {
    return new Authentication();
  }
}

export default Factory;