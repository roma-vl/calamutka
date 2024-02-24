import MailService from "./MailService.js";

class Welcome extends MailService {
  template = 'welcome.html';
  templateFolder = 'welcome';
  views = {}
  constructor(context = null) {
    super(context);
    this.setTemplate(this.template);
    this.setTemplateFolder(this.templateFolder);
    this.setView(this.views);
  }

}

export default Welcome;
