import path from 'node:path';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';
export const getTemplate = async <T>(templateName: string, data: T) => {
  const templatePath = path.resolve(`src/templates/${templateName}.html`);
  const templateSource = await fs.readFile(templatePath, `utf-8`);
  const template = Handlebars.compile(templateSource);
  const html = template(data);
  return html;
};
