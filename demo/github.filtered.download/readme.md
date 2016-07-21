# Github Filtered Download

## Overview

This is an idea inspired by:

* github
* Perl Filter::simple
* XML + XSLT 
* https://guides.github.com/

The goal of this lab is to produce a general-purpose solution for downloading a single output file from github.com, where that output file is auto-generated in the same or similar way that XML + XSLT generates transformations.

## Discoveries

* https://diecutter.alwaysdata.net/rawgithub/diecutter/python-startproject/index.html
    * a project that appears to be the same or similar idea
* runnable.io
   * someone is already making a business model out of this idea
   * https://github.com/dreftymac/public.lab/issues/3

### Problem

You want to provide a user with a github.com URL (or an alternate URL that references github) that does three things.

* Specify any arbitrary `source data file` located on github.com
* Specify any arbitrary `transformation rule file` located on github.com
* Specify any arbitrary web-based or cloud-based `transformation engine` that takes the first two elements and produces one (or more) result document(s)

### Goals

* Supply an infrastructure that is entirely URL-based (i.e., the user does not need to download any application or browser plugin).
* Supply a general-purpose framework (i.e., the user is not restricted to XML as the source data file nor XSLT as the transformation rule file).

### See also

* http://rawgit.com/
* http://docs.puppetlabs.com/hiera/1/index.html#hiera-1
* https://github.com/daltonmatos/codepad
* https://metacpan.org/pod/Filter::Simple
* http://stackoverflow.com/questions/23873630/how-to-get-github-raw-file-contents-with-php
* https://developer.github.com/changes/2014-02-21-gist-raw-file-url-change/
* http://code.lancepollard.com/github-as-a-cdn/
* http://paulhammant.com/blog/github-as-a-cms-to-end-cmses.html
* https://github.com/blog/1327-creating-files-on-github
* http://stackoverflow.com/questions/998832
* http://stackoverflow.com/questions/8446218/how-to-see-an-html-page-on-github-as-a-normal-rendered-html-page-to-see-preview
