---
title: Failure to Download the Agent
layout: default
parent: Host Security Service (HSS)
grand_parent: Security & Compliance
permalink: /docs/security-and-compliance/hss/failure-to-download-the-agent
---

# Failure to Download the Agent

V1.0 – October 2025

| **Version**       | **Author**           | **Description**      |
| ----------------- | ---------------------| -------------------- |
| V1.0 – 2025-10-15 | Diogo Hatz d00945205 | Initial Version      |

# Introduction

This document aims to present the procedures necessary to troubleshoot the HSS service agent download error due to timeout.

# Symptom

The symptom presented when running the HSS agent download and installation command is a timeout during the agent download,
indicated by the image below:

```shell
curl -k -O 'https://hss-agent.sa-brazil-1.myhuaweicloud.com:10180/package/agent/linux/install/agent_Install.sh'
```

{% include image.html post=page.path file="image3.png" %}

# Solution

First, edit the Linux hosts file "/etc/hosts" and add
the following entry:

**Important:** This document assumes that the HSS service is used in São Paulo. For other regions, adjustments may be necessary.

```shell
vim /etc/hosts

100.125.254.13 hss-agent.sa-brazil-1.myhuaweicloud.com
```

{% include image.html post=page.path file="image4.png" %}

Save the file and try downloading the agent again. This time, the expected result is that the agent can be downloaded successfully.

{% include image.html post=page.path file="image5.png" %}

# (Optional) Further Troubleshooting

If the above solution did not resolve the HSS agent download issue, you can check the following:

## **Subnet DNS**

Check if the DNS of the subnet where the ECS was provisioned has been modified.

Huawei's default DNS servers are **100.125.1.22** and **100.125.1.90**.

{% include image.html post=page.path file="image6.png" %}

## **UFW**

Check if there is a firewall running on the machine, such as UFW:

```shell
sudo ufw stop
sudo ufw disable
sudo ufw status
```

{% include image.html post=page.path file="image7.png" %}

## **Iptables**

Check if there is a firewall running on the machine, such as iptables:

```shell
iptables -L -n
```

{% include image.html post=page.path file="image8.png" %}

## **Security Group**

Check if there is a Security Group rule blocking outgoing traffic
through port 10180:

{% include image.html post=page.path file="image9.png" %}

## **Subnet ACL**

Check for any Subnet ACL rules restricting source or destination traffic to the **100.125.0.0/16** address blocks.

{% include image.html post=page.path file="image10.png" %}

## **Ping**

Perform a ping test on the following domain and verify that the resolved IP address is **100.125.254.13**.

```shell
ping hss-agent.sa-brazil-1.myhuaweicloud.com
```

{% include image.html post=page.path file="image11.png" %}

## **Telnet**

Perform a telnet test on the following domain and verify connectivity on port **10180**.

```shell
telnet hss-agent.sa-brazil-1.myhuaweicloud.com 10180
```

{% include image.html post=page.path file="image12.png" %}

## **Resolv.conf**

Verify that the Huawei DNS server addresses are correctly configured in the /etc/resolv.conf file.

```shell
vim /etc/resolv.conf

nameserver 100.125.1.22
nameserver 100.125.1.90
```

{% include image.html post=page.path file="image13.png" %}