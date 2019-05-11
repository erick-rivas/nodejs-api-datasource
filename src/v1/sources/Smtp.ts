interface Smtp
{
  sendEmail(args: { to: string[], content: string, subject: string, attachmentUrls?: string[] }): Promise<boolean>
}

export default Smtp;