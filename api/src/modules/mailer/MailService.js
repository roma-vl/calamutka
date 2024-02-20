import {dirname, join} from "path";
import {fileURLToPath} from "url";
import { promises as fs } from 'fs';
import transporter from "./transport.js";
import config from "../../../config/config.js";


class MailService {

  header = 'header.html';
  footer = 'footer.html';
  template = '';
  constructor(context = null) {
    this.context = context;
  }

  async send() {
    try {

      let mailOptions = {
        from: config.mail.nodemailer.from ,
        to: this.context.email,
        subject: 'Invitation',
        html: await this.generateEmailContent()
      };

      console.log(mailOptions)
      let info = await transporter.sendMail(mailOptions);

    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  }

  async generateEmailContent() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname  = dirname(__filename);
    const locale = this.getAccountLocale();
    const headerPath = join(__dirname, 'templates/', locale, '/layout', this.header);
    const footerPath = join(__dirname, 'templates/', locale, '/layout', this.footer);

    try {
      const [headerContent, footerContent] = [
        await fs.readFile(headerPath, 'utf8'),
        await fs.readFile(footerPath, 'utf8')
      ];

      // console.log(`${headerContent}${this.template}${footerContent}`)

      return `${headerContent}${this.template}${footerContent}`;
    } catch (error) {
      console.error('Error reading file:', error);
      return '';
    }
  }

  getAccountLocale() {
    if (this.context.locale) {
      return this.context.locale
    }
    return 'ua'
  }
}
export default MailService
