---
title: Bricked ECS After Migration Troubleshooting
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migration
permalink: /docs/migration/sms/bricked-ecs-after-migration-troubleshooting
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Bricked ECS After Migration Troubleshooting

V1.0 – July 2024

| **Version**       | **Author**               | **Description**      |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-07-30 | Diogo Hatz 50037923      | Initial Version      |
| V1.0 – 2024-07-30 | Wisley da Silva 00830850 | Document Review      |

# Introduction

SMS is a virtual machine migration service provided by Huawei Cloud. With this service, you can migrate VMs from other cloud providers or from on-premises environments to the cloud. SMS migrates virtual machines to ECSs, which correspond to the virtual machine service in Huawei Cloud.

This document aims to present a solution for VMs migrated using the SMS migration service in which it is not possible to access the machine through “remote login”, via the console, or via remote access via protocols such as SSH.

# Considerations

**<span class="underline">Important:</span>** It is possible for several different factors to cause ECSs to freeze after they are migrated via SMS. This document will address the issue of compatibility of certain versions of cloud-init with the ECS service, which is one of the factors that can cause ECS to freeze.

# Symptoms

When trying to access the ECS via remote login or SSH, the following
errors occur:

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

# Temporary ECS

Since the ECS cannot be accessed, you will need to remove your system disk and attach it to a temporary ECS in order to access its boot menu. To do this, first create a temporary ECS with the
**<span class="underline">same operating system</span>** and
**<span class="underline">same AZ</span>** as the frozen machine. After that, remove the system disk from the frozen ECS and place it in the temporary ECS as a data disk. Removing the system disk from the frozen ECS: 

{% include image.html post=page.path file="image5.png" %} 
{% include image.html post=page.path file="image6.png" %} 
{% include image.html post=page.path file="image7.png" %} 

Attaching the system disk from the frozen ECS to the temporary ECS as a data disk data:

{% include image.html post=page.path file="image8.png" %}

{% include image.html post=page.path file="image9.png" %}

{% include image.html post=page.path file="image10.png" %}

After that, remotely access the temporary ECS and use the “fdisk
-l” command to list the disks attached to the machine.

{% include image.html post=page.path file="image11.png" %}

When you identify the disk that was attached to the temporary ECS, mount the disk with the mount command. For example: “mount /dev/vdb1
/mnt”.

{% include image.html post=page.path file="image12.png" %}

Once the mount is complete, perform the following steps:

1. > Delete the grub configuration file with the command:

```shell
rm /mnt/boot/grub/grub.cfg
```

{% include image.html post=page.path file="image13.png" %}

1. > Copy the generic kernel from the temporary ECS to the /boot directory of the frozen ECS:

```shell
cp /boot/vmlinuz-5.4.0-170-generic /mnt/boot/vmlinuz-5.4.0-170-generic
```
**<span class="underline">Important:</span>** The kernel name used was just an example; it is necessary to copy the kernel used by the temporary ECS. If in doubt, use the “uname -r” command to list the running kernel version.

{% include image.html post=page.path file="image14.png" %}

3. > Copy the initrd from the temporary ESC to the /boot directory of the frozen ECS:

```shell
cp /boot/initrd.img-5.4.0-170-generic /mnt/boot/initrd.img-5.4.0-170-generic
```
**<span class="underline">Important:</span>** Copy the initrd for the kernel copied in step 2.0. If there is no initrd, generate one with the “update-initramfs -u” command.

{% include image.html post=page.path file="image15.png" %}

Remove the data disk with the command “umount /dev/vdb1”.

{% include image.html post=page.path file="image16.png" %}

Once done, put the frozen ECS system disk back into the original ECS, following the step-by-step instructions in item 4.0 of this document. Once done, start the machine and “remotely log in” to it via the console.

{% include image.html post=page.path file="image17.png" %}

# Grub shell

{% include image.html post=page.path file="image18.png)

Run the “ls” command to list the disk partitions seen by
Grub. To identify which is the correct partition to use,
run the “ls (hd0,gpt1" %}/” command until you find the partition with
the contents of the system disk, replacing “hd0,gpt1” with the
partitions seen by the “ls”.

{% include image.html post=page.path file="image19.png)

Once you find the correct partition, perform the following steps to boot the temporary ECS kernel in single-user mode:

1. Replacing (hd0,gpt1) with the partition found above;
```shell
set root=(hd0,gpt1" %}
```

2. Replacing “vmlinuz-5.4.0-170-generic” with the kernel copied from the
temporary ECS in item 4.0 of this document and replacing “vda1”
according to the partition found.
**<span class="underline">Example:</span>** (hd0,gp1) = vda1, (hd1,gpt1) = vdb1, (hd3,gpt2) = /dev/vdd2, and so on; 
```shell
linux /boot/vmlinuz-5.4.0-170-generic root=/dev/vda1 ro single
```

3. Replacing “initrd.img-5.4.0-170-generic” with the initrd copied from the temporary ECS in item 4.0 of this document;
```shell
initrd /boot/initrd.img-5.4.0-170-generic
```

4. Finish booting.
```shell
boot
```

{% include image.html post=page.path file="image20.png" %}

After entering the boot command, the ECS will boot in
single-user mode. Enter the ECS root password when prompted.

{% include image.html post=page.path file="image21.png" %}

# Single-user

Use the “apt-get remove cloud-init -y” command to uninstall
cloud-init.

{% include image.html post=page.path file="image22.png" %}

Use the “update-grub” command to generate the previously deleted grub configuration file.

{% include image.html post=page.path file="image23.png" %}

Use the command “grep 'menuentry ' /boot/grub/grub.cfg” to list the kernel versions on the system and copy the desired version so that Grub will boot by default.

{% include image.html post=page.path file="image24.png" %}

Use the command “vim /etc/default/grub” to modify the grub configuration file. Change the parameters grub_default={kernel name copied above}, "grub_timeout_style=menu" and "grub_timeout=10".

{% include image.html post=page.path file="image25.png" %}

{% include image.html post=page.path file="image26.png" %}

Use the “update-grub” command to update the grub configuration file again.

{% include image.html post=page.path file="image23.png" %}

Use the “reboot” command to restart the ECS. Note that the machine will now boot normally.

# Configurations

Check the ECS connectivity with the “ip a” command. If the ECS does not have the eth0 interface configured correctly, there may be a conflict in the netplan program configuration. If the ECS has normal connectivity, skip section 7.1 of this document. 

## **Netplan**

Type the command “vim /etc/netplan/50-cloud-init.yaml” to open the ECS network configuration file and add the eth0 interface as follows:

{% include image.html post=page.path file="image27.png" %}

Once done, apply the settings made with the “netplan
apply” command

{% include image.html post=page.path file="image28.png" %}

{% include image.html post=page.path file="image29.png" %}

If connectivity has not yet returned to normal, check the
installation of the drivers KVM from the following documentation:
<https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0326.html#ims_01_0326__section1865536911274>.

## Config

If the VM was migrated from Azure, you will need to change the machine's Yum repositories to point to the Huawei repository:

```shell
sed -i 's/azure.archive.ubuntu.com/repo.huaweicloud.com/g' /etc/apt/sources.list

apt autoclean && apt update
```

{% include image.html post=page.path file="image30.png" %}

Once you have changed the repositories, reinstall cloud-init with the command:

```shell
apt-get install cloud-init
```

**<span class="underline">Important:</span>** Do not install version
23.3.3 of cloud-init.

{% include image.html post=page.path file="image31.png" %}

Install a new version of the Linux kernel with the command:

```shell
apt-get install linux-image-generic
```

{% include image.html post=page.path file="image32.png" %}

Use the command “grep 'menuentry ' /boot/grub/grub.cfg” to list the kernel versions on the system and copy the latest installed version.

{% include image.html post=page.path file="image33.png" %}

Use the command “vim /etc/default/grub” to modify the grub configuration file. Change the parameters grub_default={kernel name copied above}.
{% include image.html post=page.path file="image34.png" %}

Use the “update-grub” command to update the grub configuration file again.

{% include image.html post=page.path file="image35.png)

Use the “reboot” command to restart ECS on the updated kernel.

# Settings (Optional" %}

In addition to the above settings, it is also recommended that the
Azure agent, which is installed by default on Azure VMs, be
uninstalled, since the agent constantly reports logs to the VNC console, which may affect VNC performance:

Enter the following command to uninstall the Azure agent:

```shell
sudo apt -y remove walinuxagent
apt-get remove -y linux-azure-*
apt-get remove -y *azure
```

# References

- Installing KVM drivers: <https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0326.html#ims_01_0326__section1865536911274>.