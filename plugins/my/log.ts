// Lume plugin https://lume.land/docs/advanced/plugins/
// Shows info about the page being processed.

import { Page, Site } from "https://deno.land/x/lume@v1.13.2/core.ts";

// interface Options {
//   message: string;
// }

export default 
function () {
// function (options: Options) {
  return (site: Site) => {
    site.process(
      ['.yaml', '.yml', '.njk'], 
      (page: Page) => {
        console.info(`ℹ️ Processing file: ${JSON.stringify(page.src)}`)
      }
    )
  };
}
