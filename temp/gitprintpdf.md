## Overview

This is a step-by-step walkthrough on how to construct a transaction request URL for the BAO e-commerce service.

This walkthrough provides a developer with sufficient information on how to construct valid and well-formed transaction-requests.

A complete transaction-request URL looks like this:

```
https://listener.uoregon.edu/bao-quikpay/web/listener.php?noop=x
  &apiVer=1.5.2012
  &qpDest=test
  &sourceId=<<PrivateString>>
  &deptId=<<RelevantDepartmentId>>
  &deptLabel=<<RelevantDepartmentLabel>>
  &detail=fake_submission_formid_01
  &exSubmitId1=fake_lookup_id_01
  &exSubmitId2=fake_lookup_id_02
  &li_Qty_1=1
  &li_Price_1=3000
  &li_FisIndex_1=ABC123
  &li_FisAcct_1=06403
  &li_FisActy_1=UOP
  &li_Sku_1=sgfwchldb24.conf
  &li_Label_1=2017+Basket+Weaving+Conference
  &li_Qty_2=2
  &li_Price_2=1500
  &li_FisIndex_2=ABC456
  &li_FisAcct_2=23999
  &li_FisActy_2=
  &li_Sku_2=shirtsm.prod
  &li_Label_2=Small+Shirt
  &contentEmbedded=true
```

Some values in the above URL are contingent on the specific UO Department, and are indicated with double angle-brackets.

## Step 001: Gather the product details for the products to sell

Below is a sample table of products and events.

Prior to accepting any payments or submitting any transaction requests, the UO Department must first gather an inventory of all products that will be made available for potential purchse.

The descriptors for the fields and values are detailed below.

| ProdLabel | ProdFisIndex | ProdFisAccountCode | ProdFisActivityCode | ProdSKU          | ProdUnitPrice    |
|-----------|--------------|--------------------|---------------------|------------------|------------------|
| 2017 Basket Weaving Conference | ABC123 | 06403 | UOP | sgfwchldb24.conf | 30.00
| Large Shirt                    | ABC456 | 23999 |     | shirtlg.prod     | 15.00
| Medium Shirt                   | ABC456 | 23999 |     | shirtmd.prod     | 15.00
| Small Shirt                    | ABC456 | 23999 |     | shirtsm.prod     | 15.00

## Step 002: Encode the product details into a URL-compatible format

* Below is a sample ASCII-encoding of one of the above products.
* The current system version does not permit Unicode encoding.

| DetailName  | URLCompatibleName | URLCompatibleValue | Optarity | Notes
|:----------- |:-----------|:--------------|:----|:----|
| **ProdFisIndex**        | FisIndex  | ABC123                         | (required) | Must be a legitimate BANNER FIS Index, verified by accounting. |
| **ProdFisAccountCode**  | FisAcct   | 06403                          | (required) | Must be a legitimate BANNER FIS AccountCode, verified by accounting. |
| **ProdFisActivityCode** | FisActy   | UOP                            | (optional) | Zero or One BANNER FIS ActivityCode is permitted |
| **ProdSKU**             | Sku       | sgfwchldb24.conf               | (required) | Shop-Keeping-Unit (a made-up value may be supplied if the product is not registered). |
| **ProdLabel**           | Label     | 2017+Basket+Weaving+Conference | (required) | Human-Friendly product label. |
| **ProdUnitPrice**       | Price     | 3000                           | (required) | Price must be specified in cents (USD) No punctuation or non-numeric characters permitted. |

* **Note**: some departments may not have a product SKU for each offering, prior to getting established. If this is the case, it is sufficient to simply assign a unique string (such as a unix timestamp) to each product offering within the overall inventory, and assign it at the same time that the product purchase price is established.

## Step 003: Determine the per-transaction-request settings

* Before taking payments, it is necessary to first specify the correct settings for departmental commerce activity.
* These settings may be changed on a per-transaction-request basis.
* It is recommended to first tweak these settings in `test` mode to make sure they behave as expected.
* Unless otherwise specified, all settings must be ASCII-encoded with a length of no more than 32 characters.

| SettingsParamName | SettingsParamValue | Optarity | Notes
|:-----------|:--------------|:----|:----|
| `apiVer`          | `1.5.2012` | (required) | Specify the payment gateway API version when submitting requests.|
| `qpDest`          | `test` or `prod` | (required) | Simulated payments are done using `test` mode. Real payments require `prod` mode.|
| `contentEmbedded` | `true` or `false` | (optional) | Set this to `true` if the payment request is going to be hosted inside an IFRAME on the departmental site.|
| `deptId`          | `AEI` | (required) | Set this to the official machine-friendly registered departmentId. |
| `deptLabel`       | `American+English+Institute` | (required) | Set this to a human-friendly representation of departmentId. |
| `description`     | `<<ShortDescription>>` | (required) | This is any short human-friendly reminder that will show up on the proof of purchase. |
| `detail`          | `<<ShortDetail>>` | (required) | This is any short human-friendly reminder that will show up on the proof of purchase. ;;
| `sourceId`        | `<<PrivateString>>` | (required) | This is a private value that the web developer should have obtained when getting started with the ecommerce service. |

* Additional Details
    * `qpDest` may alternately be specified as `pgateMode`
    * when `qpDest` is in `test` mode, additional warning screens are displayed to indicate the transaction is only simulated

## Step 004: Determine the products to be sold on a per-transaction-basis

* For each submitted transaction-request, payment must be specified for one or more products.
* Products are specified as price_times_quantity line_item entries (aka li_offering).
* Each li_offering must specify a nonzero positive price (in USD cents) and a nonzero positive quantity (integer)
* Each li_offering must specify a common prefix_identifier which consists of the token `li_` (lowercase li followed by a single underscore).
* The li_offering prefix_identifier is used as a namespace for all price_times_quantity line_item entries, and must be included for all li_offering rows.
* Each li_offering must specify a common suffix_identifier which is used to normalize and group the input data.
* The suffix_identifier in the table below is `_itemx`, however this is usually just an integer to count the total number of li_offering items.
* The suffix_identifier must be ASCII-encoded, with alphanumeric characters only, prefixed with a single underscore character.
* The suffix_identifier must consist of 12 or fewer characters.

|ItemSchema       |ItemDatatype    |Optarity          |Description
|:----------------|:----------------|:----------------|:----------------|
|price_itemx     |  dollar amount  |  required     | dollar amount must represented in pennies (e.g., 1000 for ten dollars)
|quantity_itemx  |  integer        |  required     | quantity must be represented as nonzero positive integer (zero quantity not supported)
|fisindex_itemx  |  string         |  required     | banner fis index for this li_offering
|fisacct_itemx   |  string         |  required     | banner fis account for this li_offering
|fisacty_itemx   |  string         |  optional     | banner fis activity for this li_offering

* The following "Before and After" diagram provides an example.

### BEFORE

Prospective customer wishes to buy 1 (one) conference registration and 2 (two) small shirts for a specific transaction-request.

```
  ## conference registration
  Qty=1
  Price=3000
  FisIndex=ABC123
  FisAcct=06403
  FisActy=UOP
  Sku=sgfwchldb24.conf
  Label=2017+Basket+Weaving+Conference

  ## small shirt
  Qty=2
  Price=1500
  FisIndex=ABC456
  FisAcct=23999
  FisActy=
  Sku=shirtsm.prod
  Label=Small+Shirt

```

### AFTER
```
  ## conference registration
  li_Qty_1=1
  li_Price_1=3000
  li_FisIndex_1=ABC123
  li_FisAcct_1=06403
  li_FisActy_1=UOP
  li_Sku_1=sgfwchldb24.conf
  li_Label_1=2017+Basket+Weaving+Conference

  ## small shirt
  li_Qty_1=2
  li_Price_1=1500
  li_FisIndex_1=ABC456
  li_FisAcct_1=23999
  li_FisActy_1=
  li_Sku_1=shirtsm.prod
  li_Label_1=Small+Shirt
```

## Step 005: When ready to take payment for one or more products, submit values via GET or POST

* The following is a well-formed URL that has spaces and indentation for readability.
* A real submission must not have the additional indentation or superfluous whitespace.
* An additional superfluous `noop` parameter is added here, solely for the sake of readability.
* The `sourceId` parameter has a non-valid value here for privacy reasons, make sure to populate this with a valid value.

```
https://listener.uoregon.edu/bao-quikpay/web/listener.php?noop=x
  &apiVer=1.5.2012
  &qpDest=test
  &sourceId=<<PrivateString>>
  &deptId=AEI
  &deptLabel=American+English+Institute
  &detail=fake_submission_formid_01
  &exSubmitId1=fake_lookup_id_01
  &exSubmitId2=fake_lookup_id_02
  &li_Qty_1=1
  &li_Price_1=3000
  &li_FisIndex_1=ABC123
  &li_FisAcct_1=06403
  &li_FisActy_1=UOP
  &li_Sku_1=sgfwchldb24.conf
  &li_Label_1=2017+Basket+Weaving+Conference
  &li_Qty_2=2
  &li_Price_2=1500
  &li_FisIndex_2=ABC456
  &li_FisAcct_2=23999
  &li_FisActy_2=
  &li_Sku_2=shirtsm.prod
  &li_Label_2=Small+Shirt
  &contentEmbedded=true

```

## See also

* (private) github gist           ;; https://gist.github.com/dreftymac/caf5af970ebf86b2d64804a88ead1256
* (internal) documentation        ;; href="smartpath://mytrybits/u/tryuoregon/dotproject/joey/markdown/ddgen-dmundra-preview.yaml" find="water_told_widgets"
* (internal) AEI-specific example ;; href="smartpath://mymedia/2014/git/github/baolistener2016/.dev/txt/demolistener2012url.txt" find="orbits_inc_freakish"
* (internal) PDF markdown         ;; href="smartpath://mydaydirs/2016/week35/devlog.txt" find="brian_tolbert_junior"
