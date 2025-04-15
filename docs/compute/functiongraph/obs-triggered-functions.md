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
| V1.0 – 2024-07-04 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-07-04 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objective

This document aims to present the procedures required to create a function in the Huawei Cloud FunctionGraph serverless service with activation by uploading new objects to OBS buckets.

# Agency

To delegate permissions from the object storage (OBS) service to FunctionGraph, it is necessary to create an agency with permissions over OBS. Navigate to the IAM service in the Huawei Cloud console and click the “Agencies” page. Click “Create Agency” to create an agency.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image3.png)

Give the agency a name, select the agency type as “Cloud Service”, and select the FunctionGraph service. Click “Next” to proceed.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image4.png)

Delegate “OBS ReadOnlyAccess” permissions to the agency and click
“Next” and then “OK” to finish.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image6.png)

# FunctionGraph

Access the FunctionGraph service in the Huawei Cloud console and navigate to
the Functions \> Function List page. Click “Create Function”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image7.png)

Select the “Create from scratch” option, give the function a name,
select the runtime in which the function will be executed, and select the agency
created in item 2.0 of this document.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image8.png)

Once you have created the function, click “Create Trigger” to create a trigger
for the function to be activated.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image9.png)

Select the Trigger Type as “Object Storage Service (OBS)”,
select the desired bucket and the Event as “ObjectCreated”, so that the
function is activated every time a new object appears in the bucket in question.

It is also possible to configure a prefix and a suffix of the specific objects that will trigger the function, by configuring a Prefix or Suffix.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image10.png)

Having created the trigger, now simply import the code that will be executed by the function in Code Source, such as APIs.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image11.png)

You can also add third-party dependencies and libraries by navigating to the bottom of the function panel.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image12.png)

# Example

In this example, a Python function was written to make a request to a web server running on an ECS every time a new object appears in the bucket defined in item 3.0 of this document.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image13.png)

Uploading an object to the defined bucket:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image14.png)

Result in the server listener:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image15.png)

# References

- FunctionGraph documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_0205.html>
