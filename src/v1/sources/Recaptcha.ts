interface Recaptcha
{
  verify(response: string): Promise<boolean>
}

export default Recaptcha;