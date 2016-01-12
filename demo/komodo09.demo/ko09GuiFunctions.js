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


