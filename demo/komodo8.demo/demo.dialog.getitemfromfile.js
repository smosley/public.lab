// <beg-file_info>
// main:
//   - date: created="Sun Aug 30 13:31:50 2015"
//     last: lastmod="Sun Aug 30 13:31:50 2015"
//     tags:   dialog, gui, input
//     dreftymacid:    "uruapan_vega_plastic"
//     seealso: |
//         *
//     desc: |
//          k8 macro to display a dialog box presenting the user with a list of keywords
//          from which to choose
//
//          get the list of keywords from a file
//          
// <end-file_info>

// init
komodo.assertMacroVersion(3);

//  <reg-fdef ddef=" ioStringFromFile(filename) ;; get contents of entire text file into a single string. return the string">
ioStringFromFile = function(filename){
  /**
    * Function: ioStringFromFile(filename)
    *   Get the contents of a text file as a single string, return the string.
    *
    * Parameters:
    *   filename  - (string) path of input file
    */
    var file    =   Components.classes["@activestate.com/koFileEx;1"].createInstance(Components.interfaces.koIFileEx);
    file.path   =   filename;
    file.open("r");
    var content = file.readfile();
    return content;
}
//  </reg-fdef>

//  <reg-fdef ddef=" ioArrayFromFile(filename) ;; get file as array of lines. return the array. ">
ioArrayFromFile = function(filename){
  /**
    * Function: ioArrayFromFile(filename)
    *   Get the contents of a text file as an array of lines, return the array.
    */
    var content = ioStringFromFile(filename);
    content     = content.split(/\r|\n|\r\n|\n\r/);
    return content;
}
//  </reg-fdef>

//  <reg-fdef ddef=" textAreaInsertAsText(vtext) ;; insert regular no-frills plain text ">
textAreaInsertAsText = function(vtext){
  /**
    * Function: textAreaInsertAsText
    *   Insert plain text into the current edit buffer.
    */
  komodo.view.selection = vtext;
}
//  </reg-fdef>

//  <reg-fdef ddef=" guiQuickList(title, prompt, items, selectionCondition) ;; get quick input based on a list of choices ">
guiQuickList = function(title, prompt, items, selectionCondition){
  /**
    * Function: guiQuickList
    * Description: | 
    *   Get quick input based on a list of choices.
    *
    * Parameters: | 
    *   title - (string) dialog title
    *   prompt - (string) dialog prompt
    *   items  - (var) input items for populating the list
    *   selectionCondition  - (string) string option for describing how many items may be selected
    *
    *   
    *    *selectionCondition* is a string describing how items may be selected
    *        in order for the dialog OK button to be enabled.
    *
    *        The following may be used to specify selectionCondition:
    *            "one-or-more" (the default) requires that one or more items be
    *                selected. By default all items will be selected.
    *            "zero-or-more" allows any number of items to be selected. By
    *                default all items will be selected.
    *            "one" only allows exactly one to be selected. By default the first
    *                item will be selected.
    *
    *
    * CodeExample: | 
    *     var komain = new tymac_komodo_addon();
    *     var vitems = '';
    *     var vout;
    *     
    *     //simple example
    *     vitems  =   'alpha bravo charlie delta'.split(/\s+/);
    *     vout    =   guiQuickList('title','prompt',vitems,'one');
    *     alert(JSON.stringify(vout));
    *     
    *     //example using simpletable aoh
    *     vitems  =   [{'text':'alpha','id':1},{'text':'bravo','id':2},{'text':'charlie','id':3}];
    *     vout    =   guiQuickList('title','prompt',vitems,'one');
    *     alert(JSON.stringify(vout));
    *     
    *
    * Returns: | 
    *   var - user choice or NULL if the user did not make a choice
    */
    var selopt  =   selectionCondition || 'one-or-more';
    var vout   =   ko.dialogs.selectFromList(title, prompt, items, selectionCondition);
    return vout;
}
//  </reg-fdef>

// demo example
vinfile   =   "c:/sm/docs/mytrybits/m/trymyclip/txt/list_milname_basic.txt";
vlist     =   ioArrayFromFile(vinfile);
vout      =   guiQuickList('title','prompt',vlist,'one');
if (vout){textAreaInsertAsText(vout);}
