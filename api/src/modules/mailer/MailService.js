import {dirname, join} from "path";
import {fileURLToPath} from "url";
import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import config from "../../../config/config.js";


class MailService {

  static header  = 'header.html';
  static footer  = 'footer.html';
  static template= 'default.html';
  static templateFolder = 'layout';
  static view = {};

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
      // let info = await transporter.sendMail(mailOptions);

    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  }

  async generateEmailContent() {
    const __filename   = fileURLToPath(import.meta.url);
    const __dirname    = dirname(__filename);
    const locale   = this.getAccountLocale();
    // const view = MailService.view;
    MailService.view.siteUrls = 'https://calamutka.com';

    const headerPath   = join(__dirname, 'templates/', locale, '/layout/', MailService.header);
    const footerPath   = join(__dirname, 'templates/', locale, '/layout/', MailService.footer);
    const templatePath = join(__dirname, 'templates/', locale, '/' + MailService.templateFolder +'/', MailService.template);

    try {
      const [headerContent,templateContent, footerContent] = [
        await fs.readFile(headerPath, 'utf8'),
        await fs.readFile(templatePath, 'utf8'),
        await fs.readFile(footerPath, 'utf8')
      ];
      const htmlTemplate = `${headerContent}${templateContent}${footerContent}`;
      // Компілюємо шаблон за допомогою Handlebars
      const compiledTemplate = handlebars.compile(htmlTemplate);


      const view = MailService.view;
      console.log(view)
      const renderedHtml = compiledTemplate(view);
      // console.log(renderedHtml)
      return renderedHtml;
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



  static setView(view) {
    MailService.view = {...MailService.view, ...view};
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
