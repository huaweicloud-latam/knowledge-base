---
title: Creating a Private OracleOS 7.9 Image
layout: default
parent: Image Management Service (IMS)
grand_parent: Compute
permalink: /docs/compute/ims/Creating a Private OracleOS 79 Image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating a Private OracleOS 7.9 Image

V1.0 – June 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-06-06 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-06-06 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objective

This document aims to present the procedures required to
create an OracleOS 7.9 image using the IMS service.

# Creating an OracleOS image

Download the OracleOS ISO image (example - <https://yum.oracle.com/oracle-linux-isos.html>) and upload it to OBS.

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image3.png)

## Import the OracleOS ISO image into the IMS service.

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image6.png)

## Create an ECS using the image created by importing the ISO image.

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image8.png)

## Access the instance and open the shell terminal

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image9.png)

## Bind an EIP to the machine

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image10.png)

## Install KVM

Add the KVM drivers in the file: “/etc/dracut.conf”:

```shell
vi /etc/dracut.conf

virtio_blk virtio_scsi virtio_net virtio_pci virtio_ring virtio
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image11.png)

```shell
dracut -f /boot/initramfs-2.6.32-573.8.1.el6.x86\_64.img
```

Replace “initramfs-2.6.32-573.8.1.el6.x86\_64.img” with the initramfs
used by your current kernel. To verify the initramfs file per kernel, look in the /boot/grub2/grub.cfg file.

To verify that the drivers have been installed, type the following command

```shell
lsinitrd /boot/initramfs-\`uname -r\`.img | grep virtio
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image12.png)

## Edit the eth0 network interface

```shell
vi /etc/sysconfig/network-scripts/ifcfg-eth0
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image13.png)

## Install and configure cloud-init

```shell
yum update -y

yum install cloud-init -y
```

## Install the HWC password reset plugin

```shell
vi /etc/selinux/config
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image14.png)

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

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image15.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image16.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image18.png)