---
title: OBS-triggered Functions
layout: default
parent: FunctionGraph
grand_parent: Compute
permalink: /docs/compute/functiongraph/obs-triggered-functions
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# OBS-triggered Functions

V1.0 – July 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-07-04 | Diogo Hatz d50037923           | Initial Version      |
| V1.0 – 2024-07-04 | Wisley da Silva Paulo 00830850 | Document Review      |

# Objective

This document aims to present the procedures required to create a function in the Huawei Cloud FunctionGraph serverless service with activation by uploading new objects to OBS buckets.

# Agency

To delegate permissions from the object storage (OBS) service to FunctionGraph, it is necessary to create an agency with permissions over OBS. Navigate to the IAM service in the Huawei Cloud console and click the “Agencies” page. Click “Create Agency” to create an agency.

{% include image.html post=page.path file="image3.png" %}

Give the agency a name, select the agency type as “Cloud Service”, and select the FunctionGraph service. Click “Next” to proceed.

{% include image.html post=page.path file="image4.png" %}

Delegate “OBS ReadOnlyAccess” permissions to the agency and click
“Next” and then “OK” to finish.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

# FunctionGraph

Access the FunctionGraph service in the Huawei Cloud console and navigate to
the Functions \> Function List page. Click “Create Function”.

{% include image.html post=page.path file="image7.png" %}

Select the “Create from scratch” option, give the function a name,
select the runtime in which the function will be executed, and select the agency
created in item 2.0 of this document.

{% include image.html post=page.path file="image8.png" %}

Once you have created the function, click “Create Trigger” to create a trigger
for the function to be activated.

{% include image.html post=page.path file="image9.png" %}

Select the Trigger Type as “Object Storage Service (OBS)”,
select the desired bucket and the Event as “ObjectCreated”, so that the
function is activated every time a new object appears in the bucket in question.

It is also possible to configure a prefix and a suffix of the specific objects that will trigger the function, by configuring a Prefix or Suffix.

{% include image.html post=page.path file="image10.png" %}

Having created the trigger, now simply import the code that will be executed by the function in Code Source, such as APIs.

{% include image.html post=page.path file="image11.png" %}

You can also add third-party dependencies and libraries by navigating to the bottom of the function panel.

{% include image.html post=page.path file="image12.png" %}

# Example

In this example, a Python function was written to make a request to a web server running on an ECS every time a new object appears in the bucket defined in item 3.0 of this document.

{% include image.html post=page.path file="image13.png" %}

Uploading an object to the defined bucket:

{% include image.html post=page.path file="image14.png" %}

Result in the server listener:

{% include image.html post=page.path file="image15.png" %}

# References

- FunctionGraph documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_0205.html>
