---
title: Mounting OBS Bucket on Windows using Rclone
layout: default
parent: Object Storage Service (OBS)
grand_parent: Storage
permalink: /docs/storage/obs/mount-obs-bucket-on-windows-using-rclone
---

# Mounting OBS Bucket on Windows using Rclone

V1.0 – July 2025

| **Version**       | **Author**                          | **Description**      |
| ----------------- | ----------------------------------- | -------------------- |
| V1.0 – 2015-08-15 | Fernando Gabriel Chacon  50037923   | Initial Version      |
| V1.0 – 2015-08-15 | Gabriel Gutierrez  00817435         | Document Review      |

1. Index
{:toc}

## Introduction

Object Storage Service (OBS) is a scalable and secure cloud storage solution provided by Huawei Cloud. 
In many scenarios, users may want to access their OBS buckets directly from a local file system, especially on Windows machines. This is useful for browsing, reading, and even uploading files as if they were stored locally.

Rclone is a powerful open-source command-line tool that supports mounting cloud storage services as virtual drives. 
This guide will walk you through the process of mounting an OBS bucket on Windows using Rclone, enabling seamless access to your cloud storage directly through the Windows Explorer.

## Creating an IAM User 

It’s recommended to create an exclusive IAM User for mounting in order to restrict access to OBS only.

[https://console-intl.huaweicloud.com/iam/#/iam/users/create](https://console-intl.huaweicloud.com/iam/#/iam/users/create)

Select **Access Type**: Programmatic access, and **Credential Type**: Access key.

{% include image.html post=page.path file="create-user.png" alt="Create a new user" %}

**Do not** create or add user to any user group. 

Click **create**.

Download the Access Key (this is the only time it’s available). File `credentials.csv` will be saved.

{% include image.html post=page.path file="download-keys.png" alt="Download the Access Key" %}

{% include image.html post=page.path file="access-key.png" alt="example of AK" %}

## Granting Read/Write Permissions to an IAM User via Bucket Policy on OBS

Instead of adding the user to a group and assigning permissions there, you can grant read/write access directly to the IAM user by creating a bucket policy.

Go to OBS Console → Select your bucket → Permissions → Bucket Policies → Create.

{% include image.html post=page.path file="bucket-policy-create.png" alt="create new bucket policy" %}

1. Type a Policy name (e.g., obs-rw-user-policy).
2. Choose **Current Account** as the principal type.
3. Select the IAM user you just created.
4. Mark the `"Entire Bucket"` checkbox to apply the policy to all objects in the bucket.
5. select `"Bucket Read/Write"` in the **actions** section.
6. Click **Create** to save the policy.

{% include image.html post=page.path file="create-policy-window.png" alt="Create new policy window" %}

## Getting OBS Bucket Name and Endpoint

In the OBS Bucket details page, get the Bucket Name and Endpoint properties values:

{% include image.html post=page.path file="get-bucket-details.png" alt="Getting bucket param" %}

## Download and install WinFSP and Rclone

1. Download and install latest release of WinFSP (only *Core* feature is needed when installing):
[https://github.com/winfsp/winfsp/releases/](https://github.com/winfsp/winfsp/releases/)
2. Download Rclone for Windows: [https://rclone.org/downloads/](https://rclone.org/downloads/)
3. Extract Rclone program files to `C:\rclone`
4. Create two folders inside it: `C:\rclone\conf` and `C:\rclone\logs`

{% include image.html post=page.path file="folder-structure.png" alt="Final folder structure" %}

## Creating configuration file

Create the configuration file with Notepad: `C:\rclone\conf\rclone.txt`.

Add the following content:

```ini
[obs]
type = s3
provider = HuaweiOBS
access_key_id = {ak}
secret_access_key = {sk}
region = {region}
endpoint = {endpoint}
acl = private
```

Replace `{ak}` and `{sk}` with values obtained in `credentials.csv` file

Replace `{endpoint}` with OBS bucket endpoint

Replace `{region}` with endpoint information between `obs.` and `.myhuaweicloud.com` <br>
(e.g. if endpoint is `obs.sa-brazil-1.myhuaweicloud.com`, replace `{region}` with `sa-brazil-1`)

{% include image.html post=page.path file="create-configuration-file.png" alt="config file created" %}

## Test OBS Bucket mounting

Open PowerShell and run the following command (`replace {bucket-name}`):

```shell
C:\rclone\rclone.exe mount "obs:/{bucket-name}" X: --config C:\rclone\conf\rclone.txt
```

The OBS Bucket should be mounted to the X: drive and it will stay mounted until the command is running in PowerShell.

Press Ctrl+C in PowerShell to unmount.

{% include image.html post=page.path file="test-mount-command.png" alt="Testing mount command" %}

## Mount at Windows startup

If you wish to mount the OBS bucket at Windows startup:

Download NSSM: [https://nssm.cc/download](https://nssm.cc/download)

Open the ZIP file and extract the `nssm-x.xx\win64\nssm.exe` file into the `C:\rclone` folder <br>
Open PowerShell and run the following command: `C:\rclone\nssm.exe install Rclone-OBS` <br>

In the Window that opens, configure the following parameters (Application tab):

- Path: `C:\rclone\rclone.exe`
- Startup directory: `C:\rclone`
- Arguments: `mount "obs:/{bucket-name}" X: --config C:\rclone\conf\rclone.txt`

{% include image.html post=page.path file="nssm-application-config.png" alt="NSSM set  param in application tab" %} 

In the I/O tab, configure the following parameters:

- Output (stdout): `C:\rclone\logs\mount.txt`
- Error (stderr): `C:\rclone\logs\mount.txt`

{% include image.html post=page.path file="nssm-IO-config.png" alt="NSSM set  param in IO tab" %} 
    
In the File Rotation tab, configure the following parameters:

- Check **Rotate files**
- Check **Rotate while service is running**
- Set **Restrict rotation to files bigger than** to “10000000” (~10MB)

{% include image.html post=page.path file="nssm-fr-config.png" alt="NSSM set  param in file rotation tab" %} 

Click **Install service**

Run the following command:
```shell
C:\rclone\nssm.exe start Rclone-OBS
```
The OBS bucket should be mounted.

Reboot to confirm it’s working.
    
{% include image.html post=page.path file="test-after-reboot.png" alt="Testing after rebboting" %}

## References
1. OBS – Access Keys (AK/SK): [https://support.huaweicloud.com/intl/en-us/productdesc-obs/obs_03_0208.html](https://support.huaweicloud.com/intl/en-us/productdesc-obs/obs_03_0208.html)
2. Rclone – Install: [https://rclone.org/install/](https://rclone.org/install/). Access date: 2023-01-27
3. Rclone – S3 Storage Providers – Huawei OBS: [https://rclone.org/s3/#huawei-obs](https://rclone.org/s3/#huawei-obs). Access date: 2023-01-27

