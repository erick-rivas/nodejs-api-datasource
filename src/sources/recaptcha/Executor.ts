import * as request from "request";

class Executor
{

    protected constructor() { }

    protected exec(response: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            const url = "https://www.google.com/recaptcha/api/siteverify";
            const body = {
                secret: process.env.RECAPTCHA_SECRET,
                response: response
            };
            request.post(url, {
                form: body
            }, (error, response, body) =>
                {
                    if (error) reject(error);
                    if (response.statusCode != 200) {
                        reject('Invalid status code <' + response.statusCode + '>');
                    }
                    resolve(JSON.parse(body));
                });
        });
    }

}
export default Executor;
