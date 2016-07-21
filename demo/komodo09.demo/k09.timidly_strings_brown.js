// <beg-file_info>
// main:
//   - date: created="Mon Nov 30 19:12:02 2015"
//     last: lastmod="Mon Nov 30 19:12:02 2015"
//     tags: koCurrentBufferString, komodo, K09
//     author: created="dreftymac"
//     dreftymacid: "timidly_strings_brown"
//     seealso: |
//         * href="smartpath://mymedia/2014/git/github/public.lab/demo/komodo09.demo/k09.timidly_strings_brown.js"
//     desc: |
//          KO CurrentBuffer TextArea Getter Methods
//          Different ways to get stuff from the currently-active text buffer
// <end-file_info>

koCurrentBufferString = function(){  
  this.CurrentBuffer_getFilePath = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 18:57:01 2015"
    //     last: lastmod="Mon Nov 30 18:57:01 2015"
    //     funcname: "CurrentBuffer_getFilePath"
    //     funcdesc: |
    //           get the filepath of the CurrentBuffer
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; the fullpath of the CurrentBuffer
    //     funcdetails: | 
    //          
    //     dreftymacid: alert_pilots_ego
    //     tags: CurrentBuffer, get, string, YES_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>      
    return komodo.interpolate('%F');
  }
  //endfunction

  this.CurrentBuffer_getFileParentDir = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 18:57:01 2015"
    //     last: lastmod="Mon Nov 30 18:57:01 2015"
    //     funcname: "CurrentBuffer_getFileParentDir"
    //     funcdesc: |
    //           get CurrentBuffer parent dir
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; the parent directory of the CurrentBuffer
    //     funcdetails: | 
    //          
    //     dreftymacid: flu_robe_reclaim
    //     tags: CurrentBuffer, get, string, YES_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>  
    return komodo.interpolate('%D');
  }
  //endfunction

  this.CurrentBuffer_getLineColumn = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 19:00:48 2015"
    //     last: lastmod="Mon Nov 30 19:00:48 2015"
    //     funcname: "CurrentBuffer_getLineColumn"
    //     funcdesc: |
    //           get current cursor column of the CurrentBuffer
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; current cursor column of the CurrentBuffer
    //     funcdetails: | 
    //          Returns the one-based index instead of zero-based index
    //     dreftymacid: glowing_gotcha_mineral
    //     tags: CurrentBuffer, get, string, YES_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>      
    return (komodo.editor.getColumn(komodo.editor.currentPos)+1);
  }
  //endfunction

  this.CurrentBuffer_getLineNumber = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 19:04:13 2015"
    //     last: lastmod="Mon Nov 30 19:04:13 2015"
    //     funcname: "CurrentBuffer_getLineNumber"
    //     funcdesc: |
    //           get current cursor line number of the CurrentBuffer
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; current cursor line number of the CurrentBuffer
    //     funcdetails: | 
    //          
    //     dreftymacid: axe_celia_flown
    //     tags: CurrentBuffer, get, string, YES_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>
    return komodo.interpolate('%L');
  }
  //endfunction

  this.CurrentBuffer_getLineText = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 19:06:16 2015"
    //     last: lastmod="Mon Nov 30 19:06:16 2015"
    //     funcname: "CurrentBuffer_getLineText"
    //     funcdesc: |
    //           get the full text on the current cursor line of the CurrentBuffer
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; the full text on current cursor line of the CurrentBuffer
    //     funcdetails: |
    //        ## Dependencies
    //        * this.CurrentBuffer_focus()
    //
    //        ## Development notes
    //        There may be a different approach for selecting the current line
    //        found this from [[google://"text of the current line" komodo]]
    //        http://www.weirdlooking.com/blog/92/abbr.kpf
    //        komodo.doCommand('cmd_end');
    //        var view      =   ko.views.manager.currentView;
    //        var line      =   view.scimoz.lineFromPosition(view.scimoz.currentPos);
    //        var lineStart =   view.scimoz.positionFromLine(line);
    //        alert(line);
    //        alert(lineStart);
    //        var lineText  =   view.scimoz.getTextRange(lineStart, view.scimoz.currentPos);
    //        return lineText;
    //
    //     dreftymacid: arian_austria_nasal
    //     tags: CurrentBuffer, get, string, YES_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>
    
    // CurrentBuffer_focus();
    if(komodo.view && komodo.view.scintilla){ komodo.view.scintilla.focus(); }
    //;;
    
    // init
    var vout        =   '';
    var savepos     =   komodo.editor.currentPos;
    try{
        komodo.doCommand('cmd_end');
        komodo.doCommand('cmd_selectHome'); // do it twice in order to capture leading whitespace
        komodo.doCommand('cmd_selectHome');
        new_selection = komodo.interpolate('%s');
        vout = (new_selection);
        komodo.editor.gotoPos(savepos);
    }catch(exx){}
    //;;
    
    // return
    return vout;    
  }
  // endfunction

  this.CurrentBuffer_getSelection = function(bforce){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 19:14:26 2015"
    //     last: lastmod="Mon Nov 30 19:14:26 2015"
    //     funcname: "CurrentBuffer_getSelection"
    //     funcdesc: |
    //           get currently seleted text (if any). force one if bforce is true
    //     funcparams: 
    //          - bforce ;; boolean ;; True or False ... force a selection if True
    //     funcreturns: 
    //          - string ;; currently selected text, if there is any
    //     funcdetails: | 
    //          __funcdetails__
    //     dreftymacid: alms_wimpiest_audrey
    //     tags: CurrentBuffer, get, string, YES_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>
      
    // CurrentBuffer_focus();
    if(komodo.view && komodo.view.scintilla){ komodo.view.scintilla.focus(); }
    //;;
    
    // init
    var selection = '';
    try{
        selection = ko.views.manager.currentView.selection;
    }catch(exx){}
    try{
        if(selection=='' && bforce){
            komodo.doCommand('cmd_selectWordLeft');
            selection = ko.views.manager.currentView.selection;
        };
    }catch(exx){};
    //;;
    
    //return
    return selection;
  }
  // endfunction

  this.CurrentBuffer_getSubLanguage = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 19:16:45 2015"
    //     last: lastmod="Mon Nov 30 19:16:45 2015"
    //     funcname: "CurrentBuffer_getSubLanguage"
    //     funcdesc: |
    //           get the current syntax language at the current cursor position 
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; the current syntax sub-language at the current cursor position
    //     funcdetails: | 
    //          __funcdetails__
    //     dreftymacid: planing_bengal_niche
    //     tags: CurrentBuffer, get, string, NO_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>    
    return ko.views.manager.currentView.document.subLanguage;
  }
  // endfunction

  this.CurrentBuffer_getLanguage = function(){
    // <beg-function_docs>
    //   - date: created="Mon Nov 30 19:17:52 2015"
    //     last: lastmod="Mon Nov 30 19:17:52 2015"
    //     funcname: "CurrentBuffer_getLanguage"
    //     funcdesc: |
    //           get the current syntax language for the entire buffer
    //     funcparams: 
    //          
    //     funcreturns: 
    //          - string ;; the current syntax language for the entire CurrentBuffer
    //     funcdetails: | 
    //          
    //     dreftymacid: tribe_awe_unpin
    //     tags: CurrentBuffer, get, string, NO_WORKY
    //     seealso: |
    //         *
    // <end-function_docs>
    
    // return
    return ko.views.manager.currentView.document.language;
  }
  // endfunction
}
//endclass

if(!! 'test_this_out'){
  app = new koCurrentBufferString();
  alert( app.CurrentBuffer_getLineNumber() );  
}
