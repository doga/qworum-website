import lume from 'lume/mod.ts';
import minifyHTML from "lume/plugins/minify_html.ts";
import sitemap from 'lume/plugins/sitemap.ts';
// import date from "lume/plugins/date.ts"; // for displaying file creation time, but not site update time!
import resolveUrls from "lume/plugins/resolve_urls.ts";

// https://deno.land/x/date_format_deno@v1.1.0
import { dateToString } from "https://deno.land/x/date_format_deno@v1.1.0/mod.ts"; 

// my addons
// import info from './addons/my/log/mod.ts';
import langdata from 'lume_langdata/mod.ts'; // my published lume plugin
import navbardata from 'lume_navbardata/mod.ts'; // my published lume plugin
// import * as crossLanguageContent from './lume-addons/my/cross-language-content/mod.ts';
import * as lume_cross_language_content from 'lume_cross_language_content/mod.ts';
const
src  = './src',
dest = './build';

export default
lume({
  src, dest,
  location: new URL('https://qworum.net'),
  server  : {open: true}
})

// Copy static files
.copy('index.html')
.copy('languages.json') // generated by the langdata plugin
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
  () => dateToString('yyyy', new Date()), 
  { type: "tag" }
)  // Example: {% siteUpdateYear %}

// my plugins and processors
// .use(info())
.use(langdata())
.use(navbardata())
// .process(['.yaml', '.njk'], (page) => {
//   console.info(`page.src: ${JSON.stringify(page.src)}`)
// })

.use(resolveUrls())
.use(sitemap())
.use(minifyHTML())
// .addEventListener(
//   "afterBuild",
//   crossLanguageContent.createAfterBuildListener(src, dest)
// )
.addEventListener(
  "afterBuild",
  lume_cross_language_content.createAfterBuildListener(src, dest)
)
;
