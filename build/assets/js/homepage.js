import {
  detectBrowser,
  // Browser,
  ChromiumDesktop, EdgeDesktop, OperaDesktop, FirefoxDesktop, SafariDesktop,
  FirefoxAndroid, SafariMobile
} from 'https://esm.sh/gh/doga/browser-detector@0.2.1/mod.mjs';

highlightUsersBrowserForDownload();

function highlightUsersBrowserForDownload() {
  const
  ua      = window.navigator.userAgent,
  browser = detectBrowser(ua);

  // Desktop
  if (browser instanceof ChromiumDesktop) {
    if (navigator.brave) {
      document.querySelector('.download#brave').classList.add('selected');
    } else {
      ['chrome', 'vivaldi', 'arc'].forEach(
        brand => document.querySelector(`.download#${brand}`).classList.add('selected')
      );
    }
    return;
  }

  if (browser instanceof EdgeDesktop) {
    document.querySelector(`.download#edge`).classList.add('selected');
    return;
  }

  if (browser instanceof OperaDesktop) {
    document.querySelector(`.download#opera`).classList.add('selected');
    return;
  }

  if (browser instanceof FirefoxDesktop) {
    document.querySelector(`.download#firefox`).classList.add('selected');
    return;
  }

  if (browser instanceof SafariDesktop) {
    document.querySelector(`.download#safari`).classList.add('selected');
    return;
  }
  
  // Mobile
  if (browser instanceof SafariMobile) {
    document.querySelector(`.download#safari-m`).classList.add('selected');
    return;
  }

  if (browser instanceof FirefoxAndroid) {
    document.querySelector(`.download#firefox-a`).classList.add('selected');
    return;
  }

}

// browser detection https://www.skypack.dev/view/bowser
// import bowser from 'https://cdn.skypack.dev/pin/bowser@v2.11.0-Py0WXWOOzz0xiCAlkqky/mode=imports,min/optimized/bowser.js';
// if(bowser)highlightUsersBrowserForDownload(); // BUG Browsers use webkit on ios!!! Chrome does not have extensions on mobile (https://support.google.com/chrome_webstore/answer/2664769?hl=en#zippy=%2Cinstall-on-your-phone), but chrome for mobile can install a chrome web store extension to chrome desktop.

// function highlightUsersBrowserForDownload() {
//   const 
//   browser     = bowser.getParser(window.navigator.userAgent),
//   browserName = browser.getBrowserName();

//   // console.log(`user-agent: "${window.navigator.userAgent}"`);
//   // console.log(`browser name: "${browserName}"`);
//   // The current browser name is "Internet Explorer"

//   switch (browserName) {
//     case 'Chrome':
//       if (navigator.brave) {
//         document.querySelector('.download#brave').classList.add('selected');
//       } else {
//         document.querySelector('.download#chrome').classList.add('selected');
//       }
//       break;

//     case 'Safari':
//       document.querySelector('.download#safari').classList.add('selected');
//       break;

//     case 'Microsoft Edge':
//       document.querySelector('.download#edge').classList.add('selected');
//       break;

//     case 'Firefox':
//       document.querySelector('.download#firefox').classList.add('selected');
//       break;

//     case 'Opera':
//       document.querySelector('.download#opera').classList.add('selected');
//       break;

//     default:
//       break;
//   }

// }
