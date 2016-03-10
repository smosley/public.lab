cls_ko09AppFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09AppFunctions
  ///     tags: komodo, userscript, class,
  ///     seealso:
  ///       - href="smartpath://mymedia/2014/git/github/public.lab/demo/komodo09.demo/devlog.txt"
  ///     desc: |
  ///         ko09AppFunctions
  /// <end-class_info>


  this.App_getKoDirsDirectory = function(keyname){
    /**
      Return a koDirs directory path based on the supplied keyname.
       */
    
    var vout  =   '';
    try{
      vout = Components.
        classes['@activestate.com/koDirs;1'].
        getService(Components.interfaces.koIDirs)[keyname];
    }catch(exx){}
    return(vout);
    
  }
  //endfunction
  
  this.App_getPlatform = function(){
    /**
      return the system platform this app is running under
       */
    
    // init
    var vout  =   '';
    //;;
    
    // main
    vout      =   Components.
      classes["@mozilla.org/xre/app-info;1"].
      getService(Components.interfaces.nsIXULRuntime).
      OS.
      toString()
      ;
    //;;
    
    // return
    return(vout);
    //;;
    
  }
  //endfunction
  
  this.App_getRegister = function(arg1){
    /**
      return the value of a komodo register
      this uses a komodo component to simulate vim-style registers
      
      Components.classes['@activestate.com/koPrefService;1']
            .getService(Components.interfaces.koIPrefService)
            .prefs
            ;
       */
    
    // init
    var vout;
    var regis = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
    pref_name = 'koRegister'+arg1.toString();
    //;;
              
    // getRegister
    if (regis.hasStringPref(pref_name)) {
      vout = regis.getStringPref(pref_name);
    } else {
      vout = '';
    }
    //;;
    
    // return
    return vout;
    //;;
    
  }
  //endfunction
  
  this.App_lsBufPaths = function(){
    /**
      return js array of paths of all open CurrentBuffers
       */
    
    // init
    var filePaths = [];
    var editorViews = ko.views.manager.getAllViews();
    //;;
    
    // process
    for (let editorView of editorViews)
    {
      filePaths.push(editorView.koDoc.file.path);
    }
    //;;
    
    // return
    vout  = filePaths;        
    return vout;
    //;;
    
  }
  //endfunction
  
  this.App_setRegister = function(arg1,arg2){
    /**
      set the value of a komodo register
      this uses a komodo component to simulate vim-style registers
      
      Components.classes['@activestate.com/koPrefService;1']
            .getService(Components.interfaces.koIPrefService)
            .prefs
            ;
       */
    
    // init
    var vout;
    var regis = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
    pref_name = 'koRegister'+arg1.toString();
    pref_valu = arg2.toString();
    //;;
              
    // getRegister
    regis.setStringPref(pref_name, pref_valu);
    //;;
    
    // return
    // return vout;
    //;;      
    
  }
  //endfunction
  
  this.App_writeKoLogs = function(message){
    /**
      write a string message to the komodo log
       */
    
    //TODO: NO_WORKY fix this, it does not seem to work correctly
    var consoleService = Components.
          classes['@mozilla.org/consoleservice;1'].
          getService(Components.interfaces.nsIConsoleService);
    consoleService.logStringMessage(message);
    
  }
  //endfunction
  
  this.App_writeKoStatus = function(message){
    /**
      write a string message to the status bar
       */
    
    StatusBar_AddMessage(message, "debugger", 5000, true);     
    
  }
  //endfunction
  
}
//endclass


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


cls_ko09StrFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09StrFunctions
  ///     tags: komodo, userscript, class,
  ///     seealso:
  ///       - href="smartpath://mymedia/2014/git/github/public.lab/demo/komodo09.demo/devlog.txt"
  ///     desc: |
  ///         ko09StrFunctions
  /// <end-class_info>


  this.Str_spaceSqueeze = function(raw){
    /**
      return string transformation: reduce all whitespace to single spaces
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   vout.toString().split(/[\s\t]+/).join('_');
    return vout;
    
  }
  //endfunction
  
  this.Str_spacesToUnderscore = function(raw){
    /**
      return string transformation: convert spaces to underscore
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   vout.toString().split(/[\s\t]+/).join('_');
    return vout;
    
  }
  //endfunction
  
  this.Str_toLowerCase = function(raw){
    /**
      return string transformation: toLowerCase
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   vout.toLowerCase();
    return vout;
    
  }
  //endfunction
  
  this.Str_toUcfirst = function(raw){
    /**
      return string transformation: uppercase first letter of first word
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   vout.toLowerCase();
    vout    =   (vout + '').charAt(0).toUpperCase() + vout.substr(1);
    return vout;
    
  }
  //endfunction
  
  this.Str_toUpperCase = function(raw){
    /**
      return string transformation: toUpperCase
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   vout.toUpperCase();
    return vout;
    
  }
  //endfunction
  
  this.Str_underscoreToSpaces = function(raw){
    /**
      return string transformation: convert underscore to spaces
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   vout.split(/[_]+/).join(' ');
    return vout;
    
  }
  //endfunction
  
  this.Str_wordsUpperCase = function(raw){
    /**
      return string transformation: Uppercase upcase first letter of words in string
       */
    
    if(!raw){raw = this.Buf_getSelection(true);}
    vout    =   raw;
    vout    =   (vout+'').replace(/^(.)|\s(.)/g, function( $1 ){return $1.toUpperCase( );} );
    return vout;
    
  }
  //endfunction
  
}
//endclass


cls_ko09GuiFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09GuiFunctions
  ///     tags: komodo, userscript, class,
  ///     seealso:
  ///       - href="smartpath://mymedia/2014/git/github/public.lab/demo/komodo09.demo/devlog.txt"
  ///     desc: |
  ///         ko09GuiFunctions
  /// <end-class_info>


  this.Gui_get = function(items){
    /**
      quickly choose an item from a list. Short name. One argument. No fluff.
       */
    
    var vtest;
    var vtitle = 'Choose one';
    vtest   =   this.guiQuickList(vtitle,vtitle,items,'one');
    return vtest;
    
  }
  //endfunction
  
  this.Gui_inputBox = function(title,prompt,vlabel,vdefault,mruName){
    /**
      Get input from a text inputbox.
       */
    
    var vout = ko.dialogs.prompt(prompt, vlabel, vdefault, title, mruName);
    return vout;
    
  }
  //endfunction
  
  this.Gui_quickList = function(title,prompt,items,selectionCondition,mruName){
    /**
      Get quick input based on a list of choices.
       */
    
    var selopt  =   selectionCondition || 'one-or-more';
    var vtest   =   ko.dialogs.selectFromList(title, prompt, items, selectionCondition);
    return vtest;
    
  }
  //endfunction
  
  this.Gui_statusLog = function(vtext,itime){
    /**
      log a message to the GUI status bar
       */
    
    ko.statusBar.addMessage(vtext, "alert", itime, true);
    
  }
  //endfunction
  
  this.Gui_yesNoCancel = function(stitle){
    /**
      present a yes-no-cancel dialog
       */
    
    var vout = ko.dialogs.yesNoCancel(stitle);
    return(vout);  
    
  }
  //endfunction
  
}
//endclass


