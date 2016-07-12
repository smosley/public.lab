# TymacSimpleData Conventions

## Overview

This documentation covers TymacSimpleData conventions

## TymacSimpleData text operations prefixes

* `ii` -- insert -- insert static or dynamic text
* `mm` -- munge  -- filter or transform text
   * `mm decode46` -- base64 decode
   * `mm encode46` -- base64 encode
   
## Tymac MyClip Snippet namespaces

* `rr` -- namespace prefix for SimpleDictionary snippet types (SDR)
* `ww` -- namespace prefix for SimpleWord snippet types (SW)

### Prefixed namespaces for domain-specific snippet types
* `??rr` -- language-specific namespace prefix 
    * example: `pyrr` (python SDR)
    * example: `py3rr` (python3 SDR)
    * example: `plrr` (perl SDR)
