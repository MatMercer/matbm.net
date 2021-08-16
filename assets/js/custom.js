prettyWelcome = function (msg) {
  console.log('%c        ' + msg + '        ', 'background: #111; color: yellow; font-weight: bold');
}

switch (document.documentElement.lang) {
  case 'pt':
    prettyWelcome('Opa, parece que você abriu um console ;)');
    break;
  case 'en':
    prettyWelcome('Oh, looks like you opened a console ;)');
    break;
}

