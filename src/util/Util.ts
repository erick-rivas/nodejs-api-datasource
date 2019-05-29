/**
 * Representation of a basic tuple (key, value).
 */

class Pair
{
  key: string;
  value: any;

  constructor(key: string, value: any)
  {
    this.key = key;
    this.value = value;
  }
}


export { Pair };
