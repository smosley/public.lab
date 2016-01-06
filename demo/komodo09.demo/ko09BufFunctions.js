
cls_ko09BufFunctions = function(){
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
