interface PdfGen
{
  generate(data: string): Promise<string>
}

export default PdfGen;