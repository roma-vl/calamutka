import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {promises as fs} from 'fs';
import handlebars from 'handlebars';
import config from "../../../config/config.js";
import productConfig from "../../../config/productConfig.js";
import transporter from "./transport.js";

class MailService {

  header = 'header.html'
  footer = 'footer.html'
  template = 'default.html'
  templateFolder = 'layout'

  constructor(context = null) {
    this.context = context;
    this.view = productConfig;
    this.setHeader(this.header);
    this.setFooter(this.footer);
    this.setTemplate(this.template);
    this.setTemplateFolder(this.templateFolder);
  }

  async send() {
    try {
      let mailOptions = {
        from: config.mail.nodemailer.from,
        to: this.context.email,
        subject: 'От такі листи треба робити)',
        html: await this.generateEmailContent()
      };

      // console.log(mailOptions);
      let info = await transporter.sendMail(mailOptions);

    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  }

  async generateEmailContent() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const locale = this.getAccountLocale();


    const headerPath = join(__dirname, 'templates/', locale, '/layout/', this.header);
    const footerPath = join(__dirname, 'templates/', locale, '/layout/', this.footer);
    const templatePath = join(__dirname, 'templates/', locale, '/' + this.templateFolder + '/', this.template);

    try {
      const [headerContent, templateContent, footerContent] = [
        await fs.readFile(headerPath, 'utf8'),
        await fs.readFile(templatePath, 'utf8'),
        await fs.readFile(footerPath, 'utf8')
      ];
      const htmlTemplate = `${headerContent}${templateContent}${footerContent}`;

      const compiledTemplate = handlebars.compile(htmlTemplate);

      console.log(this.view);
      return compiledTemplate(this.view);
    } catch (error) {
      console.error('Error reading file:', error);
      return '';
    }
  }

  getAccountLocale() {
    if (this.context.locale) {
      return this.context.locale;
    }
    return 'ua';
  }

  setView(views) {
    Object.keys(views).forEach(key => {
      if (this.view.hasOwnProperty(key)) {
        this.view[key] = views[key];
      } else {
        this.view[key] = views[key];
      }
    });
  }

  setTemplate(templateName) {
    this.template = templateName;
  }

  setHeader(headerName) {
    this.header = headerName;
  }

  setFooter(footerName) {
    this.footer = footerName;
  }

  setTemplateFolder(templateFolderName) {
    this.templateFolder = templateFolderName;
  }

}

export default MailService;
