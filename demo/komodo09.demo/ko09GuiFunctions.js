
cls_ko09GuiFunctions = function(){
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
