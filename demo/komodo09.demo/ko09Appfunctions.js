
cls_ko09AppFunctions = function(){
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
