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


