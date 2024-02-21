import MailService from "./MailService.js";

class Welcome extends MailService {
  template = 'welcome.html';
  templateFolder = 'welcome';
  views = {
    product: {
      companyName: 'Example Inc.',
      test: {
        rofTt: 23,
        fisDs: 'hello'
      }
    }
  }
  constructor(context = null) {
    super(context);
    this.setTemplate(this.template);
    this.setTemplateFolder(this.templateFolder);
    this.setView(this.views);
  }

}

export default Welcome;
