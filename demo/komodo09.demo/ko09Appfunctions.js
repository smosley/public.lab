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


