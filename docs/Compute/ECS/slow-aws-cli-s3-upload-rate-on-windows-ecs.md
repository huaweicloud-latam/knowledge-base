---
title: Slow AWS CLI S3 Upload Rate on Windows ECSs
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Slow AWS CLI S3 Upload Rate on Windows ECSs

# Symptom

The upload speed of S3 AWS CLI will get stuck at 9 MiB/s, regardless of
how large the bandwidth may be, on Windows Server ECSs:

![](/huaweicloud-knowledge-base/assets/images/ECS-Slow-AWS-CLI-S3-Upload-Windows/media/image1.png)

# Solution

Modify the file: “C:\\Users\\Administrator\\.aws\\config” and add the
following parameter:

![](/huaweicloud-knowledge-base/assets/images/ECS-Slow-AWS-CLI-S3-Upload-Windows/media/image2.png)

After the modification, the upload speed will increase according to the
purchased bandwidth:

![](/huaweicloud-knowledge-base/assets/images/ECS-Slow-AWS-CLI-S3-Upload-Windows/media/image3.png)

# References

  - AWS CLI S3 documentation, available at:
    <https://awscli.amazonaws.com/v2/documentation/api/latest/topic/s3-config.html#preferred-transfer-client>.
