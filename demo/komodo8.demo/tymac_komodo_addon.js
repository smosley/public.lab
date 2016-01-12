// <beg-file_info>
// main:
//   - date:       created="Sat Jan 09 06:05:56 2010"
//     last:       lastmod="2015-03-20 03:34:17"
//     name:       tymac_komodo_addon
//     license:    Attribution-Share Alike ;; http://creativecommons.org/licenses/by-sa/3.0/us/
//     contact:    dreftymac
//     desc: |
//         tymac_komodo_addon.js
//         general-purpose addon library for use with komodoedit (version 08)
//
//         This library is mainly a wrapper around built-in komodo
//         macro functions. It is intended to make komodo macro programming
//         a little easier for people not familiar with the Komodo API.
//
//
// <end-file_info>

// begin_: init js
// ------------------------------------------------

    //CODE_SNIPPET ;; new fdef_grp section (base64 encoded)
    /*
      ICAgIC8vICA8OmZkZWZfZ3JwPiBfX2dycG5hbWVfXyA7OyBfX2dycGRlc2NfXwogICAgLy
      8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiAg
      ICBpZignZmdyb3VwJyl7CiAgICAgICAgLy8gVE9ETzogYWRkIGNvZGUgaGVyZQogICAgfS
      8vZW5kX2dycAogICAgLy8K
    */

// begin_: classdef
// ------------------------------------------------
// { <reg-cdef>


tymac_komodo_addon_library = function() {
  
  /**
    * Class: tymac_komodo_addon
    *
    * This is a general-purpose JavaScript addon library for use with komodoedit.
    *
    * This library is mainly a wrapper around built-in komodo
    * macro functions. It is intended to make komodo macro programming
    * a little easier for people who may not be familiar with the Komodo API.
    */

    // Group:  Configuration Addons
    //  ------------------------------------------------
    if('fgroup'){//ggFuncName ;; custom configuration and helpers

        //  <reg-fdef ddef=" ggDefaultPrefs() ;; return the default prefs object ">
        this.ggDefaultPrefs = function(){
          /**
            *
            * Function: ggDefaultPrefs
            *   Return a javascript dictionary object containing default local prefs for tymac_komodo_addon
            *
            * Returns:
            *   Dictionary - javascript Dictionary-style object with the name-value pairs of all local preferences
            *
            * See Also:
            *    <ggGetPref> <ggSetPref>
            */
          var vout;
          vout =
          // {@@reg_addon_settings
          {"ddef_begin":"tymac_komodo_settings"

              // p__: edit_this to match your file paths
              ,"file_tymac_homedir"           :   "c:/sm/_large_files/git/tymac_komodo_addon1/_addon"
              ,"file_lib_directory"           :   "c:/sm/_large_files/git/tymac_komodo_addon1/_addon/_lib"
              ,"file_lib_json"                :   "crockford_json_latest.js"

              ,"complete_mode_current"        :   "dictionary"
              ,"complete_mode_all"            :   "synonym dictionary"

              ,"macro_mode_ctrl_enter"        :   "default"
              ,"macro_text_transport"         :   ""

              ,"munge_dsv_delim"              :   ";;"

              ,"snip_sigil_beg"               :   "<%"
              ,"snip_sigil_end"               :   "%>"
              ,"snip_sigil_javascript"        :   "js:"
              ,"snip_languages_all"           :   "General HTML JavaScript PHP Python Ruby XML"

              ,"toolbox_active_pane"          :   "right_toolbox_area"
              ,"toolbox_size_maxwidth"        :   "300"
              ,"toolbox_size_numstops"        :   "1"

              //edit_this to match the location of your local texttransport file
              //hreftt="c:/sm/docs/app_data/__a/addonwin/_init/passthru/00texttransport.txt";
              ,"texttransport"                :   "c:/sm/docs/app_data/__a/addonwin/_init/passthru/00texttransport.txt"
          }
          // }@@reg_addon_settings
          return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" ggSetPref() ;; set a persistent string preference value ">
        this.ggSetPref = function(pref_name,pref_value){
          /**
            *
            * Function: ggSetPref
            *   Set a persistent string preference value.
            *
            * Parameters:
            *   pref_name  - (string) the name of the pref to set
            *   pref_value  - (string) the value to set
            *
            * CodeExample:
            *   (start code)
            *     // TODO: add a code example
            *     //
            *   (end)
            *
            */
            //var pref_name   =   ko.interpolate.interpolateStrings(["%(ask: Pref name)"]);
            //var pref_value  =   ko.interpolate.interpolateStrings(["%(ask: Value)"]);
          if (pref_name && (pref_value !== null)) {
              var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
              //dump("Setting pref '" + pref_name + "' to '" + pref_value + "'\n");
              prefs.setStringPref(pref_name, pref_value);
          }
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" ggGetPref(pref_name) ;; get a persistent string pref value  ">
        this.ggGetPref = function(pref_name){
          /**
            *
            * Function: ggGetPref
            *   Get a persistent string pref value.
            *
            * Parameters:
            *   pref_name  - (string) the name of the pref to get
            *
            * Returns:
            *   string - the value of the output pref
            */
          var vout;
          if (pref_name) {
              var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
              if (prefs.hasStringPref(pref_name)) {
                  vout = prefs.getStringPref(pref_name);
              } else {
                  //vout = ("No pref exists for '" + pref_name + "'");
              }
          }
          return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" ggInitPrefs() ;; setup the built-in preferences">
        this.ggInitPrefs = function(){
          /**
            * Function: ggInitPrefs
            *   Initialize the built-in preferences to their default values.
            */
            var oprefs = this.ggDefaultPrefs();
            for(member in oprefs){
                this.ggSetPref(member,oprefs[member]);
            }
        }
        this.ggInitPrefs();
        //  </reg-fdef>

    }//end_grp
    //

    // Group:  CodeGeneration Utils
    // ------------------------------------------------
    if('fgroup'){//varFuncName ;; Code-generation helper methods
        //  <reg-fdef ddef=" getUuidLink() ;; return pseudo-uuid link style">
        this.getUuidLink = function(){
          /**
            * Function: getUuidLink
            *   Return a pseudo-uuid link-style text.
            *
            * Returns:
            *   string - hyperlink style uuid-link
            *
            */
            curfile =   this.TextArea_getActiveFilePath();
            uuid    =   this.getUuidString();
            vout    = ''
                +'[[%tabstop:href="'+curfile+'"  find="'+uuid+'"]] '
                +'[[%tabstop:'+uuid+']] '
                ;
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" getUuidString() ;; return pseudo-uuid string style">
        this.getUuidString = function(){
          /**
            * Function: getUuidString
            *   Return uuid string.
            *
            * Returns:
            *   string - plain uuid
            */
            vout    =   ['',(new Date()).getTime().toString(),Math.floor(Math.random()*99)].join('_');
            return vout;
        }
        //  </reg-fdef>

    }//end_grp
    //

    // Group:  General Purpose Utils
    // ------------------------------------------------
    if('fgroup'){//varFuncName ;; General-purpose utils for strings, arrays, variables ;;

        //  <reg-fdef ddef=" aohLookup ;; get value from aoh simpletable">
        this.aohLookup = function(otable,searchfield,searchval){
          /**
            * Function: aohLookup
            *   Get a value from an AOH simpletable array.
            *   See <http://bit.ly/9eUSJy> for definition and example of simpletable AOH
            *
            * Parameters:
            *   otable  - (array aoh) array object containing the simpletable data
            *   searchfield  - (string) the fieldname of the field to search
            *   searchval   - (string) the the value to search for
            *
            * CodeExample:
            *   (start code)
            *     // TODO: add a code example
            *     //
            *   (end)
            *
            * Returns:
            *   (var) - return the variable if it exists, otherwise return false
            */
            for(var icc=0;icc<=otable.length;icc=icc+1){
                if(otable[icc][searchfield]==searchval){
                    return otable[icc];
                }
            }
            return false;
        }
        //  </reg-fdef>

        // { <reg-fdef ddef=" dsvGetColW(sraw,icol,sdelim) ;; get the width of a dsv column ">
        this.dsvGetColW = function(sraw,icol,sdelim){
          /**
            * Function: dsvGetColW
            *   Get the width of a dsv column.
            *
            * Parameters:
            *   sraw  - (string) raw string input
            *   icol  - (int) the integer index of the column to get
            *   sdelim - (string) the string used as the dsv delimiter
            *
            * Returns:
            *   int - column width
            */
            sraw  =   sraw.split(/\n/);
            var aflds   = [];
            var iim     = 0;
            try{
                for (var ixx =0; ixx < sraw.length-1; ixx++){
                    sline = sraw[ixx];
                    aflds = sline.split(sdelim);
                    iim   = Math.max(iim,aflds[icol].length);
                }
            }catch(exx){}
            return iim;
        }
        // } </reg-fdef>

        /// { <reg-fdef ddef=" dsvSetColW(sraw,icol,iwth,sdelim) ;; set the width of a dsv column ">
        this.dsvSetColW = function(sraw,icol,iwth,sdelim){
          /**
            * Function: dsvSetColW
            *   Set the width of a dsv column.
            *
            * Parameters:
            *   sraw  - (string) raw string input
            *   icol  - (int) the integer index of the column to Set
            *   iwth  - (int) the integer width
            *   sdelim - (string) the string used as the dsv delimiter
            *
            * Returns:
            *   string - the modified raw string input
            */

            sraw        =   sraw.split(/[\n\r]+/);
            vout        =   '';
            var aflds   = [];
            var iim     =   0;
            var okk     =   new tymac_komodo_addon();
            try{
                for (var ixx =0; ixx < sraw.length-1; ixx++){
                    sline   = sraw[ixx];
                    aflds   = sline.split(sdelim);
                    spad    = okk.strRepeat(' ',(iwth - aflds[icol].length)) ;
                    aflds[icol] = aflds[icol] + spad;
                    sline   =   aflds.join(sdelim);
                    vout    += sline + "\n";
                }
            }catch(exx){}
            return vout;
        }
        // } </reg-fdef>

        /// { <reg-fdef ddef=" strDSVPretty(sraw,sdelim) ;; pretty-format a dsv string ">
        this.strDSVPretty = function(sraw,sdelim){
          /**
            * Function: strDSVPretty
            *   Pretty-format a dsv string dsv stands for "Delimiter Separated Values".
            *
            * Parameters:
            *   sraw  - (string) the raw input string
            *   sdelim  - (string) the dsv delimiter string
            *
            * CodeExample:
            *   (start code)
            *     // TODO: add a code example
            *     //
            *   (end)
            *
            * Returns:
            *   string - the pretty-formatted string
            */

            //
            var stest   =   sraw;
            //var sdelim  =   ';;';
            var iim     =   0;
            var icolctt =   sraw.split(/\n/)[0].split(sdelim).length-1;

            for (var ixx =0;ixx <= icolctt; ixx++){
                iwth  = this.dsvGetColW(stest,ixx,sdelim);
                stest = this.dsvSetColW(stest,ixx,iwth,sdelim);
            }
            return (stest);
        }
        // } </reg-fdef>

        //  <reg-fdef ddef=" strHasOnly(vstring,vregex) ;; return true if the string contains ONLY characters occuring in vregex ">
        this.strHasOnly = function(sraw,vregex){
          /**
            * Function: strHasOnly
            *   Return true if the string contains only characters occuring in vregex.
            *
            * Parameters:
            *   sraw  - (string) raw input string
            *   vregex  - (regex) the regex used to test containment
            *
            * Returns:
            *   boolean - true or false
            */
            var vout = null;
            try{
                vout = (sraw.split(vregex).join('')=='');
            }catch(exx){}
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strEndsWith(sneedle,shaystack) ;; string endswith function ">
        this.strEndsWith = function(shaystack,sneedle){
          /**
            * Function: strEndsWith(shaystack,sneedle)
            *   Return true if string ends with sneedle.
            *
            * Parameters:
            *   shaystack  - (string) the haystack string
            *   sneedle  - (string) the needle string
            */
            if(sneedle.length > shaystack.length) return false;
            return shaystack.indexOf(sneedle)==(shaystack.length-sneedle.length);
        }
        //  </reg-fdef>

        /// { <reg-fdef ddef=" strRepeat(stxt,itimes) ;; repeat stxt the number of itimes ">
        this.strRepeat = function(stxt,itimes){
          /**
            * Function: strRepeat(sraw,itimes)
            *   Repeat sraw a number of times.
            *
            * Parameters:
            *   sraw  - (string) the raw input string
            *   itimes  - (string) the number of times to repeat
            *
            * Returns:
            *   string - the repeated output string
            */
            return new Array(itimes+1).join(stxt);
        }
        // } </reg-fdef>

        //  <reg-fdef ddef=" strSlashBack(stext) ;; change all slashes to Back slash">
        this.strSlashBack = function(stext){
          /**
            * Function: strSlashBack
            *   Return string with all slashes converted to backslash.
            *
            * Parameters:
            *   sraw  - (string) raw input string
            */
            return stext.split(/\x2f/).join("\x5c");
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strSlashForward(stext) ;; change all slashes to Forward slash">
        this.strSlashForward = function(stext){
          /**
            * Function: strSlashForward
            *   Return string with all slashes converted to Forwardslash.
            *
            * Parameters:
            *   sraw  - (string) raw input string
            */
            return stext.split(/\x5c/).join("\x2f");
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strTrim(str) ;; trim trailing and leading whitespace">
        this.strTrim = function(str){
          /**
            * Function: strTrim
            *   Trim trailing and leading whitespace.
            *
            * Parameters:
            *   sraw  - (string) raw input string
            */
            str = str.replace(/^\s+/, '');
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str;
        }
        //  </reg-fdef>

    }//end_grp
    //

    // Group: Appplication Addon Methods
    // ------------------------------------------------
    if('fgroup'){//appMethods ;; appFuncName ;; Komodo application utility methods ;;
        //  <reg-fdef ddef=" appGetDirectory(keyname) ;; return a koDirs directory path">
        this.appGetDirectory = function(keyname){
          /**
            * Function: appGetDirectory
            *   Return a koDirs directory path based on the supplied keyname.
            *
            * Parameters:
            *   keyname  - (string) the built-in keyname of the specific koDirs directory or path you want
            *   (start code)
            *     keyname is expected to be one of the following built-in values:
            *        binDBGPDir
            *        binDir
            *        commonDataDir
            *        docDir
            *        factoryCommonDataDir
            *        hostUserDataDir
            *        installDir
            *        mozBinDir
            *        perlDBGPDir
            *        pythonDBGPDir
            *        pythonExe
            *        roamingUserDataDir
            *        sdkDir
            *        supportDir
            *        userCacheDir
            *        userDataDir
            *   (end)
            *
            * CodeExample:
            *   (start code)
            *       var komain   =   new tymac_komodo_addon();
            *       alert(komain.appGetDirectory('pythonExe'));
            *   (end)
            *
            *
            * Returns:
            *   string - the the requested directory or path (or empty string if none was found)
            *
            */
          var vout  =   '';
          try{
            vout      =   Components.
              classes['@activestate.com/koDirs;1'].
              getService(Components.interfaces.koIDirs)[keyname];
          }catch(exx){}
          return(vout);
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" appLogWrite(message) ;; write a string message to the komodo log">
          this.appLogWrite = function(message){
            /**
              * Function: appLogWrite
              *   Write to the komodo log file.
              *
              * Parameters:
              *   message - the string to write to the log file.
              *
              */
          //TODO: NO_WORKY fix this, it does not seem to work correctly
          var consoleService = Components.
                classes['@mozilla.org/consoleservice;1'].
                getService(Components.interfaces.nsIConsoleService);
          consoleService.logStringMessage(message);
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" appStatusWrite(message) ;; write a string message to the status bar ">
        this.appStatusWrite = function(message){
          /**
            * Function: appStatusWrite
            *   Write a string message to the statusbar.
            *
            * Parameters:
            *   message  - (string) string output message
            */
          this.guiStatus(message);
        }
        //  </reg-fdef>


        //  <reg-fdef ddef=" appOS() ;; return the OperatingSystem this app is running under">
        this.appOS = function(){
          /**
            * Function: appOS
            *   Return the operating system this app is running under.
            *
            * Returns:
            *   string - name of the operating system
            *   >       WINNT     ;;  windows variant
            */
          var vout  =   '';
          vout      =   Components.
            classes["@mozilla.org/xre/app-info;1"].
            getService(Components.interfaces.nsIXULRuntime).
            OS.
            toString()
          ;
          return(vout);
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" appUriCollection() ;; return array of URIs for currently open buffers ">
        this.appUriCollection = function(){
          /**
            * Function: appUriCollection
            *   Return array of paths of all currently-open files (edit buffers).
            *
            * Returns:
            *   array - URIs for all currently open buffers
            */
          var vout        =   [];
          var view_list   =   ko.views.manager.topView.getDocumentViewList(true);
          var view;
          var vtemp;

          for (var icc = 0; icc < view_list.length; icc++) {
              view = view_list[icc];
              if (view.document) {
                  vtemp = view.document.file.URI;
                  vtemp = vtemp.split('file:///').join('');
                  vout.push(vtemp);
              }
          }
          return vout;
        }
        //  </reg-fdef>
    }//end_grp
    //

    // Group: Editor Action Methods
    // ------------------------------------------------
    if('fgroup'){//EditorAction ;; editorFuncName ;; Edit buffer action methods ;;
        //  <reg-fdef ddef=" editorOpenURI(spath) ;; open path in a new edit buffer">
        this.editorOpenURI = function(spath){
            ko.open.URI([spath].join(''));            
        }
        //  </reg-fdef>
        
        //  <reg-fdef ddef=" editorOpenByNumber(spath,inumber) ;; open path and jump to a specific line number ">
        this.editorOpenByNumber = function(spath,inumber){
          /**
            * Function: editorOpenByNumber(spath,inum)
            *   Open path and jump to a specific line number.
            */
            if(inumber.toString()===''){inumber=1;}
            ko.open.URI([spath,'#',inumber].join(''));
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" editorOpenBySearch(spath,stext) ;; open path and jump to first instance of search string ">
        this.editorOpenBySearch = function(spath,stext){
            //TODO
        }
        //  </reg-fdef>
    }//end_grp
    //

    // Group: Disk FileIO Methods
    // ------------------------------------------------
    if('fgroup'){//FileIO ;; ioFuncName ;; Disk file methods  ;;
        //  <reg-fdef ddef=" ioDirectoryExists(filespec) ;; return true if filespec is an existing directory">
        this.ioDirectoryExists = function(filespec){
          /**
            * Function: ioDirectoryExists(filespec)
            *   Return true if filespec points to an existing directory.
            */
          try {
            // seealso:
            // https://developer.mozilla.org/en/nsILocalFile
            var file = Components
              .classes['@mozilla.org/file/local;1']
              .createInstance(Components.interfaces.nsILocalFile)
              ;
            file.initWithPath(filespec);
                  //for(member in file){
                  //  alert(member);
                  //}
            return(file.exists());
          }
          catch(exx) {alert(exx);return false;}
        }
        //  </reg-fdef>
      
        //  <reg-fdef ddef=" ioFileIsReadable(filename) ;; return true if filename is a readable file path">
        this.ioFileIsReadable = function(filename){
          /**
            * Function: ioFileIsReadable(filespec)
            *   Return true if filespec is a readable file path.
            */
            var vout = false;
            try{
                var file = Components.classes["@activestate.com/koFileEx;1"].createInstance(Components.interfaces.koIFileEx);
                file.path = filename;
                file.open("rb");
                file.close();
                vout = true;
            }catch(exx){}
            return vout;
        }
        this.fileIsReadable = this.ioFileIsReadable; // legacy_alias_name
        //  </reg-fdef>

        //  <reg-fdef ddef=" ioStringToFile(filename,sraw) ;; create a text file from a single string">
        this.ioStringToFile = function(filename,sraw){
          /**
            * Function: ioStringToFile(filename,sraw)
            *   Create a text file from a single string.
            */
            var fileSvc         =   Components.classes["@activestate.com/koFileService;1"].getService(Components.interfaces.koIFileService);
            var koIFileEx       =   fileSvc.getFileFromURI(ko.uriparse.localPathToURI(filename));

            koIFileEx.open("w");
            koIFileEx.close();
            gLogFile = koIFileEx;

            gLogFile.open("a");
            gLogFile.puts(sraw);
            gLogFile.close();
            return filename;
        }
        this.stringToFile = this.ioStringToFile; //  legacy_alias_name
        //  </reg-fdef>

        //  <reg-fdef ddef=" ioStringAppendFile(filename,sraw) ;; append string to an existing file">
        this.ioStringAppendFile = function(filename,sraw){
          /**
            * Function: ioStringAppendFile(filename,sraw)
            *   Append string to an existing file.
            */
            var fileSvc         =   Components.classes["@activestate.com/koFileService;1"].getService(Components.interfaces.koIFileService);
            var koIFileEx       =   fileSvc.getFileFromURI(ko.uriparse.localPathToURI(filename));

            koIFileEx.open("a");
            koIFileEx.close();
            gLogFile = koIFileEx;

            gLogFile.open("a");
            gLogFile.puts(sraw);
            gLogFile.close();
            return filename;
        }
        this.stringAppendFile = this.ioStringAppendFile; //  legacy_alias_name
        //  </reg-fdef>

        //  <reg-fdef ddef=" ioSelectionToFile(filename,bforce) ;; send currently selected text to a text file  ">
        this.ioSelectionToFile = function(filename,bforce){
          /**
            * Function: ioSelectionToFile(filename,bforce)
            *   Send the currently-selected text to a text file.
            *
            * Parameters:
            *   filename  - (string) the path to the output file
            *   bforce  - (boolean) if true, force a selection to exist even if there is no currently-selected text
            */
            var sraw    = this.TextArea_getSelection(bforce);
            return this.stringToFile(filename,sraw);
        }
        this.selectionToFile = this.ioSelectionToFile; //  legacy_alias_name
        //  </reg-fdef>

        //  <reg-fdef ddef=" ioStringFromFile(filename) ;; get contents of entire text file into a single string. return the string">
        this.ioStringFromFile = function(filename){
          /**
            * Function: ioStringFromFile(filename)
            *   Get the contents of a text file as a single string, return the string.
            *
            * Parameters:
            *   filename  - (string) path of input file
            */
            var file    =   Components.classes["@activestate.com/koFileEx;1"].createInstance(Components.interfaces.koIFileEx);
            file.path   =   filename;
            file.open("r");
            var content = file.readfile();
            return content;
        }
        this.stringFromFile = this.ioStringFromFile; //  legacy_alias_name
        //  </reg-fdef>

        //  <reg-fdef ddef=" ioArrayFromFile(filename) ;; get file as array of lines. return the array. ">
        this.ioArrayFromFile = function(filename){
          /**
            * Function: ioArrayFromFile(filename)
            *   Get the contents of a text file as an array of lines, return the array.
            */
            var content = this.stringFromFile(filename);
            content     = content.split(/\r|\n|\r\n|\n\r/);
            return content;
        }
        this.arrayFromFile = this.ioArrayFromFile; //  legacy_alias_name
        //  </reg-fdef>
    }//end_grp
    //

    //  Group: String Munge Methods
    // ------------------------------------------------
    if('fgroup'){//StringMunge ;; Commonly-used string munge operations
        //  change case
        // ================================================
        //  <reg-fdef ddef=" strToUcfirst(raw) ;; uppercase first letter ">
        this.strToUcfirst = function(raw){
          /**
            * Function: strToUcfirst
            *   Uppercase first letter.
            */
            if(!raw){raw = this.TextArea_getSelection(true);}
            vout    =   raw;
            vout    =   vout.toLowerCase();
            vout    =   (vout + '').charAt(0).toUpperCase() + vout.substr(1);
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strToLowerCase(raw) ;; downcase lowercase string ">
        this.strToLowerCase = function(raw){
          /**
            * Function: strToLowerCase
            *   Lowercase string.
            */
            if(!raw){raw = this.TextArea_getSelection(true);}
            vout    =   raw;
            vout    =   vout.toLowerCase();
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strToUpperCase(raw) ;; upcase Uppercase string ">
        this.strToUpperCase = function(raw){
          /**
            * Function: strToUpperCase
            *   Uppercase upcase string.
            */
            if(!raw){raw = this.TextArea_getSelection(true);}
            vout    =   raw;
            vout    =   vout.toUpperCase();
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strWordsUpperCase(raw) ;; upcase Uppercase string ">
        this.strWordsUpperCase = function(raw){
          /**
            * Function: strWordsUpperCase
            *   Uppercase upcase first letter of words in string.
            */
            if(!raw){raw = this.TextArea_getSelection(true);}
            vout    =   raw;
            vout    =   (vout+'').replace(/^(.)|\s(.)/g, function( $1 ){return $1.toUpperCase( );} );
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strSpacesToUnd(raw) ;; spaces to underscore ">
        this.strSpacesToUnd = function(raw){
          /**
            * Function: strSpacesToUnd
            *   Convert spaces to underscore.
            *
            * Parameters:
            *   raw  - (string) raw input string
            *
            */
            if(!raw){raw = this.TextArea_getSelection(true);}
            vout    =   raw;
            vout    =   vout.toString().split(/[\s\t]+/).join('_');
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strUndToSpaces(raw) ;; underscore to spaces ">
        this.strUndToSpaces = function(raw){
          /**
            * Function: strUndToSpaces
            *   Convert underscores to spaces.
            *
            */
            if(!raw){raw = this.TextArea_getSelection(true);}
            vout    =   raw;
            vout    =   vout.split(/[_]+/).join(' ');
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" strTextWrap(raw,isize,delim) ;; wrap text to maximum line size">
        this.strTextWrap = function(raw,isize,delim){
          /**
            * Function: strTextWrap
            *   Wrap text to a maxiumm line size.
            *
            * Parameters:
            *   raw  - (string) raw input string
            *   isize - (int) size of string
            *   delim  - (string) delimiter
            *
            * CodeExample:
            *
            * Returns:
            *   string - reformatted raw input
            */
            var vout ='';
            if(!raw){return '';}
            if(!isize){isize=70;}
            if(!delim){delim="\n";}
            for (var icc=0; icc<raw.length; icc++) {
                vblurb  =   '';
                vblurb  +=  raw.substring(icc*isize,(icc*isize)+isize);
                if(vblurb==''){break;}
                vout    +=  vblurb.toString()+"\n";
            }
            return vout;
        }
        //  </reg-fdef>

    }//end_grp
    //

    // Group: TextArea Action Methods
    // ------------------------------------------------
    if('fgroup'){//TextArea.action ;; general textarea action methods ;;
        //  <reg-fdef ddef=" TextArea_focus() ;; set focus on the last-used edit buffer ">
        this.TextArea_focus = function(){
          /**
            * Function: TextArea_focus
            *   Set focus on the last-used edit buffer.
            */
            komodo.assertMacroVersion(3);
            if(komodo.view && komodo.view.scintilla){ komodo.view.scintilla.focus(); }
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_selectActiveLine() ;; select current line ">
        this.TextArea_selectActiveLine = function(){
          /**
            * Function: TextArea_selectActiveLine
            *   Select the current line.
            */
            this.TextArea_focus();
            komodo.doCommand('cmd_homeAbsolute');
            komodo.doCommand('cmd_selectEnd');
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_gotoLine(iline) ;; goto buffer line iline ">
        this.TextArea_gotoLine = function(iline){
          /**
            * Function: TextArea_gotoLine(iline)
            *   Goto buffer line iline.
            */
            iline = iline - 1;
            this.TextArea_focus();
            var view        =   ko.views.manager.currentView;
            var scimoz      =   view.scintilla.scimoz;
            scimoz.gotoLine(iline);  // First line is 0, adjust as necessary.
            scimoz.ensureVisible(iline);
            scimoz.scrollCaret();
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_gotoColumn(icol) ;; goto buffer column icol ">
        this.TextArea_gotoColumn = function(icol){
          /**
            * Function: TextArea_gotoColumn(icol)
            *   Goto column icol.
            */
            this.TextArea_focus();
            var view        =   ko.views.manager.currentView;
            var scimoz      =   view.scintilla.scimoz;
            scimoz.home();
            while(icol>1){
                komodo.doCommand('cmd_right');
                icol = icol-1;
            }
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_setSelection(vtext) ;; set current selection to vtext">
        this.TextArea_setSelection = function(vtext){
          /**
            * Function: TextArea_setSelection(vtext)
            *   Take the currently-selected text and replace it with vtext.
            */
            komodo.view.selection = vtext;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_selectionToTextTransport ;; send currently-selected text to the text transport file">
        this.TextArea_selectionToTextTransport = function(){
          /**
            * Function: TextArea_selectionToTextTransport(vtext)
            *   TODO: finish this ;; send the currently-selected text to the text transport file
            *
            * CodeExample:
            *
            * Returns:
            *   string - blahblah
            *
            */
            //TODO: finish this
        }
        //  </reg-fdef>
    }//end_grp
    //

    // Group: TextArea Getter Methods
    // ------------------------------------------------
    if('fgroup'){//TextArea.getter ;; get stuff from the active text buffer ;;
        // <reg-fdef ddef="TextArea_getActiveFilePath;; get current file path">
        this.TextArea_getActiveFilePath = function(){
          /**
            * Function: TextArea_getActiveFilePath
            *   Get the current file path as a string.
            */
            return komodo.interpolate('%F');
        }
        // </reg-fdef>

        // <reg-fdef ddef="TextArea_getActiveFileParentDir;; get current file parent dir">
        this.TextArea_getActiveFileParentDir = function(){
          /**
            * Function: TextArea_getActiveFileParentDir
            *   Get the parent directory of the current file as a string.
            */
            return komodo.interpolate('%D');
        }
        // </reg-fdef>

        // <reg-fdef ddef="TextArea_getActiveLineColumn;; get current line cursor column">
        this.TextArea_getActiveLineColumn = function(){
            return komodo.editor.getColumn(komodo.editor.currentPos);
        }
        // </reg-fdef>

        // <reg-fdef ddef="TextArea_getActiveLineNumber;; get current line number">
        this.TextArea_getActiveLineNumber = function(){
          /**
            * Function: TextArea_getActiveLineNumber
            *   Get the line number of the currently-active line.
            */
            return komodo.interpolate('%L');
        }
        // </reg-fdef>

        //  <reg-fdef ddef=" TextArea_getActiveLineText() ;; get the text of the current line in the current text buffer">
        this.TextArea_getActiveLineText = function(){
          /**
            * Function: TextArea_getActiveLineText
            *   Get the text of the currently-active line.
            */
          this.TextArea_focus();
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
          return vout;

            // try a different approach for selecting the current line
            // found this from [[google://"text of the current line" komodo]]
            // http://www.weirdlooking.com/blog/92/abbr.kpf
            //komodo.doCommand('cmd_end');
            //var view      =   ko.views.manager.currentView;
            //var line      =   view.scimoz.lineFromPosition(view.scimoz.currentPos);
            //var lineStart =   view.scimoz.positionFromLine(line);
            //alert(line);
            //alert(lineStart);
            //var lineText  =   view.scimoz.getTextRange(lineStart, view.scimoz.currentPos);
            //return lineText;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_getSelection(bforce) ;; get currently seleted text (if any). force one if bforce is true ">
        this.TextArea_getSelection = function(bforce){
          /**
            * Function: TextArea_getSelection
            *   Get the currently selected text (if any). Force a selection if bforce is true.
            *
            * Parameters:
            *   bforce  - (boolean) set this flag to true if you wish to auto-select text if there is not already a selection
            *
            * CodeExample:
            *   (start code)
            *       var vtext = TextArea_getSelection();
            *   (end)
            *
            */
            this.TextArea_focus();
            var selection       = '';
            try{
                selection = ko.views.manager.currentView.selection;
            }catch(exx){}
            try{
                if(selection=='' && bforce){
                    komodo.doCommand('cmd_selectWordLeft');
                    selection   =   ko.views.manager.currentView.selection;
                };
            }catch(exx){};
            return selection;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_getActiveSubLang() ;; get the current syntax language at the current cursor position ">
        this.TextArea_getActiveSubLang = function(){
          /**
            * Function: TextArea_getActiveSubLang
            *   Get the current syntax language at the current cursor position.
            */
            return ko.views.manager.currentView.document.subLanguage;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_getActiveLanguage() ;; get the current syntax language for the entire buffer ">
        this.TextArea_getActiveLanguage = function(){
          /**
            * Function: TextArea_getActiveLanguage
            *   Get the current syntax language for the entire edit buffer.
            */
            return ko.views.manager.currentView.document.language;
        }
        //  </reg-fdef>
    }//end_grp
    //

    // Group: TextArea Insert Methods
    // ------------------------------------------------
    if('fgroup'){//TextArea.insert ;; textarea insert methods insert stuff into the active text buffer ;;

        //  <reg-fdef ddef=" TextArea_insertAsSnippet(vtext) ;; insert raw text as though it were a komodo snippet">
        this.TextArea_insertAsSnippet = function(vtext){
          /**
            * Function: TextArea_insertAsSnippet
            *   Insert raw text as though it were a komodo snippet with placeholders.
            *
            * Parameters:
            *   vtext  - (string) the text you want to insert
            */
            var fakeSnippet = {
                hasAttribute: function(name) {
                    return name in this;
                },
                getStringAttribute: function(name) {
                    return this[name];
                },
                name: "pasted snippet",
                indent_relative: "true",
                value: vtext
            };
            ko.projects.snippetInsert(fakeSnippet);
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_insertAsText(vtext) ;; insert regular no-frills plain text ">
        this.TextArea_insertAsText = function(vtext){
          /**
            * Function: TextArea_insertAsText
            *   Insert plain text into the current edit buffer.
            */
          komodo.view.selection = vtext;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" TextArea_repeatLinePrefix(repeatmode) ;; repeat prefix from previous line">
        //  TODO: add support for delimiter mode
        this.TextArea_repeatLinePrefix = function(rptmode,delimiter){
          /**
            * Function: TextArea_repeatLinePrefix
            *   Enter a new line of text based on what appears on the previous line.
            *
            *   A typical use for this is to enter text inside a comment block
            *   without having to re-type the comment-block syntax for each and
            *   every line you enter.
            *
            *   This can also be used to quickly enter CSV and DSV table rows.
            *
            * Parameters:
            *   repeatmode  - (string) the mode this function operates under
            *   delimiter   - (string) specify the delimiter you want to use (for delimiter mode only)
            *   (start code)
            *     == repeatmode ==
            *     repeatmode may be any of the following values
            *     _blank_   ;;  if left blank, repeatmode defaults to "delimiter"
            *     delimiter ;;  repeat from the previous line treating it as a row of delimiter-separated-values
            *     prefix    ;;  repeat from the previous line anything that looks like a comment prefix
            *   (end)
            *
            *
            */
          //
          var komain    =   this;
          var vout      =   '';
          var vdelim    =   '';
          var vline     =   '';
          var regex     =   null;
          vline         =   komain.TextArea_getActiveLineText();
          vdelim        =   komain.ggGetPref('munge_dsv_delim');
          //
          if(rptmode === undefined){rptmode='';}
          if(rptmode.toString()===''){rptmode='delimiter';}
          rptmode  =  rptmode.toString().toLowerCase();
          //
          if( rptmode === undefined){ exit(); }
          // p__: delimiter_based_prefix
          if(vout ==='' &&  rptmode.toString().toLowerCase()==='delimiter'){
            if(vline.lastIndexOf(vdelim)>-1){
              vout  =   vline.substring(0,(vline.lastIndexOf(vdelim)+vdelim.length));
              vout  =   vout.split(vdelim);
              for(var icc=0;icc<=(vout.length-1);icc=icc+1){
                //vout[icc] = vout[icc].toString().replace(/[\s]/g, '_');
                vout[icc] = '[[%tabstop:' + vout[icc] + ']]';
                //vout[icc] = vout[icc].toString().replace(/[\S]+/, '[[%tabstop:'+vout[icc]+']]');
                //alert(vout[icc]);
              }
              vout        =   vout.join(vdelim).replace(/^[\s]+/,'') + ' [[%tabstop:...]]';
              komain.TextArea_insertAsSnippet( "\n" + vout );
            }else{ vout = '';}
          }
          // p__: cmmt_line_based_prefix
          if(vout ==='' && (rptmode === 'prefix' || rptmode === 'delimiter') ){
            regex   =   new RegExp(/^([\s]*)([\S]+)([\s]*)/);
            vout    =   vline.match(regex);
            if(vout){
              komodo.doCommand('cmd_end');
              komain.TextArea_insertAsText( "\n" +vout[1]+vout[2]+vout[3] );
            }
          }
        }
        //  </reg-fdef>

    }//end_grp
    //

    // Group: TextTransport Methods
    // ------------------------------------------------
    // TextTransport Methods allow us to pass around text blurbs for processing
    if('fgroup'){//TextTransport ;; texttransport allows you to pass around text blurbs
        //  <reg-fdef ddef=" ttWriteUriCollection() ;; write the URIs of the currently open buffers to the texttransport file">
        this.ttWriteUriCollection = function(){
          /**
            * Function: ttWriteUriCollection
            *   Write the URIs of the currently open buffers to the texttransport file.
            */
            var ttfile      =   this.ggGetPref('texttransport');
            var lstfiles    =   this.editorUriCollection();
            var vout        =   [];
            var vtemp;
            for (var ixx =0;ixx < lstfiles.length; ixx++){
                vtemp = '';
                vtemp = lstfiles[ixx];
                vtemp = ['href="',vtemp,'"'].join("");
                vout.push(vtemp);
            }
            vout = vout.join("\n");
            this.ioStringToFile(ttfile,vout);
        }
        //  </reg-fdef>

    }//end_grp
    //

    //  Group: Toolbox Addons
    //  ------------------------------------------------
    if('fgroup'){//Toolbox Addons ;; addons and helpers for toolbars and projects
        //  <reg-fdef ddef=" tbbGetCurrentProject() ;; get the current project NO_WORKY ">
        //this.tbbGetCurrentProject = function(){
        //    vout = Components.
        //        classes['@activestate.com/koPartService;1'].
        //        getService(Components.interfaces.koIPartService).
        //        currentProject
        //        ;
        //    return vout;
        //}
        //  </reg-fdef>

        //  <reg-fdef ddef=" tbbJScriptInterpo() ;; support for JavaScript interpolation placeholders ">
        this.tbbJScriptInterpo = function(){
          /**
            * Function: tbbJScriptInterpo
            *   Process JavaScript interpolation placeholders.
            */
            var sraw='';
            var vout='';
            /// p__:
            try{
                sraw    =   ko.interpolate.interpolateString('%s');
            }catch(exx){sraw = '';}

            //  p__: get the settings
            snip_sigil_begin =  this.ggGetPref('snip_sigil_begin'); // custom delimiter for extended placeholders
        }
        //  </reg-fdef>


        //  <reg-fdef ddef=" tbbGetSnippetByID(vid) ;; return snippet object by toolbox ID. return false if not found. ">
        this.tbbGetSnippetByID = function(vid){
          /**
            * Function: tbbGetSnippetByID
            *   Return snippet object by toolbox ID. return false if not found.
            *
            * Parameters:
            *   vid  - (string) the ID of the snippet
            */
            var Cc        =   Components.classes;
            var Ci        =   Components.interfaces;
            var vtest       =   false;

            partService     =   Cc['@activestate.com/koPartService;1'].getService(Ci.koIPartService);
            abbreviationsFolders = partService.getParts('folder', 'name', 'Abbreviations', '*', partService.currentProject, {});
            for(var ijj=0;ijj<abbreviationsFolders.length;ijj++){
                vtest   = abbreviationsFolders[ijj].
                    getChildWithTypeAndStringAttribute('snippet', 'id', vid, true);
                if(vtest){return vtest;}
            }
            return vtest;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" tbbLookupAbbrevs(substring) ;; return a simpletable aoh {snippet.name,snippet.parent_name} ">
        this.tbbLookupAbbrevs = function(substring){
          /**
            * Function: tbbLookupAbbrevs
            *   Return a simpletable aoh containing snippets that match a particular substring.
            *
            * Parameters:
            *   substring  - (string) a substring to search for inside the snippet caption
            *
            * CodeExample:
            *   (start code)
            *     // TODO: add a code example
            *     //
            *   (end)
            *
            * Returns:
            *   array aoh - array (simpletable aoh) containing zero or more snippets that matched the substring
            *   (start code)
            *    tbbLookupAbbrevs returns an array (simpletable aoh) with the following structure:
            *        [
            *          {'parent_name':       snippet.parent.name
            *                  ,'name':      snippet.name
            *                  ,'caption':   snippet.caption
            *                  ,'value':     snippet.id
            *                  }
            *        ]
            *   (end)
            */
            if(substring==undefined){substring='';}
            var vout;   vout = [];
            var alanglookup = this.ggGetPref('snip_languages_all').split(/\s+/);

            var Cc        =   Components.classes;
            var Ci        =   Components.interfaces;

            this.ggSetPref('temp_string','');

            partService             =   Cc['@activestate.com/koPartService;1'].getService(Ci.koIPartService);
            abbreviationsFolders    =   partService.getParts('folder', 'name', 'Abbreviations', '*', partService.currentProject, {});
            for(var ijj=0;ijj<abbreviationsFolders.length;ijj++){
                for(var ikk=0;ikk<alanglookup.length;ikk++){
                    var languageFolder  = abbreviationsFolders[ijj].getChildWithTypeAndStringAttribute('folder', 'name', alanglookup[ikk], false);
                    if (languageFolder){
                        var folderSnippets = {};
                        var snippetsLength = {};
                        languageFolder.getChildrenByType('snippet', true, folderSnippets, snippetsLength); // populate the above variables with this (counter-intuitive)
                        for(var imm = 0; imm < folderSnippets.value.length; imm++) {
                            var tmpsnip     =   folderSnippets.value[imm];
                            var tmpcaption  =   [tmpsnip.parent.name
                                    ,(new Array(Math.abs(14 - tmpsnip.parent.name.length)).join(' '))
                                    ,tmpsnip.name].join('')
                                    ;
                            if( tmpsnip.name.indexOf(substring)<0 ){continue;}
                            vout.push({'parent_name': tmpsnip.parent.name
                                      ,'name':      tmpsnip.name
                                      ,'caption':   tmpcaption
                                      ,'value':     tmpsnip.id
                                      });
                        }
                    }
                }
            }
            //this.ggSetPref('temp_string',vout.sort().join("\n"));
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" tbbResizeToolbar() ;; resize a komodo side pane ">
        this.tbbResizeToolbar = function(){
            var toolbox_pane    =   '';
            toolbox_pane        =   document.getElementById(this.ggGetPref('toolbox_active_pane'));
            //var toolbox_pane    =   document.getElementById("right_toolbox_area");
            //var project_pane    =   document.getElementById("project_toolbox_area");

            var imax_width      =   this.ggGetPref('toolbox_size_maxwidth');
            var num_stops       =   this.ggGetPref('toolbox_size_numstops');
            var iadd_width      =   parseInt( imax_width/num_stops );
            var debugmode       =   true;

            if(false){

            }else if(parseInt(toolbox_pane.width) < 0){
                toolbox_pane.width  =   iadd_width;
                komodo.doCommand('cmd_viewToolbox');

            }else if(parseInt(toolbox_pane.width) == 10){
                toolbox_pane.width  =   imax_width;
                komodo.doCommand('cmd_viewToolbox');

            }else if(parseInt(toolbox_pane.width) >= imax_width){
                if(num_stops>1){
                    toolbox_pane.width  =       ( 10 );
                };
                if(num_stops==1){   toolbox_pane.width  =      ( -1 )
                    komodo.doCommand('cmd_viewToolbox');
                };

            }else if(true){
                toolbox_pane.width  =   parseInt(toolbox_pane.width) + parseInt(iadd_width);
            }

            if(debugmode){StatusBar_AddMessage(toolbox_pane.width, "debugger", 5000, true)}
        }
        //  </reg-fdef>

    }//end_grp
    //

    // Group:  System-Specific Methods
    // ------------------------------------------------
    if('fgroup'){//System ;; system and external commands (may not work on all platforms) ;;
        //  <reg-fdef ddef=" sysShellRun(srunn,sarg,binsert,bopsel) ;; run external cmd with optional insert and optional operate on selection ">
        this.sysShellRun    =   function(scmd,sargs,binsert,bopsel){
          /**
            * Function: sysShellRun
            *   Run external cmd with optional insert and optional operate on selection.
            *
            * Parameters:
            *   scmd  - (string) string command
            *   sargs  - (string) arguments for the command
            *   binsert - (boolean) flag - do you want to insert the result of shellRun?
            *   bopsel - (boolean) flag - do you want to operate on the currently-selected text?
            *
            */
            var sout        = '';
            var formatter   = '';
            if(binsert==undefined && binsert!= 'False'){
                binsert = 'True'; // insert output into buffer?
            }
            if(bopsel==undefined && bopsel!= 'False'){
                bopsel  = 'True'; // operate on selection?
            }
            sout = [scmd,sargs].join(' ');
            sout += " {'insertOutput': "+binsert+", 'operateOnSelection': "+bopsel+"}";
            //alert(sout);
            formatter   =   sout;
            try{
                Run_RunEncodedCommand(
                    window,
                    formatter
                );
            }catch(evv){}
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" sysCmdRun(scmd,sargs,fncallback) ;; run a system command with optional callback function     ">
        this.sysCmdRun = function(scmd,sargs,fncallback){
          /**
            * Function: sysCmdRun
            *   Run a system command with optional callback function.
            *
            * Parameters:
            *   scmd  - (string) string command
            *   sargs  - (string) arguments for the command
            *   fncallback  - (function_ref) pass a reference to an optional callback function
            */
            sout = [scmd,sargs].join(' ');
            sout += " {'insertOutput': False, 'operateOnSelection': False }";
            if(typeof fncallback == 'undefined'){fncallback=function(){return true;}}
            try{
                Run_RunEncodedCommand(
                    window
                    ,sout
                    ,fncallback
                );
            }catch(evv){alert(evv);}
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" sysCmdRunOnSelection(scmd,sargs,fncallback) ;; Run a system command with optional callback function     ">
        this.sysCmdRunOnSelection = function(scmd,sargs,fncallback){
          /**
            * Function: sysCmdRunOnSelection
            *   Run a system command with optional callback function.
            *
            * Parameters:
            *   scmd  - (string) string command
            *   sargs  - (string) arguments for the command
            *   fncallback  - (function_ref) pass a reference to an optional callback function
            *
            */
            sout = [scmd,sargs].join(' ');
            sout += " {'insertOutput': True, 'operateOnSelection': True }";
            if(typeof fncallback == 'undefined'){fncallback=function(){return true;}}
            try{
                Run_RunEncodedCommand(
                    window
                    ,sout
                    ,fncallback
                );
            }catch(evv){alert(evv);}
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" sysDirectoryOpen(spath) ;; open a directory using the standard desktop-finder-explorer-navigator GUI ">
        this.sysDirectoryOpen = function(spath){
            var myOS = this.appOS().toLowerCase();
            if(false){
                // do_nothing
            }
            else if(myOS=='winnt'){
                spath =   spath.split(/\x2f/).join("\x5c");
                this.sysCmdRun('explorer.exe' , spath );
                komodo.doCommand('cmd_viewBottomPane'); // close the bottom pane that got auto-opened
            }
        }
        //  </reg-fdef>

    }//end_grp
    //

    // Group:  GUI Simple Tools
    // ------------------------------------------------
    if('fgroup'){//GUI Simple Tools ;;  fast and simple gui dialogs to get user input ;;
        //  <reg-fdef ddef=" guiCMenu(vopts,doaction) ;; get input from a context popup menu. vopts fields={caption,value,hotkey,style} ">
        this.guiCMenu = function(vopts,doaction){
          /**
            * Function: guiCMenu(vopts,doaction)
            *   Trigger some JavaScript code using a GUI context popup menu.
            *
            * Parameters:
            *   vopts  - (array aoh) array (simpletable aoh) that we pass in for constructing the context menu
            *   doaction  - (function_ref) function reference to specify what to do when a context menu item is selected
            *   (start code)
            *    The vopts parameter is expected as an array (simpletable aoh).
            *    It should match the following structure:
            *
            *    [
            *    {value:'_value1_'    ,caption:'Human Readable Caption1'  ,hotkey:'a'   ,style:'color:ivory;'}
            *      ,{value:'_value2_' ,caption:'Human Readable Caption2'  ,hotkey:'b'   ,style:'color:lightyellow;'}
            *      ,{value:'_value3_' ,caption:'Human Readable Caption3'  ,hotkey:'c'   ,style:'color:white;'}
            *    ]
            *
            *    See the CodeExample for more details.
            *   (end)
            *
            *
            * CodeExample:
            *   (start code)
            *    // Example1
            *    omain       =  new tymac_komodo_addon();
            *
            *    // choose an action you want to do
            *    doaction1   =  function(vxx){StatusBar_AddMessage(vxx, "debugger", 5000, true)};
            *    doaction2   =  function(vxx){alert(vxx)};
            *
            *    // setup your options array
            *    vopts       =  [{value:'alpha_red',caption:'Alpha Red',hotkey:'a',style:'color:red;'}
            *                 ,{value:'bravo_blue',caption:'Bravo Blue',hotkey:'b',style:'color:blue;'}
            *                 ,{value:'charlie_ivory',caption:'Charlie Ivory',hotkey:'c',style:'font-weight:bold;'}
            *                 ];
            *
            *    // call the gui context menu -- this will render the menu and invoke the doaction1 callback function
            *    omain.guiCMenu(vopts,doaction1);
            *   (end)
            *
            */
            //  p__: init
            var view, editor, menu, item;
            view            = ko.views.manager.currentView;
            editor          = view.scimoz;
            menu            = document.getElementById('tymac_temp_menu1');
            this.clstemp    = {};

            // p__:
            if(menu){menu.parentNode.removeChild(menu)};
            menu            = document.createElement('menupopup');
            menu.setAttribute('id', 'tymac_temp_menu1');
            //menu.setAttribute('style','background-color:silver;')

            //  p__:
            for (var vjj=0;vjj<vopts.length;vjj++){
                this.clstemp['menuopts'] = vopts;
                this.clstemp['doaction'] = doaction;
                ctxx        = this;
                orec        = vopts[vjj];
                item        = document.createElement('menuitem');
                item.setAttribute('label'       ,  orec['caption']);
                item.setAttribute('accesskey'   ,  orec['hotkey']);
                item.setAttribute('style'       ,  orec['style']);
                item.setAttribute('default'     ,  false);
                item.addEventListener('command', (function(vjj){return function(){
                    return ctxx.clstemp['doaction']( ctxx.clstemp['menuopts'][vjj]['value'] );
                }})(vjj),null);
                menu.appendChild(item);
            }

            // p__: showmenu
            document.documentElement.appendChild(menu);
            menu = document.getElementById('tymac_temp_menu1');
            menu.showPopup(view.scintilla,
                           editor.pointXFromPosition(editor.currentPos)
                                + view.boxObject.x,
                           editor.pointYFromPosition(editor.currentPos)
                                + editor.textHeight(editor.lineFromPosition(editor.currentPos))
                                + view.boxObject.y,
                           'context', 'topleft', 'topleft');
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiXUL(uri) ;; use an XUL dialog">
        this.guiXUL = function(uri){
          /**
            * Function: guiXUL
            *   Get user input using an XUL dialog.
            *
            * Parameters:
            *   uri  - (string) the path to the XUL dialog file
            *   odata  - (var) JavaScript data struct
            */
          uri   = "file:///c:/sm/docs/mytrybits/k/trykomodoedit/tryxul/demo.xul";
          data  = {
              'valid':      false,
              'configured': false,
              'vars': {
                  'id':           '',
                  'name':         'Damien Extension',
                  'creator':      'Me',
                  'version':      '0.1',
                  'description':  '',
                  'homepageURL':  '',
                  'ext_name':     ''
              }
          };
          window.openDialog(
              uri,
              "_blank",
              "centerscreen,chrome,resizable,scrollbars,dialog=no,close,modal=yes",
              data
          );
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiYesNoCancel(stitle) ;; get input from a YesNoCancel dialog ">
        this.guiYesNoCancel = function(stitle){
          /**
            * Function: guiYesNoCancel
            *   Simple YesNoCancel dialog.
            *
            * Parameters:
            *   stitle  - (string) dialog title
            *
            * CodeExample:
            *   (start code)
            *     var komain = new tymac_komodo_addon();
            *     var choice = guiYesNoCancel('Please Choose');
            *   (end)
            *
            * Returns:
            *   boolean - true if yes, false otherwise
            */
            var vout = ko.dialogs.yesNoCancel(stitle);
            return(vout);
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiInputBox(title,prompt,label,vdefault,mruName) ;; get input from an text inputbox ">
        this.guiInputBox = function(title,prompt,label,vdefault,mruName){
          /**
            * Function: guiInputBox
            *   Get input from a text inputbox.
            *
            * Parameters:
            *   title - (string) dialog title
            *   prompt - (string) dialog prompt
            *   vdefault - (string) (optional) default value
            *   mruName - (string) (optional) history MRU name for this dialog
            *
            * CodeExample:
            *   (start code)
            *     // TODO: add a code example
            *     //
            *   (end)
            *
            * Returns:
            *   string - user input as a string
            *
            * See Also:
            *    <func_name> <func_name>
            */
            var vout = ko.dialogs.prompt(prompt, label, vdefault, title, mruName);
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiInputBox2(title, prompt, label1, value1, label2, value2, mruName1, mruName2,) ;; quickpane input dialog ">
        this.guiInputBox2 = function(title, prompt, label1, value1, label2, value2, mruName1, mruName2){
            var vout    = ko.dialogs.prompt2(prompt, label1, value1, label2, value2, title, mruName1, mruName2);
            return vout;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiQuickList(title, prompt, items, selectionCondition) ;; get quick input based on a list of choices ">
        this.guiQuickList = function(title, prompt, items, selectionCondition){
          /**
            * Function: guiQuickList
            *   Get quick input based on a list of choices.
            *
            * Parameters:
            *   title   - (string) dialog title
            *   prompt  - (string) dialog prompt
            *   items   - (var) input items for populating the list
            *   selectionCondition  - (string) string option for describing how many items may be selected
            *
            *   (start code)
            *    *selectionCondition* is a string describing how items may be selected
            *        in order for the dialog OK button to be enabled.
            *
            *        The following may be used to specify selectionCondition:
            *            "one-or-more" (the default) requires that one or more items be
            *                selected. By default all items will be selected.
            *            "zero-or-more" allows any number of items to be selected. By
            *                default all items will be selected.
            *            "one" only allows exactly one to be selected. By default the first
            *                item will be selected.
            *   (end)
            *
            *
            * CodeExample:
            *   (start code)
            *     var komain = new tymac_komodo_addon();
            *     var vitems = '';
            *     var vtest;
            *     //simple example
            *     vitems = 'alpha bravo charlie delta'.split(/\s+/);
            *     vtest = komain.guiQuickList('title', 'prompt', vitems, 'one-or-more');
            *     alert(JSON.stringify(vtest));
            *     //example using simpletable aoh
            *     vitems = [{'text':'alpha','id':1},{'text':'bravo','id':2},{'text':'charlie','id':3}];
            *     vtest = komain.guiQuickList('title', 'prompt', vitems, 'one-or-more');
            *     alert(JSON.stringify(vtest));
            *   (end)
            *
            * Returns:
            *   var - user choice or NULL if the user did not make a choice
            */
            var selopt  =   selectionCondition || 'one-or-more';
            var vtest   =   ko.dialogs.selectFromList(title, prompt, items, selectionCondition);
            return vtest;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiGet(items) ;; quickly choose an item from a list. Short name. One argument. No fluff.  ">
        this.guiGet = function(items){
            var vtest;
            var vtitle = 'Choose one';
            vtest   =   this.guiQuickList(vtitle,vtitle,items,'one');
            return vtest;
        }
        //  </reg-fdef>

        //  <reg-fdef ddef=" guiStatus(vtext) ;; put some text on the statusbar ">
        this.guiStatus = function(vtext){
            StatusBar_AddMessage(vtext, "debugger", 5000, true);
        }
        //  </reg-fdef>


    }//end_grp

}
// } </reg-cdef>


// begin_: end
f
