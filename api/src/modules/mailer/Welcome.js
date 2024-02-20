import MailService from "./MailService.js";

class Welcome extends MailService {
  static template = 'welcome.html';
  constructor(context = null) {
    super(context);
  }

  // async generateEmailContent() {
  //   return '<p>Invitation content goes here</p>';
  // }
}

export default Welcome
