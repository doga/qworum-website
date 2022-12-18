
import { SEP, dirname, fromFileUrl } from "https://deno.land/std@0.167.0/path/mod.ts";
const
isWindows = SEP === '\\',
urlOfCurrentFile  = import.meta.url,
pathOfCurrentFile = fromFileUrl(urlOfCurrentFile),
dirOfCurrentFile  = dirname(pathOfCurrentFile)
;
// console.info(`current script file url: ${urlOfCurrentFile}`);
// console.info(`current script file path: ${pathOfCurrentFile}`);
// console.info(`current script file dir: ${dirOfCurrentFile}`);

class LanguageError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/*
 * ISO 639-1 language code
 */
type LanguageCode = string;

type LanguageEntry = {
  "639-1"   : string,
  "639-2"   : string,
  family    : string,
  name      : string,
  nativeName: string,
  wikiUrl   : string
};

type LangList = Record<LanguageCode, LanguageEntry>;

class Language {
  static languages: LangList;
  
  static {
    Language.languages =
    JSON.parse(Deno.readTextFileSync(`${dirOfCurrentFile}${SEP}language${SEP}iso_639.json`));
  }

  _code: string;
  _name: string;
  _nativeName: string;

  constructor(iso_639_1_code:string) {
    const langEntry = Language.languages[iso_639_1_code];
    if(!langEntry)throw new LanguageError(`Language code not found: ${iso_639_1_code}`);

    this._code       = iso_639_1_code;
    this._name       = langEntry.name;
    this._nativeName = langEntry.nativeName;
  }

  get code():string { return this._code; }
  get name():string { return this._name; }
  get nativeName():string { return this._nativeName;}

  static exists(iso_639_1_code:string):boolean {
    try {
      new Language(iso_639_1_code);
    } catch (_error) {
      return false;
    }
    return true;
  }
}

export type {LanguageCode, LanguageEntry};
export {LanguageError, Language};
