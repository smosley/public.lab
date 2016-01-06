
cls_ko09StrFunctions = function(){
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
