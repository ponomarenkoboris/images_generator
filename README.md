### token_metadata 
See a complete documentation [here](https://docs.metaplex.com/nft-standard).

Field  | Type |  Description
|:----:|:----:|:----:|
name | string | name of the asset
symbol | string | symbol of the asset
description | string | description of the asset
seller_fee_basis_points | number | royalties percentage awarded to creators (5% - 500; 10% - 1000)
image | string | URL to the image of the asset (leave blank)
attributes | array | contains parts of the asset
collection | object | contains info about asset collection
properties | object | contains info about creators, files and category

#### collection
Field | Type | Description
|:----:|:----:|:----:|
name | string | collection name
family | string | collection family name

#### properties 
Field | Type | Description
|:----:|:----:|:----:|
files | array | array of objects, that contains image uri and image type
category | string | one of valid asset category
creators | array | array of objects, that contains field with creator address and percentage of seller_fee_basis_points (5% - 500; 10% - 1000)   

### output_image_configuration
Name | Type | Description
|:----:|:----:|:----:|
size | object | asset resolution
backgroud-color-rgba | array | asset background color (in rgba)

