module.exports = {
  // This will lint and format TypeScript and                                             //JavaScript files
  '**/*.(ts|js)': filenames => [`yarn prettier --write ${filenames.join(' ')}`],

  // this will check Typescript files
  '**/*.(ts)': () => 'npx tsc --noEmit',

  // this will Format MarkDown and JSON
  '**/*.(md|json)': filenames => `yarn prettier --write ${filenames.join(' ')}`,
}
