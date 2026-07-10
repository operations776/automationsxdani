export const EMAIL = 'daniyalaziz184@gmail.com';

/* Opens Gmail's compose window in the browser with the address and
   subject prefilled, instead of relying on a mailto: handler. */
export const gmailCompose = (subject = "Let's build something") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}`;
