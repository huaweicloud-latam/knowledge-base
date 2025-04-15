---
title: Installing SQL Server on Ubuntu
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
permalink: /docs/compute/ecs/installing-sql-server-ubuntu
---

# Installing SQL Server on Ubuntu

V1.0 – January 2024

| **Version**       | **Author**            | **Description**      |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-01-05 | Diogo Hatz 50037923   | Initial Version      |
| V1.0 – 2024-01-05 | Wisley Paulo 00830850 | Document Review      |

## Introduction

SQL Server is a relational database tool developed
by Microsoft. This document provides a step-by-step guide on how to
install SQL Server on a Linux instance on the Ubuntu
distribution. For this tutorial, Ubuntu 20.04 and SQL Server 2019
were used, however, other versions will also be made available
below.

## Creating ECS

Navigate to the ECS section in the Huawei Cloud console.

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image3.png)

Purchase a new instance with the desired OS for installing SQL
Server.

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image4.png)

Navigate to the Security Groups section in the Huawei Cloud console. Click on the security group associated with the created ECS and add a rule for the default SQL Server port 1433.

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image6.png)

Return to the ECS section in the Huawei Cloud console and access the created instance by clicking “Remote Login”. Log in as the “root” user with the
password configured when creating the instance.

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image7.png)

## SQL Server Installation

Import the GPG keys from the Microsoft public repository using the
following command:

```shell
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image8.png)

Register the SQL Server Ubuntu repository:

 - SQL Server 2019 (Ubuntu 20.04)

```shell
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2019.list)"
```

 - SQL Server 2017 (Ubuntu 18.04)

```shell
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2017.list)"
```

- SQL Server 2022 (Ubuntu 20.04)

```shell
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2022.list)"
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image9.png)

Run the following command to update the system package repositories:

```shell
sudo apt-get update
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image10.png)

Run the following command to install SQL Server:

```shell
sudo apt-get install -y mssql-server
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image11.png)

Once installed, run the following command to configure SQL Server:

```shell
sudo /opt/mssql/bin/mssql-conf setup
```

Select the SQL Server edition to be installed, accept the terms of service, and set a password for the SQL Server administrator account.

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image12.png)

To check if SQL Server is running, run the following
command:

```shell
systemctl status mssql-server --no-pager
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image13.png)

The SQL Server service is running and is denoted by the “active
(running)” status.

## Connect to SQL Server

To connect to SQL Server, other tools need to be installed.

For Windows instances, you can connect using SQL
Management Studio. For Linux instances, you can connect using the SQLcmd
Utility tool.

### Linux

Import the GPG keys from the Microsoft public repository:

```shell
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image14.png)

Register the Microsoft Ubuntu repository:

- Ubuntu 22.04

```shell
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

 - Ubuntu 20.04

```shell
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

 - Ubuntu 18.04

```shell
curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

 - Ubuntu 16.04

```shell
curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image15.png)

Update the system repositories:

```shell
sudo apt-get update
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image16.png)

Install the sqlcmd utility:

```shell
sudo apt-get install mssql-tools18 unixodbc-dev
```

Add sqlcmd to the environment variables:

```shell
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bash_profile
```

Add sqlcmd to the environment variables:

```shell
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
source ~/.bashrc
```

To connect locally to the SQL Server instance, type the following
command:

```shell
sqlcmd -S localhost -U sa -P '<YourPassword>' -C
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image17.png)

### Windows

Download the SQL Management Studio tool and install it:

<https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16>

To log in to the SQL Server instance running on the Linux instance, select the authentication option “SQL Server Authentication”
and Server Type of “Database Engine”. The default user configured during the SQL Server installation is “sa”. Click “Connect” when the login data is entered.

![](/huaweicloud-knowledge-base/assets/images/ECS-Installing-SQL-Server-on-Ubuntu/media/image18.png)
