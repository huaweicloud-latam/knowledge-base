---
title: Resources Discovery
layout: default
parent: Migration Center (MgC)
grand_parent: Migration
permalink: /docs/migration/mgc/resources-discovery
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Resources Discovery

V1.0 – May 2024

| **Version**       | **Author**               | **Description**       |
| ----------------- | ------------------------ | --------------------- |
| V1.0 – 2024-05-21 | Diogo Hatz 50037923      | Document Translation  |
| V1.0 – 2024-05-21 | Wisley da Silva 00830850 | Document Review       |

# Introduction

Migration Center (MgC) is a tool provided by Huawei Cloud that centralizes the migration, modernization, and optimization of applications on a single platform using services based on Huawei Cloud migration methodologies and best practices. In addition to migration, MgC also enables the discovery and assessment of on-premises resources or those of other cloud vendors.

This document aims to describe the methodology for discovering resources in third-party cloud providers on Huawei Cloud using MgC.

# AK/SK

To perform resource discovery in other cloud providers, it is first necessary to generate an **AK/SK** or **ID and Key** with **read-only** and **list** permissions for **all resources** in the respective cloud for the following services: **EC2, RDS, S3, and EFS**. Below is an example of the policies and read-only permissions required for the EC2 service:

{% include image.html post=page.path file="image3.png" %}

# Performing Resource Discovery over the Internet

<span class="underline">Important:</span> This step must be performed for each account whose resources will be analyzed by MgC.

To perform resource discovery for a given account,
first log in to the [MgC](https://console-intl.huaweicloud.com/mgc/?region=la-south-2&locale=en-us#/new-mgc/overview)
service section in the Huawei Cloud console. In the lower left corner, choose the
**Settings** option and then **Migration Projects**. Click **Create
Project**.

> {% include image.html post=page.path file="image4.png" %}
>
> Choose a name for the project to be created and choose the project type **Complex**, in which there are several applications running whose dependencies are not well defined. Then click **Confirm**
> to create a project.
>
> {% include image.html post=page.path file="image5.png" %}

In the menu on the left, choose the **Application Discovery** option and click **Discover Over Internet** to perform resource discovery
over the Internet.

{% include image.html post=page.path file="image6.png" %}

If a discovery task has already been created previously, the discovery option will be located in the **Discover** option and then **Over Internet**.

{% include image.html post=page.path file="image7.png" %}

Fill in a name for the discovery task and the cloud provider in which the
account whose resources will be analyzed is located. Then, in
**Credential**, click on the **Create** option.

{% include image.html post=page.path file="image8.png" %}

Fill in a name for the credential and in **Authentication** select the
**AK/SK** or **ID and Key** option. Then, enter the key obtained in
item 2.0 of this material and click **Verify and Save**.

{% include image.html post=page.path file="image9.png" %}

Select the registered credential. In the regions field, select all
in **Select All**.

{% include image.html post=page.path file="image10.png" %}

For **Resource Type**, select **Select all** and click **Confirm**.

{% include image.html post=page.path file="image11.png" %}

Wait for the discovery task to finish, and then go back to a previous page

{% include image.html post=page.path file="image12.png" %}

On this page, you can view the analyzed resource types and click on them to see in detail all the discovered resources.

{% include image.html post=page.path file="image13.png" %}

# References

- MgC Documentation: <https://support.huaweicloud.com/intl/en-us/productdesc-mgc/mgc_01_0001.html>.
