import {
  detectBrowser,
  Browser, 
  ChromeDesktop, EdgeDesktop, OperaDesktop, FirefoxDesktop, SafariDesktop,
  VivaldiDesktop, WaveboxDesktop, ArcDesktop, BraveDesktop,
  FirefoxAndroid, KiwiAndroid,
  SafariMobile
} from 'https://esm.sh/gh/doga/browser-detector@0.3.0/mod.mjs';

highlightUsersBrowserForDownload();

function highlightUsersBrowserForDownload() {
  const
  ua             = window.navigator.userAgent,
  browsers       = detectBrowser(ua),
  cssIdToBrowserClass = new Map([
    ['chrome' , ChromeDesktop],
    ['safari' , SafariDesktop],
    ['edge'   , EdgeDesktop],
    ['wavebox', WaveboxDesktop],
    ['opera'  , OperaDesktop],
    ['vivaldi', VivaldiDesktop],
    ['arc'    , ArcDesktop],
    ['safarim', SafariMobile],
    ['kiwi'   , KiwiAndroid],
  ]);

  if(
    browsers.find(browser => browser instanceof BraveDesktop) &&
    navigator.brave
  ){
    document.querySelector(`.download#brave`).classList.add('selected');
    return;
  }

  for (const [id, browserClass] of cssIdToBrowserClass) {
    if(!browsers.find(browser => browser instanceof browserClass))continue;
    document.querySelector(`.download#${id}`).classList.add('selected');
  }

}
