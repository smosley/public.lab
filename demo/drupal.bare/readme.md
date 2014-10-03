---
context:      Drupal7
audience:     Themer, Developer, Site-builder
difficulty:   
time: 
---


# Drupal bare page content 


## Overview

* **Context:** Drupal7
* **Audience:** Themer, Developer, Site-builder
* **Difficulty:** low/medium
* **Time:** Less than an hour

Sometimes it may be necessary to populate a Drupal node with HTML markup that works in a way that was not originally anticipated by the theme originator. 

This scenario is partially inspired by and described  in the following blog post  ["Make a custom HTML page in Drupal without file access or custom templates"](https://duckduckgo.com/?q=%22Make+a+custom+HTML+page+in+Drupal+without+file+access+or+custom+templates%22) **Hereinafter [fn01]**. (credit: Fri, 10/14/2011 - 13:42 — Charlie) 

For example:

* you may need to port one or more pages from another site into drupal
* you may need to quickly construct a custom landing page on one or more sections of the site
* you may have content that depends on a front-end MVC library not yet supported by your theme or modules
 
### Motivation

The basic motivation for this write-up is to demonstrate a basic developer mindset: *PHP variable paths in Drupal can be likened to file and directory paths in a computer file system*. Understanding and applying this mindset can help enhance problem-solving skills for PHP developers in general, and Drupal developers in specific.

For those who are familiar with operating systems or any electronic device that uses a "files and folders" metaphor, one might liken the recommended use of the Devel module as the equivalent of a "finder window" or "explorer window" of the old-time operating systems, wherein such tools were critical for finding components necessary to make the engine work the way it works; including favorable participation and interaction with those entrusted with its working.

(see e.g., http://en.wikipedia.org/wiki/Windows_Explorer, further illuminating the analogy; critical PHP values necessary for excercising certain elements of your site are stored in a nested irregular "tree structure" not unlike those invoked by this analogy)

## Step by step

The following is a step-by-step walkthrough to augment the content at **[fn01]**. 

### Install and enable the devel module

Install and enable thd devel module. 

The devel module is extremely useful in finding the internals of critical variables on your Drupal site. It is recommended for use only on development sites, and should only be used if you are skilled enough to comfortably work with and understand PHP internals.

We will use it to locate the appropriate PHP variable path to the output value of the node body. This is what we want to capture, and it may change depending on the Drupal release, which is why we use the devel module.

![drupal devel module aa](https://cloud.githubusercontent.com/assets/4074354/3652568/33317582-113e-11e4-9352-505eb796874e.png)

* **NOTE:**
  * The Devel module is very powerful, and consequently capable of momentarily disabling access to your site. Ideally, it is best to maintain two versions of your site, one for development (internal-developer access only) and one for production (customer and end-user access). It is assumed for the purposes of this writeup that you have such a setup and will be using Devel on the development version of your site. See below for important tips if you are using Devel on a production site.

### Create the bare tpl.php file with the initial barebones content

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
* **NOTE:** 
  * _dpm()_ is a [devel shortcut](https://api.drupal.org/api/devel/devel.module/function/dpm/7) for _drupal_set_message()_. If you leave _dpm()_ in your custom code and disable the devel module you may experience the [WSOD](https://www.drupal.org/node/158043) due to the critcal PHP error.
It is recommended that you use _drupal_set_message()_ or be sure to comment out / remove dpm() calls prior to using this code in a production state.

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
   print($node->body[ $node->language ][0]['value']);
```

* **NOTE:** The PHP variable path we are after in this case is `$node->body['und'][0]['value']` but there is a gotcha.
   * We use indirection (variable crossreference) to point to `$node->language` instead of 'und' because we do not want the code to break if someone changes the value corresponding to `$node->language`

## See also

|reference| caption | link |
|:--------|:---------|:------|
|fn01     | theme-independent landing pages | http://www.csdesignco.com/comment/990 |
|fn02     | ddg search per fn01 | [ddg search for fn01](https://duckduckgo.com/?q=%22Make+a+custom+HTML+page+in+Drupal+without+file+access+or+custom+templates%22) |
|fn03  | drupal static_page module | https://github.com/dreftymac/dreftymac.public.lab/blob/master/demo/drupal.bare/drupal.static.page.md|
