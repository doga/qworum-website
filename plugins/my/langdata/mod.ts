// Lume plugin https://lume.land/docs/advanced/plugins/
// Generates language data for website multilanguage websites.
// Puts the generated data in <srcdir>/<langdir>/_data/lang.yaml.
// Also generates a list of the site's languages in <srcdir>/languages.json.
// How this plugin is useful:
// ▶︎ This data can be used in layouts. For example a layout file can contain "<!DOCTYPE html><html lang='{{ lang.code }}'> ..."
// ▶︎ /index.html can shunt the user to his/her preferred language with a JavaScript code such as fetch('/languages.json').then((response) => response.json()).then((siteLanguages) => { /*...*/ });

import * as path from "https://deno.land/std@0.167.0/path/mod.ts";
import { Site } from "https://deno.land/x/lume@v1.13.2/core.ts";
import YAML from 'https://cdn.skypack.dev/pin/yaml@v2.1.3-ntmfesRl3kdsLKTvvOl6/mode=imports,min/optimized/yaml.js';
import * as date from 'https://deno.land/std@0.160.0/datetime/mod.ts';

import {Language} from './modules/language.ts';

export default 
function () {
  return (site: Site) => {
    // console.info(`ℹ️ langdata: site: ${JSON.stringify(site)}`);

    const
    languages                 : string[] = [],
    currentWorkingDirectoryAbs: string   = site.options.cwd,
    projectSourceDirectory     : string  = site.options.src,
    projectSourceDirectoryAbs  : string  = path.resolve(currentWorkingDirectoryAbs, projectSourceDirectory);

    // console.info(`ℹ️ langdata: currentWorkingDirectoryAbs: ${currentWorkingDirectoryAbs}`);
    // console.info(`ℹ️ langdata: projectSourceDirectoryAbs: ${projectSourceDirectoryAbs}`);

    for (const dirEntry of Deno.readDirSync(projectSourceDirectoryAbs)) {
      if(!(dirEntry.isDirectory && Language.exists(dirEntry.name)))continue;

      // directory serves the site in this language: dirEntry.name

      const
      langCode: string = dirEntry.name,
      absLangDirname: string = path.resolve(projectSourceDirectoryAbs, langCode),
      absLangDataDirname: string = path.resolve(absLangDirname, '_data');

      // ensure _data dir exists
      let absLangDataDirInfo: Deno.FileInfo;
      try {
        absLangDataDirInfo = Deno.statSync(absLangDataDirname);
      } catch (_error) {
        // _data does not exist
        Deno.mkdirSync(absLangDataDirname);
        absLangDataDirInfo = Deno.statSync(absLangDataDirname);
      }
      if(!absLangDataDirInfo.isDirectory)continue;
      // console.log(`  data dir: ${absLangDataDirname}`);

      // ensure lang.yaml file does not exist
      const langYamlFilenameAbs = path.resolve(absLangDataDirname, 'lang.yaml');
      try {
        const langYamlInfo = Deno.statSync(langYamlFilenameAbs);
        // lang.yaml exists
        if(!langYamlInfo.isFile)continue;
        Deno.removeSync(langYamlFilenameAbs);
      } catch (_error) {
        // lang.yaml does not exist
      }

      // write lang.yaml
      try {
        const
        now       = new Date(),
        timestamp = date.format(now, "yyyy-MM-dd"),
        langData  = {code: langCode },
        yaml      = YAML.stringify(langData);

        if(!yaml)throw new Error('');

        Deno.writeTextFileSync(
          langYamlFilenameAbs,
          `# This file was automatically generated at build time
# on ${timestamp} by the "langdata" Lume plugin.
${yaml}`);
      } catch (_error) {
        // should never happen
      }

      languages.push(langCode);
    }

    // write <srcdir>/languages.json
    const langsFilenameAbs : string = path.resolve(projectSourceDirectoryAbs, 'languages.json');
    try {
      const langsFilenameInfo: Deno.FileInfo = Deno.statSync(langsFilenameAbs);
      // <srcdir>/languages.json exists
      if(!langsFilenameInfo.isFile)return;
      Deno.removeSync(langsFilenameAbs);
    } catch (_error) {
      // <srcdir>/languages.json does not exist
    }
    try {
      Deno.writeTextFileSync(langsFilenameAbs, JSON.stringify(languages));
    } catch (_error) {
      console.error(`Error when writing languages file: ${langsFilenameAbs}`);
    }

  };
}
