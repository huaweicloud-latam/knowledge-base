---
title: Creating a Private OracleOS 9.4 Image
layout: default
parent: Image Management Service (IMS)
grand_parent: Compute
permalink: /docs/compute/ims/creating-a-private-oracle-os-9-4-image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating a Private OracleOS 9.4 Image

V1.0 – June 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-06-06 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-06-06 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objective

This document aims to present the procedures required to
create an OracleOS 9.4 image using the IMS service.

# Creating an OracleOS image

Download the Ubuntu Server ISO image (example - <https://yum.oracle.com/oracle-linux-isos.html>) and upload it to OBS.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image3.png)

## Import the OracleOS ISO image into the IMS service.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image4.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image5.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image6.png)

## Create an ECS using the image created by importing the ISO image.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image7.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image8.png)

## Access the instance and open the shell terminal

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image9.png)

## Bind an EIP to the machine

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image10.png)

## Install and configure cloud-init

```shell
yum update -y

yum install cloud-init -y
```

## Install the HWC password change plugin

```shell
vi /etc/selinux/config
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image11.png)

```shell
systemctl reboot

wget
<https://ap-southeast-2-cloud-reset-pwd.obs.ap-southeast-2.myhuaweicloud.com/linux/64/reset_pwd_agent/CloudResetPwdAgent.zip>

unzip CloudResetPwdAgent.zip

cd CloudResetPwdAgent/CloudResetPwdAgent.Linux

chmod +x setup.sh

sudo sh setup.sh

chmod 700 /CloudrResetPwdAgent/bin/cloudResetPwdAgent.script

chmod 700 /CloudrResetPwdAgent/bin/wrapper

chmod 600 /CloudrResetPwdAgent/lib/\*

systemctl start cloudResetPwdAgent

systemctl enable cloudResetPwdAgent
```

## (optional) Change the default kernel of Grub to the kernel that will be used

<https://docs.oracle.com/en/learn/oracle-linux-kernels/#change-the-default-kernel>

## (optional) If any of the kernels show errors during boot, type the following command

```shell
dracut --regenerate-all –force
```

## Stop the instance and create the image:

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image12.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image13.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image14.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-oracle-9.4-image/image15.png)