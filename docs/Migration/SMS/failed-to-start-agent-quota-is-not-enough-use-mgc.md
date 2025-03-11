---
title: Failed to start agent，error：Current quota is not enough, please use MgC
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migration
permalink: /docs/Migration/SMS/Failed to start agent，error：Current quota is not enough, please use MgC
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Failed to start agent，error：Current quota is not enough, please use MgC

Reason：

> This message is displayed because the number of source servers
> reported to SMS has reached the upper limit (more than 10) and the
> migration task cannot be manually added.

Solution：

1、The operating system is Windows.

You can go to the following directory:C:\\SMS-Agent-Py3\\config   or  
C:\\SMS-Agent-Py2\\config.

![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image1.png)

Then open the file as shown in the picture：g-property.cfg


![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image2.png)

Then change 'start\_type = MANUAL' to 'start\_type = MGC' in the file.

before:![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image3.png)

after:![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image4.png)


Finally, restart the agent.


2、The operating system is Linux.

You can open the file :SMS-Agent/agent/config/g-property.cfg

Then change 'start\_type = MANUAL' to 'start\_type = MGC' in the file.

![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image5.png)

 

Finally, restart the agent.
