---
title: Creating a Private Ubuntu Image
layout: default
parent: Image Management Service (IMS)
grand_parent: Compute
permalink: /docs/compute/ims/creating-a-private-ubuntu-image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating a Private Ubuntu Image

V1.0 – November 2023

| **Version**       | **Author**                     | **Description** |
| ----------------- | ------------------------------ | --------------- |
| V1.0 – 2023-11-20 | Wisley da Silva Paulo 00830850 | Initial version |

# Objective

This document aims to present the necessary procedures for
creating an Ubuntu 20.04 image with UEFI using the IMS service.

# Creating an Ubuntu image

## Download the Ubuntu Server ISO image (example - <https://releases.ubuntu.com/focal/>) and upload it to OBS.

{% include image.html post=page.path file="image3.png" %}

## Import the Ubuntu ISO image into the IMS service.

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

Note: At the time of creating this document, when we select UEFI and Ubuntu, the options for versions 18.04 and 20.04 do not appear, but this was reported to the product team, who informed us and the change will be made in December 2023. At that time, you can select the 16.04 option and the system will work normally.

## Create an ECS using the image created by importing the ISO image.

{% include image.html post=page.path file="image7.png" %}

{% include image.html post=page.path file="image8.png" %}

## Access the instance and open the shell terminal

{% include image.html post=page.path file="image9.png" %}

## Install KVM

Add the virtio drivers to the file: “/etc/initramfs-tools/modules”:

```shell
nano /etc/initramfs-tools/modules

virtio_blk
virtio_scsi
virtio_net
virtio_pci
virtio_ring
virtio
```

{% include image.html post=page.path file="image10.png" %}

```shell
update-initramfs -u
```

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

{% include image.html post=page.path file="image11.png" %}

## Install and configure cloud-init

(apt install cloud-init is not working for version 20.04, install
version 23 and it has compatibility issues)

```shell
apt remove cloud-init
apt purge cloud-init
rm -rf /var/lib/cloud/*
rm -rf /var/log/cloud-init*
rm -rf /var/lib/cloud
rm -rf /etc/cloud
rm -rf /usr/local/bin/cloud*
apt update
apt install cloud-guest-utils -y
apt install python3-pip -y
apt install python3-devel
wget https://launchpad.net/cloud-init/trunk/19.1/+download/cloud-init-19.1.tar.gz
tar -zxvf cloud-init-19.1.tar.gz
cd cloud-init-19.1
pip3 install -r ./requirements.txt
python3 setup.py install
cloud-init -v
cloud-init init --local

nano /etc/cloud/cloud.cfg
```

Change the parameters as shown in the images, add the lines at the end of the
file:

```shell
- name: root
   lock_passwd: False

ssh_pwauth: true
```

{% include image.html post=page.path file="image12.png" %}

{% include image.html post=page.path file="image13.png" %}

{% include image.html post=page.path file="image14.png" %}

{% include image.html post=page.path file="image15.png" %}

```shell
datasource_list: [ OpenStack ]
datasource:
  OpenStack:
    metadata_urls: ['http://169.254.169.254']
    max_wait: 120
    timeout: 5
    apply_network_config: false
network:
  config: disabled
```

## Check cloud-init, if any error occurs try restarting the instance and run the command again:

```shell
sudo cloud-init init --local
```

{% include image.html post=page.path file="image16.png" %}

## Stop the instance and create the image:

{% include image.html post=page.path file="image17.png" %}

{% include image.html post=page.path file="image18.png" %}

{% include image.html post=page.path file="image19.png" %}

{% include image.html post=page.path file="image20.png" %}
