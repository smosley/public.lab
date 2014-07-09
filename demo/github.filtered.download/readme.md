# Github Filtered Download

## Overview

This is an idea inspired by XML + XSLT and github.

The goal of this lab is to produce a general-purpose solution for downloading a single output file from github.com, where that output file is auto-generated in the same or similar way that XML + XSLT generates transformations.

### Problem

You want to provide a user with a github.com URL (or an alternate URL that references github) that does three things.

* Specify any arbitrary `source data file` located on github.com
* Specify any arbitrary `transformation rule file` located on github.com
* Specify any arbitrary web-based or cloud-based `transformation engine` that takes the first two elements and produces one (or more) result document(s)

### Goals

* Supply an infrastructure that is entirely URL-based (i.e., the user does not need to download any application or browser plugin).
* Supply a general-purpose framework (i.e., the user is not restricted to XML as the source data file nor XSLT as the transformation rule file).




