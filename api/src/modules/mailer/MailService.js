import {dirname, join} from "path";
import {fileURLToPath} from "url";
import { promises as fs } from 'fs';
import transporter from "./transport.js";
import config from "../../../config/config.js";


class MailService {

  static header  = 'header.html';
  static footer  = 'footer.html';
  static template= 'default.html';
  static templateFolder = 'layout';

  constructor(context = null, template) {
    this.context = context;
  }


  async send() {
    try {

      let mailOptions = {
        from: config.mail.nodemailer.from ,
        to: this.context.email,
        subject: 'От такі листи треба робити)',
        html: await this.generateEmailContent()
      };

      console.log(mailOptions)
      let info = await transporter.sendMail(mailOptions);

    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  }

  async generateEmailContent() {
    const __filename   = fileURLToPath(import.meta.url);
    const __dirname    = dirname(__filename);
    const locale   = this.getAccountLocale();
    const headerPath   = join(__dirname, 'templates/', locale, '/' + MailService.templateFolder +'/', MailService.header);
    const footerPath   = join(__dirname, 'templates/', locale, '/' + MailService.templateFolder +'/', MailService.footer);
    const templatePath = join(__dirname, 'templates/', locale, '/' + MailService.templateFolder +'/', MailService.template);

    try {
      const [headerContent,templateContent, footerContent] = [
        await fs.readFile(headerPath, 'utf8'),
        await fs.readFile(templatePath, 'utf8'),
        await fs.readFile(footerPath, 'utf8')
      ];

      return `${headerContent}${templateContent}${footerContent}`;
    } catch (error) {
      console.error('Error reading file:', error);
      return '';
    }
  }

  getAccountLocale() {
    if (this.context.locale) {
      return this.context.locale
    }
    return 'en'
  }


  static setTemplate(templateName) {
    MailService.template = templateName;
  }

  static setHeader(headerName) {
    MailService.header = headerName;
  }

  static setFooter(footerName) {
    MailService.footer = footerName;
  }

  static setTemplateFolder(templateFolderName) {
    MailService.templateFolder = templateFolderName;
  }
}


export default MailService
