/// <beg-file_info>
/// main:
///   - date: created="Mon Jan 11 14:24:17 2016"
///     last: lastmod="Mon Jan 11 14:24:17 2016"
///     tags:   tags 
///     dreftymacid: "reclaim_lordly_emit"
///     filetype:    "js"
///     seealso: |
///         *
///     desc: |
///         demo script that shows how to do "include-by-reference"
///         with js library classes
///         this is useful when you want to use a standalone library
///         with a komodo userscript (such as php.js)
///         the trick to making this work is to use komodo.findPart with string-eval
/// <end-file_info>

// init script
komodo.assertMacroVersion(3);
eval(komodo.findPart('macro', "allKo09JsClass", 'container').value); // gayety_celtic_alway

// init objects
oBuffer   =   new cls_ko09BufFunctions();
oapp      =   new cls_ko09AppFunctions();
alert( oBuffer.Buf_getFilePath() );
//alert( oBuffer.Buf_getLanguage() );
alert( oapp.App_lsBufPaths() );
