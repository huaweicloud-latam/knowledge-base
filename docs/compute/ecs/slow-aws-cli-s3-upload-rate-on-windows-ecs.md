---
title: Slow AWS CLI S3 Upload Rate on Windows ECSs
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
permalink: /docs/compute/ecs/slow-aws-cli-s3-upload-rate-on-windows
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Slow AWS CLI S3 Upload Rate on Windows ECSs

V1.0 – August 2024

| **Version**       | **Author**            | **Description**      |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-08-09 | Diogo Hatz 50037923   | Document Translation |
| V1.0 – 2024-08-10 | Wisley Paulo 00830850 | Document Review      |

# Symptom

The upload speed of S3 AWS CLI will get stuck at 9 MiB/s, regardless of
how large the bandwidth may be, on Windows Server ECSs:

{% include image.html post=page.path file="image1.png" %}

# Solution

Modify the file: “C:\\Users\\Administrator\\.aws\\config” and add the
following parameter:

{% include image.html post=page.path file="image2.png" %}

After the modification, the upload speed will increase according to the
purchased bandwidth:

{% include image.html post=page.path file="image3.png" %}

# References

  - AWS CLI S3 documentation, available at:
    <https://awscli.amazonaws.com/v2/documentation/api/latest/topic/s3-config.html#preferred-transfer-client>.
