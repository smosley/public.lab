//
guiGetArgs  = function(aryParams){
  /** 
    * <beg-function_docs>
    * main:
    *   - date: created="Sat Aug 29 21:09:17 2015"
    *     last: lastmod="Sat Aug 29 21:09:17 2015"
    *     name:   guiGetArgs
    *     tags:   komodo, k8, macro, gui, userinput
    *     author:         created="dreftymac"
    *     dreftymacid:    "lairoxu_latrop"
    *     seealso: |
    *         *
    *     desc: |
    *         present the user with a gui dialog requesting args 
    *     example: |
    *         present the user with a gui dialog requesting args 
    *         
    * <end-function_docs>  
    */ 
  // init
  var argdelim  =   ';;;';
  var strinput  =   aryParams.join(argdelim)
  var vtemp     =   ko.interpolate.interpolateStrings([strinput]);
  
  // process
  if (vtemp){vtemp = vtemp.split(argdelim)}else{vtemp = undefined; /* user must have cancelled */}
  
  // return
  vout = vtemp;
  return vout;
}
// guiGetArgs
