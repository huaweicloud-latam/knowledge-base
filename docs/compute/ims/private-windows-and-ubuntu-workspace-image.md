---
title: Creating a Private Windows 10 and Ubuntu Workspace Image
layout: default
parent: Image Management Service (IMS)
grand_parent: Compute
permalink: /docs/compute/ims/creating-a-private-windows-10-and-ubuntu-workspace-image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating a Private Windows 10 and Ubuntu Workspace Image

V1.0 – November 2023

| **Version**       | **Author**                     | **Description** |
| ----------------- | ------------------------------ | --------------- |
| V1.0 – 2023-11-09 | Wisley da Silva Paulo 00830850 | Initial version |

# Objective

This document aims to collect and formalize the information required for
implementing the creation of private images in the IMS service to be
used in the Huawei Cloud Workspace service.

# Creating a Windows 10 image

1. Download the Windows 10 ISO image from the Microsoft website.

2. Download the packages as shown in the link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0507.html>) and add them to a bucket to facilitate transfer to the machine at the time of installation.

3. After downloading the Windows 10 ISO image and all the packages, perform the procedure in the link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0508.html>) to add drivers to the ISO file.

4. Start the installation and configure the driver as shown in the link (<https://support.huaweicloud.com/intl/en-us/usermanual-ims/en-us_topic_0146474784.html>).

5. Access the CD, open the vmtools folder that was added to the ISO, and install vmtools.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image3.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image4.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image5.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image6.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image7.png)

### Activate the Administrator user by right-clicking on the start button, accessing the “Computer Management” option, accessing the “Local User...” option, then “User”, right-click on the Administrator user, properties and then uncheck the option to disable the user. Repeat the procedure to access the user and set a password for the user. Log off with the current user and log in with the Administrator user.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image8.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image9.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image10.png)

### Make the settings indicated in the link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0510.html>) **up to item 56**.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image11.png)

### Ignore the item marked in red in this item.

### You can ignore items 40 to 49

### Items 50 to 56 are just checks (adjustment is rarely required).

Install the software listed in the link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0510.html>) from item 57 onwards.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image12.png)

### Check in the control panel if the programs have been installed

### Before installing the latest tool (Workspace\_HDP\_WindowsDesktop\_Installer) make sure that all operating system updates have been performed, otherwise you may receive the error:

![C:\\Users\\w00830850\\AppData\\Roaming\\eSpace\_Desktop\\UserData\\w00830850\\imagefiles\\130E24AA-8D4F-40C5-8D3C-CA991947FBDC.png](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image13.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image14.png)

### This command has an error the marked word is missing a letter “n” the correct command is: run\_silent.bat --passive --environment\_type 2 --nocheck --noshutdown

### When initializing, Administrator access will be unavailable. Log in with the user created during installation and set a new password for Administrator. Log in with Administrator to complete the procedure.

### With all the instance adjustments made, we now use ECS to create the image. Just stop ECS and in the more option select “Manage Image” and then Create Image.

### ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image15.png)

### With the image created and appearing in the IMS service, it is now available to be used in the Workspace service.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image16.png)

# Creating Ubuntu image

### Download the Ubuntu Desktop ISO image (supported at the time of writing are 18.04.5-desktop-amd64 or ubuntu-20.04.5.0-desktop-amd64 - <https://mu.releases.ubuntu.com/20.04.5/> - <https://old-releases.ubuntu.com/releases/18.04.5/>) and upload it to OBS.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image17.png)

## Import the Ubuntu ISO image into the IMS service.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image18.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image19.png)

## ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image20.png)

## Create an ECS using the image created by importing the ISO image.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image21.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image22.png)

## Access the instance and open the shell terminal

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image23.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image24.png)

## Install the libxcb-xinerama0, gawk packages

```shell
sudo su
apt update
apt install libxcb-xinerama0 -y
apt install gawk -y
```

## Install the Linux Kernel (For Ubuntu 20.04 Only)

```shell
apt install linux-image-5.15.0-72-generic -y
apt install linuxheaders-5.15.0-72-generic -y
apt install linux-modules-extra-5.15.0-72-generic -y
grep menuentry /boot/grub/grub.cfg
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image25.png)

## Record the location of version 5.15.0-72, as shown in the kernel figure:

```shell
sudo nano /etc/default/grub
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image26.png)

## Install and start openssh

```shell
apt update
apt install openssh-server -y
service sshd start
```

## Configure sshd.conf

```shell
nano /etc/ssh/sshd_config
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image27.png)

## Install python 3

```shell
apt install python3 -y
python3 --version
```

## Install and configure cloud-init

```shell
apt install cloud-init -y
nano /etc/cloud/cloud.cfg
```

### Change the disable\_root parameter to false, add the lines at the end
of the file, adjust the config modules by commenting out the “locale” line, in the
initialization module list place ssh as the first item:

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image28.png)

```shell
datasource_list: [ OpenStack ]
datasource:
  OpenStack:
    metadata_urls: ['http://169.254.169.254']
    max_wait: 120
    timeout: 5
network:
  config: disabled
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image29.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image30.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image31.png)

### Check cloud-init, if any error occurs try restarting the instance and run the command again:

```shell
sudo cloud-init init --local
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image32.png)

## Install KVM

### Add the virtio drivers to the file: “/etc/initramfs-tools/modules”:

```shell
nano /etc/initramfs-tools/modules

virtio_blk
virtio_scsi
virtio_net
virtio_pci
virtio_ring
virtio
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image33.png)

```shell
update-initramfs -u
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image34.png)

## Download the HDA package

```shell
wget https://workspace-hdp-gray-cn-east-3.obs.cn-east-3.myhuaweicloud.com/WorkspaceHDP/HDPAgent/23.05.5/Workspace_HDP_LinuxDesktop_23.5.5.0922.iso
cp Workspace_HDP_LinuxDesktop_23.5.5.0922.iso /tmp
```

## Install HAD

```shell
mount /tmp/Workspace_HDP_LinuxDesktop_23.5.5.0922.iso /mnt
cd /mnt
/bin/bash autorun.sh

# The system will restart

rm -rf /tmp/Workspace_HDP_LinuxDesktop_23.5.5.0922.iso
cat /usr/local/hdpserver/version.txt
sudo apt-mark hold `uname -r`
```

## Clear cache

```shell
cd /usr/local/hdpserver/hwsysagent/scripts20
bash cleanCache.sh
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image35.png)


```shell
touch /usr/share/glib-2.0/schemas/19_mysettings.gschema.override
nano /usr/share/glib-2.0/schemas/19_mysettings.gschema.override
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image36.png)

```shell
sudo glib-compile-schemas /usr/share/glib-2.0/schemas
```

## Stop the instance and create the image

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image37.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image38.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image39.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-and-ubuntu-workspace-image/image40.png)