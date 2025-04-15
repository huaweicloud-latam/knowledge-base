---
title: Remote Login Bricked Error
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
permalink: /docs/compute/ecs/remote-login-bricked-error
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Remote Login Bricked Error

V1.0 – March 2024

| **Version**       | **Author**              | **Description**                    |
| ----------------- | ------------------------ | ------------------------------------ |
| V1.0 – 2024-03-13 | Yangqiang 1153592        | Versão Inicial em Chinês             |
| V1.0 – 2024-03-13 | Gaowei 1074902           | Tradução do Documento para Inglês    |
| V1.0 – 2024-03-14 | Diogo Hatz 50037923      | Tradução do Documento para Português |
| V1.0 – 2024-03-14 | Wisley da Silva 00830850 | Revisão do Documento                 |

# Introduction

SMS is a virtual machine migration service provided by Huawei Cloud. With this service, you can migrate VMs from other cloud providers or from on-premises environments to the cloud. SMS migrates virtual machines to ECSs, which correspond to the virtual machine service in Huawei Cloud.

This document aims to list optimizations for VMs migrated from the Azure Cloud provider to Huawei Cloud, as well as to solve the error of a frozen screen in ECSs for the Remote Login functionality in the HWC console.

# Configurations

The error in question for the Remote Login to freeze is related to VNC, software for remote access to other computers.

![](/huaweicloud-knowledge-base/assets/images/ECS-Remote-Login-Error/media/image3.png)

Linux VMs created in Azure Cloud have modified kernels, which may cause conflict issues with VNC software. To make the necessary changes, follow the steps below: 
1. Connect to the instance via SSH and modify the following parameters: 
    1.1 Comment out the line GRUB\_TIMEOUT\_STYLE=hidden 
    1.2 Modify GRUB\_TIMEOUT to 10: GRUB\_TIMEOUT=10 
    
![](/huaweicloud-knowledge-base/assets/images/ECS-Remote-Login-Error/media/image4.png) 

Delete the file 

```shell 
rm -rf /etc/default/grub.d/50* 
```

After deleting the files, run the following command to update the grub settings. 

```shell
update-grub2
```

Modify the Yum repository to point to the Huawei repository:

```shell
sed -i 's/azure.archive.ubuntu.com/repo.huaweicloud.com/g' /etc/apt/sources.list
apt autoclean && apt update
```

Install the Ubuntu public kernel:

```shell
apt install linux-image-generic
```

After the installation is complete, reboot the ECS and select the generic kernel in the grub screen. **Note:** It is possible to modify the **GRUB_DEFAULT** parameter to point to the generic kernel instead of manually selecting the generic kernel when booting the ECS.

# Optional Configurations

In addition to the configurations performed above, it is also recommended that the Azure agent, which is installed by default on Azure VMs, be uninstalled, since the agent constantly reports logs to the VNC console, which can affect VNC performance:

Type the following command to uninstall the Azure agent:

```shell
sudo apt -y remove walinuxagent
```

# References

- <https://learn.microsoft.com/en-us/azure/virtual-machines/linux/disable-provisioning>.
