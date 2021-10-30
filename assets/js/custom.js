prettyWelcome = function (msg) {
  console.log('%c        ' + msg + '        ', 'background: #111; color: yellow; font-weight: bold; font-size: 24px');
  console.log('%c    Parallel Cat Blog    ', 'background: #111; color: #9999CC; font-weight: bold; font-size: 16px');
}

welcomeMsgs = {
  'pt': 'Opa, parece que você abriu um console :3',
  'en': 'Oh, looks like you opened a console :3',
}

prettyWelcome(welcomeMsgs[document.documentElement.lang]);
