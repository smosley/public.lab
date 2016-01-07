cls_ko09AppFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09AppFunctions
  ///     tags: komodo, userscript, class,  
  ///     desc: |
  ///         ko09AppFunctions
  /// <end-class_info>


  this.App_getRegister = function(arg1){
    
        // init
        var vout;
        var regis = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
        pref_name = 'koTmpReg0'+arg1.toString();
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
  
  this.App_setRegister = function(arg1,arg2){
    
        // init
        var vout;
        var regis = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
        pref_name = 'koTmpReg0'+arg1.toString();
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
  
  this.App_getPlatform = function(){
    
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
  
  this.App_getKoDirsDirectory = function(keyname){
    
        var vout  =   '';
        try{
          vout = Components.
            classes['@activestate.com/koDirs;1'].
            getService(Components.interfaces.koIDirs)[keyname];
        }catch(exx){}
        return(vout);
        
  }
  //endfunction
  
  this.App_writeKoLogs = function(message){
    
        //TODO: NO_WORKY fix this, it does not seem to work correctly
        var consoleService = Components.
              classes['@mozilla.org/consoleservice;1'].
              getService(Components.interfaces.nsIConsoleService);
        consoleService.logStringMessage(message);
        
  }
  //endfunction
  
  this.App_writeKoStatus = function(message){
    
        StatusBar_AddMessage(message, "debugger", 5000, true);     
        
  }
  //endfunction
  
  this.App_lsBufPaths = function(){
    
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
  

}
//endclass
cls_ko09BufFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09BufFunctions
  ///     tags: komodo, userscript, class,  
  ///     desc: |
  ///         ko09BufFunctions
  /// <end-class_info>


  this.Buf_focus = function(){
    
        //
        komodo.assertMacroVersion(3);
        if(komodo.view && komodo.view.scintilla){ komodo.view.scintilla.focus(); }
        
  }
  //endfunction
  
  this.Buf_getFilePath = function(){
    
        // return
        return komodo.interpolate('%F');
        
  }
  //endfunction
  
  this.Buf_getFileParentDir = function(){
    
        // return
        return komodo.interpolate('%D');
        
  }
  //endfunction
  
  this.Buf_getLineColumn = function(){
    
        // return
        return (komodo.editor.getColumn(komodo.editor.currentPos)+1);    
        
  }
  //endfunction
  
  this.Buf_getLineNumber = function(){
    
        // return
        return komodo.interpolate('%L');
        
  }
  //endfunction
  
  this.Buf_getLineText = function(){
    
        // Buf_focus();
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
  //endfunction
  
  this.Buf_getSelection = function(bforce){
    
        // Buf_focus();
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
  //endfunction
  
  this.Buf_getSubLanguage = function(){
    
        // return
        return ko.views.manager.currentView.document.subLanguage;
        
  }
  //endfunction
  
  this.Buf_getLanguage = function(){
    
        // return
        return ko.views.manager.currentView.document.language;
        
  }
  //endfunction
  

}
//endclass
cls_ko09StrFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09StrFunctions
  ///     tags: komodo, userscript, class,  
  ///     desc: |
  ///         ko09StrFunctions
  /// <end-class_info>


  this.Str_toUcfirst = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toLowerCase();
        vout    =   (vout + '').charAt(0).toUpperCase() + vout.substr(1);
        return vout;
        
  }
  //endfunction
  
  this.Str_toLowerCase = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toLowerCase();
        return vout;
        
  }
  //endfunction
  
  this.Str_toUpperCase = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toUpperCase();
        return vout;              
        
  }
  //endfunction
  
  this.Str_wordsUpperCase = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   (vout+'').replace(/^(.)|\s(.)/g, function( $1 ){return $1.toUpperCase( );} );
        return vout;
        
  }
  //endfunction
  
  this.Str_spacesToUnderscore = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toString().split(/[\s\t]+/).join('_');
        return vout;
        
  }
  //endfunction
  
  this.Str_underscoreToSpaces = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.split(/[_]+/).join(' ');
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
  ///     desc: |
  ///         ko09GuiFunctions
  /// <end-class_info>


  this.Gui_get = function(items){
    
        var vtest;
        var vtitle = 'Choose one';
        vtest   =   this.guiQuickList(vtitle,vtitle,items,'one');
        return vtest;
        
  }
  //endfunction
  
  this.Gui_quickList = function(title,prompt,items,selectionCondition,mruName){
    
        var selopt  =   selectionCondition || 'one-or-more';
        var vtest   =   ko.dialogs.selectFromList(title, prompt, items, selectionCondition);
        return vtest;
        
  }
  //endfunction
  
  this.Gui_inputBox = function(title,prompt,vlabel,vdefault,mruName){
    
        var vout = ko.dialogs.prompt(prompt, vlabel, vdefault, title, mruName);
        return vout;
        
  }
  //endfunction
  
  this.Gui_statusLog = function(vtext,itime){
    
        ko.statusBar.addMessage(vtext, "alert", itime, true);
        
  }
  //endfunction
  
  this.Gui_yesNoCancel = function(stitle){
    
        var vout = ko.dialogs.yesNoCancel(stitle);
        return(vout);  
        
  }
  //endfunction
  

}
//endclass
cls_ko09AppFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09AppFunctions
  ///     tags: komodo, userscript, class,  
  ///     desc: |
  ///         ko09AppFunctions
  /// <end-class_info>


  this.App_getRegister = function(arg1){
    
        // init
        var vout;
        var regis = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
        pref_name = 'koTmpReg0'+arg1.toString();
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
  
  this.App_setRegister = function(arg1,arg2){
    
        // init
        var vout;
        var regis = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
        pref_name = 'koTmpReg0'+arg1.toString();
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
  
  this.App_getPlatform = function(){
    
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
  
  this.App_getKoDirsDirectory = function(keyname){
    
        var vout  =   '';
        try{
          vout = Components.
            classes['@activestate.com/koDirs;1'].
            getService(Components.interfaces.koIDirs)[keyname];
        }catch(exx){}
        return(vout);
        
  }
  //endfunction
  
  this.App_writeKoLogs = function(message){
    
        //TODO: NO_WORKY fix this, it does not seem to work correctly
        var consoleService = Components.
              classes['@mozilla.org/consoleservice;1'].
              getService(Components.interfaces.nsIConsoleService);
        consoleService.logStringMessage(message);
        
  }
  //endfunction
  
  this.App_writeKoStatus = function(message){
    
        StatusBar_AddMessage(message, "debugger", 5000, true);     
        
  }
  //endfunction
  
  this.App_lsBufPaths = function(){
    
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
  

}
//endclass


cls_ko09BufFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09BufFunctions
  ///     tags: komodo, userscript, class,  
  ///     desc: |
  ///         ko09BufFunctions
  /// <end-class_info>


  this.Buf_focus = function(){
    
        //
        komodo.assertMacroVersion(3);
        if(komodo.view && komodo.view.scintilla){ komodo.view.scintilla.focus(); }
        
  }
  //endfunction
  
  this.Buf_getFilePath = function(){
    
        // return
        return komodo.interpolate('%F');
        
  }
  //endfunction
  
  this.Buf_getFileParentDir = function(){
    
        // return
        return komodo.interpolate('%D');
        
  }
  //endfunction
  
  this.Buf_getLineColumn = function(){
    
        // return
        return (komodo.editor.getColumn(komodo.editor.currentPos)+1);    
        
  }
  //endfunction
  
  this.Buf_getLineNumber = function(){
    
        // return
        return komodo.interpolate('%L');
        
  }
  //endfunction
  
  this.Buf_getLineText = function(){
    
        // Buf_focus();
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
  //endfunction
  
  this.Buf_getSelection = function(bforce){
    
        // Buf_focus();
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
  //endfunction
  
  this.Buf_getSubLanguage = function(){
    
        // return
        return ko.views.manager.currentView.document.subLanguage;
        
  }
  //endfunction
  
  this.Buf_getLanguage = function(){
    
        // return
        return ko.views.manager.currentView.document.language;
        
  }
  //endfunction
  

}
//endclass


cls_ko09StrFunctions = function(){
  /// <beg-class_info>
  /// main:
  ///   - name: cls_ko09StrFunctions
  ///     tags: komodo, userscript, class,  
  ///     desc: |
  ///         ko09StrFunctions
  /// <end-class_info>


  this.Str_toUcfirst = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toLowerCase();
        vout    =   (vout + '').charAt(0).toUpperCase() + vout.substr(1);
        return vout;
        
  }
  //endfunction
  
  this.Str_toLowerCase = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toLowerCase();
        return vout;
        
  }
  //endfunction
  
  this.Str_toUpperCase = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toUpperCase();
        return vout;              
        
  }
  //endfunction
  
  this.Str_wordsUpperCase = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   (vout+'').replace(/^(.)|\s(.)/g, function( $1 ){return $1.toUpperCase( );} );
        return vout;
        
  }
  //endfunction
  
  this.Str_spacesToUnderscore = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.toString().split(/[\s\t]+/).join('_');
        return vout;
        
  }
  //endfunction
  
  this.Str_underscoreToSpaces = function(raw){
    
        if(!raw){raw = this.TextArea_getSelection(true);}
        vout    =   raw;
        vout    =   vout.split(/[_]+/).join(' ');
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
  ///     desc: |
  ///         ko09GuiFunctions
  /// <end-class_info>


  this.Gui_get = function(items){
    
        var vtest;
        var vtitle = 'Choose one';
        vtest   =   this.guiQuickList(vtitle,vtitle,items,'one');
        return vtest;
        
  }
  //endfunction
  
  this.Gui_quickList = function(title,prompt,items,selectionCondition,mruName){
    
        var selopt  =   selectionCondition || 'one-or-more';
        var vtest   =   ko.dialogs.selectFromList(title, prompt, items, selectionCondition);
        return vtest;
        
  }
  //endfunction
  
  this.Gui_inputBox = function(title,prompt,vlabel,vdefault,mruName){
    
        var vout = ko.dialogs.prompt(prompt, vlabel, vdefault, title, mruName);
        return vout;
        
  }
  //endfunction
  
  this.Gui_statusLog = function(vtext,itime){
    
        ko.statusBar.addMessage(vtext, "alert", itime, true);
        
  }
  //endfunction
  
  this.Gui_yesNoCancel = function(stitle){
    
        var vout = ko.dialogs.yesNoCancel(stitle);
        return(vout);  
        
  }
  //endfunction
  

}
//endclass


