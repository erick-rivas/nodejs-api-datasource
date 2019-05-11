import * as path from "path";
import * as crypto from "crypto";
import * as qrcode from 'qrcode';

class Executor
{
  protected constructor() { }

  protected async exec(data: string): Promise<string>
  {
    const rootDir = path.dirname(require.main.filename) + "/../";
    const fileName = crypto.randomBytes(32).toString('hex') + ".png";
    const dir = rootDir + "public/res/" + fileName;
    const options = { errorCorrectionLevel: 'L' }
    qrcode.toFile(dir, data, options)
    return fileName;
  }

}
export default Executor;