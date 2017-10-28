const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const favicons = require('favicons');
const chalk = require('chalk');
const gitRevSync = require('git-rev-sync');

const SOURCE = './src/assets/favicon.png';
const FAVICON_PATH = 'favicon/';
const DESTINATION = `./public/${FAVICON_PATH}`;

const TEMPLATE = './public/index.html';

const PACKAGE = JSON.parse(
  fs.readFileSync('./package.json', { encoding: 'utf-8' })
);

const configuration = {
  appName: PACKAGE.config.title, // Your application's name. `string`
  appDescription: PACKAGE.config.description, // Your application's description. `string`
  developerName: PACKAGE.author.name, // Your (or your developer's) name. `string`
  developerURL: PACKAGE.author.url, // Your (or your developer's) URL. `string`
  background: '#000', // Background colour for flattened icons. `string`
  theme_color: '#000', // Theme color for browser chrome. `string`
  path: FAVICON_PATH, // Path for overriding default icons path. `string`
  display: 'standalone', // Android display: "browser" or "standalone". `string`
  orientation: 'portrait', // Android orientation: "portrait" or "landscape". `string`
  start_url: '/?homescreen=1', // Android start application's URL. `string`
  version: gitRevSync.count(), // Your application's version number. `number`
  logging: true, // Print logs to console? `boolean`
  online: false, // Use RealFaviconGenerator to create favicons? `boolean`
  preferOnline: false, // Use offline generation, if online generation has failed. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - shadow - drop shadow for Android icons, available online only
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
    coast: {
      offset: 25
    }, // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
    favicons: true, // Create regular favicons. `boolean`
    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background }`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ background }`
    yandex: true // Create Yandex browser icon. `boolean` or `{ background }`
  }
};

const callback = (error, response) => {
  if (error) {
    console.log(chalk.red(error.status)); // HTTP error code (e.g. `200`) or `null`
    console.log(chalk.red(error.name)); // Error name e.g. "API Error"
    console.log(chalk.red(error.message)); // Error description e.g. "An unknown error has occurred"
    return;
  }

  if (response.images) {
    mkdirp.sync(DESTINATION);
    response.images.forEach(image =>
      fs.writeFileSync(`${DESTINATION}${image.name}`, image.contents)
    );
    console.log(chalk.green('Favicons images generated.'));
  } else {
    console.log(chalk.yellow('Favicons images missing in the response.'));
  }

  if (response.files) {
    mkdirp.sync(DESTINATION);
    response.files.forEach(file =>
      fs.writeFileSync(`${DESTINATION}${file.name}`, file.contents)
    );
    console.log(chalk.green('Favicons files generated.'));
  } else {
    console.log(chalk.yellow('Favicons files missing in the response.'));
  }

  if (response.html) {
    const file = fs.readFileSync(TEMPLATE, { encoding: 'utf-8' });
    const processedFile = file.replace(
      '<!-- SCRIPTS:FAVICONS -->',
      `${response.html.join('\n')}`
    );
    fs.writeFileSync(TEMPLATE, processedFile);
    console.log(chalk.green('Favicons template generated.'));
  } else {
    console.log(chalk.yellow('Favicons template missing in the response.'));
  }
};

favicons(SOURCE, configuration, callback);
