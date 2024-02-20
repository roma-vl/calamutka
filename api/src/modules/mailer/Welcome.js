import MailService from "./MailService.js";

class Welcome extends MailService {
  static setTemplate() {
    super.setTemplate('welcome.html');
  }

  static setTemplateFolder() {
    super.setTemplateFolder('welcome');
  }
  constructor(context = null) {
    super(context);
    Welcome.setTemplate();
    Welcome.setTemplateFolder();
  }

}

export default Welcome
