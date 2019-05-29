import * as path from "path";
import * as crypto from "crypto";
import * as pdf from 'html-pdf';

class Executor
{
    protected constructor() { }

    protected exec(data: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            const rootDir = path.dirname(require.main.filename) + "/../";
            const fileName = crypto.randomBytes(32).toString('hex') + ".pdf";
            const dir = rootDir + "public/res/" + fileName;
            const options = { format: 'Letter' };
            pdf.create(data, options).toFile(dir, (err, res1) =>
            {
                if (err) reject();
                else resolve(fileName);
            });
        });
    }

}
export default Executor;
