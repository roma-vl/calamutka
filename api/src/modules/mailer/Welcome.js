import MailService from "./MailService.js";

class Welcome extends MailService {
  static setTemplate() {
    super.setTemplate('welcome.html');
  }

  static setTemplateFolder() {
    super.setTemplateFolder('welcome');
  }

  static updateView(data) {
    MailService.setView(data);
  }
  constructor(context = null) {
    super(context);
    Welcome.setTemplate();
    Welcome.setTemplateFolder();
    Welcome.updateView({
      siteUrl: 'https://example.com',
      companyName: 'Example Inc.'
    });
  }

}

export default Welcome
