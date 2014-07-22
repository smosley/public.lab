# Drupal bare page content 


## Overview

Context: Drupal7

Sometimes it may be necessary to populate a Drupal node with HTML markup that works in a way that was not originally anticipated by the theme originator. 

This scenario is partially inspired by and described  in the following blog post  ["Make a custom HTML page in Drupal without file access or custom templates"](https://duckduckgo.com/?q=%22Make+a+custom+HTML+page+in+Drupal+without+file+access+or+custom+templates%22) **Hereinafter [fn01]**. (credit: Fri, 10/14/2011 - 13:42 — Charlie) 

For example:

* you may need to port one or more pages from another site into drupal
* you may need to quickly construct a custom landing page on one or more sections of the site
* you may have content that depends on a front-end MVC library not yet supported by your theme or modules
 

## Step by step

The following is a step-by-step walkthrough to augment the content at **[fn01]**. 

### Install and enable the devel module

Install and enable thd devel module. 

The devel module is extremely useful in finding the internals of critical variables on your Drupal site. It is recommended for use only on development sites, and should only be used if you are skilled enough to comfortably work with and understand PHP internals.

We will use it to locate the appropriate PHP variable path to the output value of the node body. This is what we want to capture, and it may change depending on the Drupal release, which is why we use the devel module.

![drupal devel module aa](https://cloud.githubusercontent.com/assets/4074354/3652568/33317582-113e-11e4-9352-505eb796874e.png)


### Create the bare tpl.php file with the necessary content necessary 

We want a tpl file that will help us to find the relevant PHP variable path, and we want it to be active whenever viewing "Bare Page" content type.

* If your new content type has the drupal machine_name 
    * `bare_page` then you will want to create a *.tpl.php file called 
    * `node--bare-page.tpl.php` 
* If your new content type has the drupal machine_name 
    * `barepage` then you will want to create a *.tpl.php filed called 
    * `node--barepage.tpl.php`

The file should have the following content:

```
<?php
   dpm($node);
```

Save the file to the appropriate location on your drupal site:

```
/var/www/html/mysite/sites/all/themes/foobartheme/node--bare-page.tpl.php
```

### Use the devel module to locate the relevant PHP variable path

Drupal uses densely reticulated and nested PHP variable paths that can be somewhat irregular and change depending on the version of Drupal you are using. Because of this, we use the Devel module to drill down to the specific branch of the nested PHP variable that contains the data that we want.

When you find the relevant path, make a note of it and re-edit your tpl file.

![drupal devel module](https://cloud.githubusercontent.com/assets/4074354/3652567/30507c1e-113e-11e4-94dd-7c55961fd002.png)

### Re-edit the tpl file to point to the PHP variable path that we found

In this example, the file should have the following content:

```
<?php
   print($node->body[ $node->language ][0]['value'];
```

* **NOTE:** The PHP variable path we are after in this case is `$node->body['und'][0]['value']` but there is a gotcha.
   * We use indirection (variable crossreference) to point to `$node->language` instead of 'und' because we do not want the code to break if someone changes the value corresponding to `$node->language`

## See also

|reference| caption | link |
|:--------|:---------|:------|
|fn01     | theme-independent landing pages | http://www.csdesignco.com/comment/990 |
|fn02     | ddg search per fn01 | [ddg search for fn01](https://duckduckgo.com/?q=%22Make+a+custom+HTML+page+in+Drupal+without+file+access+or+custom+templates%22) |
