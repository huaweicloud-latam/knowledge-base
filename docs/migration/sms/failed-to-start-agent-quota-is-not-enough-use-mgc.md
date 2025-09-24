---
title: Failed to start agent，error：Current quota is not enough, please use MgC
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migration
permalink: /docs/migration/sms/failed-to-start-agent-error-quota-is-not-enough
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Failed to start agent, error: Current quota is not enough, please use MgC

V1.0 – May 2024

| **Version**       | **Author**            | **Description**      |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-05-21 | Diogo Hatz 50037923   | Document Translation |
| V1.0 – 2024-05-22 | Wisley Paulo 00830850 | Document Review      |

Reason：

> This message is displayed because the number of source servers
> reported to SMS has reached the upper limit (more than 10) and the
> migration task cannot be manually added.

Solution：

1. The operating system is Windows.

You can go to the following directory:C:\\SMS-Agent-Py3\\config   or  
C:\\SMS-Agent-Py2\\config.

{% include image.html post=page.path file="image1.png" %}

Then open the file as shown in the picture：g-property.cfg


{% include image.html post=page.path file="image2.png" %}

Then change 'start\_type = MANUAL' to 'start\_type = MGC' in the file.

before:{% include image.html post=page.path file="image3.png" %}

after:{% include image.html post=page.path file="image4.png" %}


Finally, restart the agent.


1. The operating system is Linux.

You can open the file :SMS-Agent/agent/config/g-property.cfg

Then change 'start\_type = MANUAL' to 'start\_type = MGC' in the file.

{% include image.html post=page.path file="image5.png" %}

 

Finally, restart the agent.
