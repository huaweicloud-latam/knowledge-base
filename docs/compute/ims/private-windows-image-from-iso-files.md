---
title: Creating a Private Windows Image
layout: default
parent: Image Management Service (IMS)
grand_parent: Compute
permalink: /docs/compute/ims/creating-a-private-windows-image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating a Private Windows Image

V1.0 – January 2024

| **Version**       | **Author**            | **Description**      |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-01-02 | Diogo Hatz 50037923   | Versão Inicial       |
| V1.0 – 2024-01-02 | Wisley Paulo 00830850 | Revisão do Documento |

# Introduction

Image Management Service (IMS) is a service provided on Huawei Cloud that allows image management. Images are nothing more than cloud servers or disk templates that contain an operating system (OS), service data, or software.

This document aims to provide a step-by-step guide on how to create customized images on IMS on Huawei Cloud from ISO files external to Huawei Cloud.

# ISO preparation

In order to provide the instances generated from the ISO file with access to the Internet and other VM functionalities, it is necessary to install VMTools drivers on these instances. To do this, the VMTools driver will be integrated into the desired ISO file using the AnyBurn software, which can be downloaded via the following hyperlink:
<http://www.anyburn.com/index.htm>.

In addition, the VMTools driver package can be downloaded from the following link: <https://ecs-instance-driver.obs.cn-north-1.myhuaweicloud.com/vmtools-windows.zip>. After installing AnyBurn and extracting the VMTools driver package files from the “vmtools-windows.zip” file, open the installed AnyBurn software and click “Browse/Extract image file”. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image3.png) Select the “vmtools-windows” folder directory and select the “vmtools-windows.iso” file. Click “Next” twice. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image4.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image5.png)

Select the directory where the ISO files will be extracted. As a suggestion, select the previously extracted “vmtools-windows” folder and
click “Next”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image6.png)

Return to the AnyBurn software home menu and select the “Edit image file” option.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image7.png)

Select the directory of the ISO image to be created and click “Next”.

In this case, the selected file will be the Windows Server 2019 ISO.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image8.png)

Select the “More” option and click “New Folder”. Name the folder as
“vmtools-windows”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image9.png)

Click on the created folder and click “Add+”. Select the four files extracted from the “vmtools-windows.iso” ISO and click “Next” and then “Create now”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image10.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image11.png)

Wait until the progress bar reaches the end.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image12.png)

# Upload the ISO

To upload the ISO of the instance to be created, the OBS storage service will be used. Access the Huawei Cloud console and go to the OBS section. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image13.png) If the OBS Browser + application is not installed on your computer, please read section 3.1. Otherwise, skip to section 3.2. 

## OBS Browser + 

Within OBS, click “Download” on the icon representing OBS Browser +. Download and install the OBS Browser + software. 

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image14.png) 

Return to the Huawei Cloud console, hover over your Huawei Cloud ID, and click “My Credentials”. 

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image15.png)

Click on “Access Keys”, “Create Access Keys”, “Ok” and “Download”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image16.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image17.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image18.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image19.png)

## Upload ISO to bucket

In the OBS section within the Huawei Cloud console, click “Create
Bucket”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image20.png)

Give the bucket a name and select “Standard” in “Default Storage Class”. This setting is important, since if another class option is selected, an error will occur when creating the image from the ISO later.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image21.png)

Click “Create Now” to create the bucket. Open the OBS Browser + application and enter the access information as requested in the “AK Login” section. In the “Access Key ID” and “Secret Access Key” fields, enter the generated data in section 3.1. In “Service”, select “HUAWEI CLOUD OBS
(default)”. In “Access Path” enter “obs://” followed by the name of the bucket
created. In this example, the path will be “obs://ims-iso-tutorial”. Click
on “Log In”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image22.png)

Click Upload

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image23.png)

Select the “Standard” option in “Storage Class” and in “Add File” to
add the iso of the instance to be created. In this case, the Windows Server 2019 ISO. Wait until the upload is complete before proceeding to the next steps. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image24.png) 

# Creating the image in IMS 

Access the Huawei Cloud console and go to the IMS section. 

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image25.png) 

Go to the “Private Images” section and click “Create Now”. 

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image26.png)

Configure the parameters according to the instance image that will be created. In this case, the Windows Server 2019 Standard OS.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image27.png)

For Windows images, select the “Bring your own license (BYOL)” option.

Click “Next” after configuring all fields.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image28.png)

Check if the information is correct and click “Submit”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image29.png)

Wait until the ISO image is created and click “Create ECS”
to create an instance of the generated image.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image30.png)

Configure the information required to create the ECS and click
“OK” to create the ECS.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image31.png)

The next steps will be important to configure the image with the
software and settings required for the proper functioning of the
instances created from this image.

# OS Installation

Access the Huawei Cloud console and go to the ECS service section. Click “Remote Login” to remotely access the instance created in step 4 of this document.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image32.png)

Set the system language and click “Next” and “Install now”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image33.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image34.png)

Select the OS version to be installed, check that the option contains
“Desktop Experience” so that a graphical interface is installed
with the system, if desired, and click “Next”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image35.png)

Accept the terms and click “Next”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image36.png)

Select the “Custom: Install Windows only (advanced)” option.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image37.png)

Click “Load driver” and then “Browse”. Select the following path:
“C:\vmtools-windows/upgrade/**your-OS-version**/drivers/viostor”.

**Note: For Windows Server 2019 and 2022, select the driver for Windows Server 2016.**

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image38.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image39.png)

Click “Next” twice in a row and wait for Windows to install.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image40.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image41.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image42.png)

Set a password for the Windows Administrator profile and click “Finish” to complete the Windows installation.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image43.png)

Go to the Windows desktop, open File Explorer, and navigate to the ejectable drive. Open the “vmtools-windows” folder and install the “setup” software, which corresponds to the VMTools drivers.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image44.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image45.png)

Restart the computer when prompted.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image46.png)

# ECS Configuration

## EIP

To provide Internet access to the ECS, it is necessary to
attach an EIP to the ECS. To do this, click “More” next to the desired ECS in the ECS section of the Huawei Cloud Console, “Manage Network” and “Bind EIP”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image47.png)

If no EIP is available, purchase an EIP by clicking “Buy EIP”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image48.png)

Click “Buy EIP again”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image49.png)

Select the parameters of the EIP that will be attached to the ECS, such as its bandwidth, and click “Next” and “Submit”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image50.png)

Select the purchased EIP to be attached to the ECS.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image51.png)

If you want to install system updates, proceed to section 6.2. Otherwise, skip to section 6.3. **Warning: It is
important that system updates are performed before any
other system configuration if chosen.**

## System update

To update the system, click on Windows Search, type “update” and
click on “Check for updates”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image52.png)

Click on “Check for updates” again and wait until all
updates are performed. ECS may be restarted a few times
in this process.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image53.png)

## Gpedit.msc

Click on Windows Search and type “gpedit.msc” to open the local group policy editor.

### Server Manager

Navigate to “Computer Configuration \> Administrative Templates \> System \> Server Manager”. Double-click on “Do not display Server
Manager automatically at logon” and select “Enabled” to prevent Server Manager from opening automatically when starting the instance.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image54.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image55.png)

### Shut down

Navigate to “Computer Configuration \> Windows Settings \> Security
Settings \> User Rights Assignment“ and double-click on the “Shut down the system” option.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image56.png)

Click “Add User or Group”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image57.png)

Click “Object Types”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image58.png)

Enable the “Groups” option and click “OK”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image59.png)

In “Enter the object names to select”, type “Users” and press the Enter key. Click “OK”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image60.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image61.png)

### Firewall

Navigate to “Computer Configuration \> Network \> Network Connections \> Domain Profile”, double-click “Windows Firewall: Protect all network connections” and select the “Disabled” option.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image62.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image63.png)

Navigate to “Computer Configuration \> Network \> Network Connections \> Standard Profile”, double-click “Windows Firewall: Protect all network connections” and select the “Disabled” option.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image64.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image65.png)

## Services

**Note: For Windows Server 2019, skip section 6.4.**

Click on Windows Search and type “services” to open the Windows services management window.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image66.png)

Navigate to “Windows Firewall” and double-click it. In “Startup type”
select “Disabled”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image67.png)

## DHCP

Check if the instance's NICs are configured as DHCP. To do this,
navigate to the “Control Panel” through Windows Search, go to “Network
and Internet Connections”, click on ”Network and Sharing Center”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image68.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image69.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image70.png)

Click on the network adapter available in your instance and click on
“Properties”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image71.png)

Select the network protocol used by the instance, in this case IPv4,
and click “Properties”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image72.png)

Check whether the enabled option for both options is related to
obtain the IP address and DNS automatically. Click “Ok” to save.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image73.png)

## Remote Desktop

To enable remote access to the instance, open Windows Search and
type “Allow remote access to your computer”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image74.png)

Enable the “Allow remote connections to this computer” option and click “OK” to confirm the change.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image75.png)

Check if the Windows firewall allows incoming and outgoing traffic for the
remote access service by navigating to Windows Firewall

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image76.png)

Click “Allow an app or feature through Windows Defender Firewall”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image77.png)

Enable remote access through the firewall by enabling the “Remote Desktop” service options.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image78.png)

## PV Driver

The PV Driver is responsible for managing instances with Xen virtualization. Although this type of virtualization technology has been discontinued in Huawei Cloud, it is still important that the drivers are installed. Download them through the following link in the instance:
<https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0317.html>. Extract the downloaded file and launch the “pvdriver-win” installer. Accept the terms of service and click “Install”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image79.png)

Click “Finish” after the installation is complete.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image80.png)

## One-click reset password plugin

This plugin allows the instance password to be reset via the
Huawei Cloud console. To install it, download it from the following link on the instance: <https://cn-north-1-cloud-reset-pwd.obs.cn-north-1.myhuaweicloud.com/windows/reset_pwd_agent/CloudResetPwdAgent.zip>. Extract the downloaded “CloudResetPwdAgent.zip” file. Before installing it, however, port 80 needs to be enabled in the ECS security group for the installation to be successful. Navigate to the Huawei Cloud console and go to the ECS section. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image81.png) Under “Network and Security”, click “Security Groups”. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image82.png)

Select the security group to which the ECS instance is attached.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image83.png)

In “Outbound Rules”, add the rule to allow access to the TCP protocol to port 80 from the following destination: “169.254.0.0/16”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image84.png)

Return to ECS and run the “Setup” file present in the previously extracted folder.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image85.png)

To verify the successful installation of the plugin, open the task manager in the services section and check if the “cloudResetPwdAgent” service is present.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image86.png)

## Cloudbase-Init

Cloudbase-init is an important software that manages virtual machines. To download it, access the following link through the ECS browser:
<https://www.cloudbase.it/downloads/CloudbaseInitSetup_Stable_x64.msi>.

After downloading it, open the “CloudbaseInitSetup” installer and click “Next” three times in a row until the user settings screen appears. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image87.png) Set the “Username” to “Administrator” and select “COM1” in the “Serial port for logging” option. Click “Next” to continue and “Install” to install the software. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image88.png) 

Finally, disable the two available options and click “Finish”. 

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image89.png)

Finally, cloudbase-init needs to be configured. Navigate to the following path: “C:\\Program Files\\Cloudbase
Solutions\\Cloudbase-Init\\conf” and open the “cloudbase-init.conf” file using notepad.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image90.png)

Add the following settings to the end of the file:

```shell
netbios_host_name_compatibility=false 
metadata_services=cloudbaseinit.metadata.services.httpservice.HttpService
plugins=cloudbaseinit.plugins.common.localscripts.LocalScriptsPlugin,cloudbaseinit.plugins.common.mtu.MTUPlugin,cloudbaseinit.plugins.windows.createuser.CreateUserPlugin,cloudbaseinit.plugins.common.setuserpassword.SetUserPasswordPlugin,cloudbaseinit.plugins.common.sshpublickeys.SetUserSSHPublicKeysPlugin,cloudbaseinit.plugins.common.sethostname.SetHostNamePlugin,cloudbaseinit.plugins.windows.extendvolumes.ExtendVolumesPlugin,cloudbaseinit.plugins.common.userdata.UserDataPlugin,cloudbaseinit.plugins.windows.licensing.WindowsLicensingPlugin
first_logon_behaviour=no
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image91.png)

Optionally, also add the following settings:

```shell
plugins=cloudbaseinit.plugins.windows.winrmlistener.ConfigWinRMListenerPlugin,cloudbaseinit.plugins.windows.winrmcertificateauth.ConfigWinRMCertificateAuthPlugin
retry_count=40
retry_count_interval=5
real_time_clock_utc=true
[openstack]
add_metadata_private_ip_route=False
```

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image92.png)

For a better understanding of how each of the configurations performed here works, please refer to the official IMS documentation at the following link:
<https://support.huaweicloud.com/intl/en-us/usermanual-ims/en-us_topic_0030730602.html>.

Open Windows cmd to clear the currently configured DHCP address. This step will limit the instance's internet access until it is restarted. Open Windows Search and type “cmd”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image93.png)

Type the following command: “ipconfig /release”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image94.png)

Also, type the following sequence of commands: “diskpart” and “san
policy=onlineall”. Check if the configuration was applied by typing the
“san” command.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image95.png)

Type “exit” twice consecutively to exit the cmd. Restart the
instance so that the instance can resume internet access. Please note that when you log in to the Administrator account, ECS will automatically restart. After the second restart, you will notice that the password you previously set no longer works for the administrator profile. This is due to the installation of cloudbase-init, which will randomize the profile password after the first system restart after its installation. To set the password again, go to the Huawei Cloud console in the ECS section, click “More” and “Reset password” next to the desired instance. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image96.png) Set the password again, enable the “Auto Restart” box and click “OK”. ![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image97.png)

After the instance automatically restarts, you will notice how the Administrator profile password has been changed to the password defined in the console.

Now, perform the other desired configurations in ECS to generate the final instance image.

# Creating the image

After performing all the above adjustments and those chosen by you, navigate to the ECS section in the Huawei Cloud console, click “More” next to the desired instance, and click “Stop” to shut down the instance.

Select “Yes”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image98.png)

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image99.png)

Navigate to the IMS section in the Huawei Cloud Console

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image100.png)

Click “Create Now” under “Image creation”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image101.png)

Select “Create Image” in “Type” and “System disk image” in “Image
Type”. Select the desired ECS, give the image a name and click
“Next”, after checking the box to accept the terms. Click
“Submit”.

![](/huaweicloud-knowledge-base/assets/images/compute/ims/private-windows-image-from-iso-files/image102.png)

After the image creation is complete, new instances can now be
created from the ISO file downloaded in step 2\!

# References:

- IMS documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0220.html>.
- Workspace documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0510.html>.