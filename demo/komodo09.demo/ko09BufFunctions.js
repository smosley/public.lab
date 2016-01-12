cls_ko09BufFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09BufFunctions
  ///     tags: komodo, userscript, class,
  ///     seealso:
  ///       - href="smartpath://mymedia/2014/git/github/public.lab/demo/komodo09.demo/devlog.txt"
  ///     desc: |
  ///         ko09BufFunctions
  /// <end-class_info>


  this.Buf_focus = function(){
    /**
      set focus on a buffer, making it the CurrentBuffer
       */
    
    //
    komodo.assertMacroVersion(3);
    if(komodo.view && komodo.view.scintilla){ komodo.view.scintilla.focus(); }
    
  }
  //endfunction
  
  this.Buf_getFileParentDir = function(){
    /**
      get CurrentBuffer parent dir
       */
    
    // return
    return komodo.interpolate('%D');
    
  }
  //endfunction
  
  this.Buf_getFilePath = function(){
    /**
      get the filepath of the CurrentBuffer
       */
    
    // return
    return komodo.interpolate('%F');
    
  }
  //endfunction
  
  this.Buf_getLanguage = function(){
    /**
      * NO_WORKY as of 2016-01-11T14:30:24
      * TypeError: ko.views.manager.currentView.document is undefined
      * get the current syntax language for the entire buffer
       */
    
    // return
    return ko.views.manager.currentView.document.language;
    
  }
  //endfunction
  
  this.Buf_getLineColumn = function(){
    /**
      get current cursor column of the CurrentBuffer
       */
    
    // return
    return (komodo.editor.getColumn(komodo.editor.currentPos)+1);    
    
  }
  //endfunction
  
  this.Buf_getLineNumber = function(){
    /**
      get current cursor line number of the CurrentBuffer
       */
    
    // return
    return komodo.interpolate('%L');
    
  }
  //endfunction
  
  this.Buf_getLineText = function(){
    /**
      get the full text on the current cursor line of the CurrentBuffer
       */
    
    // Buf_focus();
    this.Buf_focus();
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
  //endfunction
  
  this.Buf_getSelection = function(bforce){
    /**
      get currently seleted text (if any). force one if bforce is true
       */
    
    // 
    this.Buf_focus();            
    var selection = '';
    //;;
    
    //
    try{
        selection = ko.views.manager.currentView.selection;
    }catch(exx){};
    //;;
    
    //
    try{
        if(selection=='' && bforce){
            komodo.doCommand('cmd_selectWordLeft');
            selection   =   ko.views.manager.currentView.selection;
        };
    }catch(exx){};
    //;;
    
    //
    return selection;
    //;;
     
    
  }
  //endfunction
  
  this.Buf_getSubLanguage = function(){
    /**
      get the current syntax language at the current cursor position 
       */
    
    // return
    return ko.views.manager.currentView.document.subLanguage;
    
  }
  //endfunction
  
  this.Buf_setSelection = function(vtext){
    /**
      set the value of the currently selected text in the current buffer
       */
    
    this.Buf_focus();
    komodo.view.selection = vtext;
    
  }
  //endfunction
  
}
//endclass


