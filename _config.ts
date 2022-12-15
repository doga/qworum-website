import lume from 'lume/mod.ts';
import minifyHTML from "lume/plugins/minify_html.ts";
import sitemap from 'lume/plugins/sitemap.ts';
import date from "lume/plugins/date.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";

// https://deno.land/x/date_format_deno@v1.1.0
import { dateToString } from "https://deno.land/x/date_format_deno/mod.ts"; 

export default
lume({
  location: new URL('https://qworum.net'),
  src     : './src',
  dest    : './build',
  server  : {open: true}
})
.copy('index.html')
.copy('assets')
.copy('docs')
.use(date({formats: {YEAR: 'yyyy'}}))
.use(resolveUrls())
.helper("siteUpdateYear", () => {const now = new Date(); return dateToString('yyyy', now);}, { type: "tag" })
// .filter("encodeURIComponent", (uriComponent) => encodeURIComponent(uriComponent))
.use(sitemap())
.use(minifyHTML())
;
