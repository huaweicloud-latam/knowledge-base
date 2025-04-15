---
title: Installing GUI on Public Linux Images
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
permalink: /docs/compute/ecs/installing-gui-on-public-linux-images
---

# Installing GUI on Public Linux Images

V1.0 – January 2024

| **Version**       | **Author**            | **Description**      |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-01-05 | Diogo Hatz 50037923   | Initial Version      |
| V1.0 – 2024-01-07 | Wisley Paulo 00830850 | Document Review      |

1. Index
{:toc}

## Introduction

Image Management Service (IMS) is a service provided on Huawei Cloud that allows image management. Images are nothing more than cloud servers or disk templates that contain an operating system (OS), service data, or software.

This document aims to provide a step-by-step guide on how to install a graphical user interface (GUI) on public Linux images provided on IMS. It is worth noting that to use the graphical interface, the instance must be accessed through tools outside the Huawei Cloud console, such as Windows Remote Desktop.

## ECS

Access the Huawei Cloud console, navigate to the ECS section, and create a Linux instance with the desired public Linux image. It is worth noting that to access the instance from tools outside the console, an EIP must be linked to the ECS.

{% include image.html post=page.path file="services-menu-ecs.jpg" alt="ECS in the services menu" %}

{% include image.html post=page.path file="buy-ecs.jpg" alt="Create a new ECS" %}

{% include image.html post=page.path file="new-ecs-details.jpg" alt="New ECS settings" %}

Ensure that access to ports 22 and 3389 of the security group to which the
instance is attached are open.

{% include image.html post=page.path file="security-groups-menu.jpg" alt="Menu Security Groups" %}

{% include image.html post=page.path file="default-security-group.jpg" alt="Security group default" %}

{% include image.html post=page.path file="security-group-rules-remote-access.jpg" alt="Rules in the security group for remote access" %}

## Configuring ECS

Access ECS through the Huawei Cloud console by clicking “Remote Login” and log in with the “root” user and password configured when creating the ECS.

{% include image.html post=page.path file="ecs-remote-login.jpg" alt="Remote login to ECS" %}

Update the ECS packages by typing the following command:

```shell
apt update && apt upgrade -y
```

Install the XRDP package, which allows Linux instances to be accessed
through Windows Remote Desktop.

```shell
apt install xrdp -y
```

The GDM3 interface manager is used by default on Linux
instances. If desired, other lighter managers can be installed, such as SLiM or LightDM. If prompted, change SLiM
or LightDM to the default manager.

```shell
apt install lightdm -y
```

Install the desired visual interface. In this step-by-step, the visual interface installed will be Ubuntu Desktop.

```shell
apt install ubuntu-desktop
```

Restart the XRDP service to allow Remote Desktop access.

```shell
service xrdp restart
```

Enable the XRDP service to enable the XRDP service to start at system boot.

```shell
systemctl enable xrdp
```

Start the installed interface manager.

```shell
systemctl start lightdm.service
```

Log in to the instance via Remote Desktop. Under “Session”,
select “Xorg”.

{% include image.html post=page.path file="windows-remote-desktop-connection.jpg" alt="Remote Desktop on Windows" %}

{% include image.html post=page.path file="xrdp-login.jpg" alt="xrdp login interface" %}

{% include image.html post=page.path file="remote-desktop-linux.jpg" alt="Remote Desktop with Linux GUI" %}

**Important: It is worth noting that the graphical interface installed on Linux
does not work well with Huawei Cloud Console Remote Login. It is
recommended that Remote Login on the console be used only with
the Linux terminal.**

