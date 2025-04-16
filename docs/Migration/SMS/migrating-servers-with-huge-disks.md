---
title: Migrating Servers with Huge Disks
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migration
permalink: /docs/migration/sms/migrating-servers-with-huge-disks
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrating Servers with Huge Disks

V1.0 – May 2024

| **Version**       | **Author**               | **Description**      |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-05-07 | Diogo Hatz 50037923      | Initial Version      |
| V1.0 – 2024-05-07 | Wisley da Silva 00830850 | Document Review      |

# Introduction

SMS is an online server migration tool available on Huawei Cloud. During migration, you can resize the disk of the source machine in order to modify its partitions to better suit the target machine scenario. SMS has a restriction on the size of operating system disks, which cannot be larger than 1 TiB.

This document aims to describe the methodology for migrating servers with operating system disks exceeding 1 TiB.

# API Explorer

In order to migrate machines with operating system disks larger than 1 TiB using the SMS tool, you need to create the target server manually and expand the size of its system disk through an API, which is available in the API Explorer environment of Huawei Cloud.

To expand a server's disk, you need to obtain its disk ID. To do this, navigate to the ECS section in the Huawei Cloud console, click the server where the disk is mounted, and then click the desired system disk:

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image5.png)

After obtaining the ID of the disk to be resized, navigate to the API Explorer section of the Huawei Cloud console by hovering over “More”, “Tools”, and “API Explorer”. Select the “Elastic Volume Service EVS” section, and then select the “ResizeVolume” API. Alternatively, click the following link to go directly to the API: <https://console-intl.huaweicloud.com/apiexplorer/#/openapi/EVS/doc?api=ResizeVolume>. 

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image6.png) 
![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image7.png) 
![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image8.png) 

In the API window, fill in the fields in red with the ID of the disk you selected earlier and its new size in GiB. After filling in the blanks, simply click “Debug” and the disk will be resized to the new size:

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image9.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image10.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image11.png)

After resizing the disk of the target server to a size larger than the source server, SMS can be used smoothly to migrate the server to Huawei Cloud.

# References

- EVS API: <https://support.huaweicloud.com/intl/en-us/api-evs/CinderResizeVolumeV3.html>.