import {
  detectBrowser,
  // Browser,
  ChromiumDesktop, EdgeDesktop, OperaDesktop, FirefoxDesktop, SafariDesktop,
  // FirefoxAndroid, 
  // KiwiAndroid,
  // SafariMobile
} from 'https://esm.sh/gh/doga/browser-detector@0.2.2/mod.mjs';

highlightUsersBrowserForDownload();

function highlightUsersBrowserForDownload() {
  const
  ua         = window.navigator.userAgent,
  browser    = detectBrowser(ua),
  browserIds = [],
  browserClasses   = {
    edge      : EdgeDesktop,
    opera     : OperaDesktop,
    firefox   : FirefoxDesktop,
    safari    : SafariDesktop,
    // "safari-m": SafariMobile,
    // "kiwi-a"  : KiwiAndroid,
  };

  // Find the browsers to highlight
  if (browser instanceof ChromiumDesktop) {
    if (navigator.brave) {
      browserIds.push('brave');
    } else {
      ['chrome', 'vivaldi', 'arc'].forEach(brand => browserIds.push(brand));
    }
  }

  for (const browserId in browserClasses) {
    if (Object.hasOwnProperty.call(browserClasses, browserId)) {
      const browserClass = browserClasses[browserId];
      // console.debug(`browserId: ${browserId}`);
      if(browser instanceof browserClass){
        browserIds.push(browserId)
      }
    }
  }

  // Highlight the browsers on the web page
  for (const browserId of browserIds) {
    document.querySelector(`.download#${browserId}`).classList.add('selected');
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
