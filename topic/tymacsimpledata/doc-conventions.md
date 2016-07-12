# TymacSimpleData Conventions

## Overview

This documentation covers TymacSimpleData conventions

## TymacSimpleData text operations prefixes

* `ii` -- insert -- insert static or dynamic text
* `mm` -- munge  -- filter or transform text
   * `mm decode46` -- base64 decode
   * `mm encode46` -- base64 encode
   
## Tymac MyClip Snippet namespaces

* `rr` -- namespace prefix for Simple Data Record snippet types (SDR)
* `ww` -- namespace prefix for Simple Word snippet types (SW)
* `??rr` -- namespace prefix for Domain-Specific Data Record snippet types (DSDR)
    * example: `pyrr` (python SDR)
    * example: `py3rr` (python3 SDR)
    * example: `plrr` (perl SDR)
