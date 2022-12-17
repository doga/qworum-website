import lume from 'lume/mod.ts';
import minifyHTML from "lume/plugins/minify_html.ts";
import sitemap from 'lume/plugins/sitemap.ts';
// import date from "lume/plugins/date.ts"; // for displaying file creation time, but not site update time!
import resolveUrls from "lume/plugins/resolve_urls.ts";

// https://deno.land/x/date_format_deno@v1.1.0
import { dateToString } from "https://deno.land/x/date_format_deno@v1.1.0/mod.ts"; 

// my plugins
import info from './plugins/my/log.ts';

export default
lume({
  location: new URL('https://qworum.net'),
  src     : './src',
  dest    : './build',
  server  : {open: true}
})

// Copy static files
.copy('index.html')
.copy('assets')
.copy('docs')

// New Nunjucks filters
// .use(date(
//   {formats: {YEAR: 'yyyy'}}
// )) // Example: {{ date | date('YEAR') }}
// .filter("encodeURIComponent", (uriComponent) => encodeURIComponent(uriComponent)) // Example: {{ encodeURIComponent('développeur') }}

// New Nunjucks tags
.helper(
  "siteUpdateYear", 
  () => {
    const now = new Date(); 
    return dateToString('yyyy', now);
  }, 
  { type: "tag" }
)  // Example: {% siteUpdateYear %}

// my plugins and processors
// .use(info())
// .process(['.yaml', '.njk'], (page) => {
//   console.info(`page.src: ${JSON.stringify(page.src)}`)
// })

.use(resolveUrls())
.use(sitemap())
.use(minifyHTML())
;
