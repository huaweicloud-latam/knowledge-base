---
title: Migrating Azure AKS to Huawei CCE
layout: default
parent: Cloud Container Engine (CCE)
grand_parent: Containers
permalink: /docs/containers/cce/migrating-azure-aks-to-huawei-cce
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrating Azure AKS to Huawei CCE

V1.0 – January 2024

| **Version**       | **Author**            | **Description**       |
| ----------------- | --------------------- | --------------------- |
| V1.0 – 2024-01-16 | Diogo Hatz 50037923   | Document Translation  |
| V1.0 – 2024-01-16 | Wisley Paulo 00830850 | Document Review       |

# Kubernetes Cluster Migration from AKS to CCE

## Introduction

Migrating the Kubernetes service AKS from Microsoft Azure to Huawei Cloud’s Cloud Container Engine (CCE) managed cluster service is a strategic decision that can empower organizations to refine their container orchestration strategy in response to the growing demands of the cloud landscape. The transition represents an opportunity to optimize operations, increase scalability, and analyze the Huawei Cloud ecosystem. Crucially, the migration journey is guided and facilitated by the powerful Velero container backup and migration tool, ensuring data integrity and minimizing service disruption. Whether the migration is driven by cost-effectiveness, the desire for smooth integration with Huawei Cloud services, or the quest for higher performance, this guide provides a detailed step-by-step guide for a successful transition, enabling your enterprise to embrace the cloud-native era with confidence, along with the immeasurable support of the Velero tool. 

{% include image.html post=page.path file="image3.png) 

## Operation Process 

For the migration of Microsoft Azure Kubernetes Service (AKS) to Huawei Cloud Container Engine (CCE" %}, a meticulous operation was performed. First, a detailed analysis was conducted to identify all workloads, configurations, and dependencies within the AKS cluster. The necessary resources were provisioned within Huawei CCE, ensuring compatibility and scalability to accommodate the workloads. Preparations for data migration were then made, including the transfer of container images, persistent volumes, and configuration files, all backed up by Velero for reliable backup and restore. The migration itself was executed carefully to minimize downtime, with continuous monitoring throughout the transition to promptly address any challenges. After the migration was complete, workloads on Huawei CCE were validated to ensure stable operation. Configurations were optimized as needed, and monitoring and maintenance practices were established to ensure the continued success of operating containerized applications in the Huawei CCE environment. The migration process ensured a smooth and successful migration, aligning the infrastructure with the evolving needs and strategies of Huawei Cloud Container Engine. 

{% include image.html post=page.path file="image4.png" %}

# Implementation

## **Microsoft Azure**

### **VPC for Nodes**

In this example, AKS has 1 VPC with 1 subnet. Virtual networks were used to manage IP addresses, security, integration with Azure services, and other network-related features for AKS nodes. They are an essential part of deploying and managing AKS clusters on Azure.

{% include image.html post=page.path file="image5.png" %}

### **AKS – Cluster**

1. First, you need to check the essential Kubernetes resources, such as workloads, namespaces, storage, nodes, pods, and services.

2. Navigate to the home, Kubernetes services, and click on the Kubernetes service to migrate.

3. Connect to the cluster using the scripting tool to interact directly with the cluster using kubectl, the Kubernetes scripting tool. Kubectl is available within the Azure Cloud Shell by default and can also be installed locally.

{% include image.html post=page.path file="image6.png" %}

4. After opening the cloud shell, you also need to configure the cluster subscription and download the credentials.

{% include image.html post=page.path file="image7.png" %}

5. After connecting to the cluster, you can check the deployments, namespaces, pods, and cluster information to analyze the cluster.

{% include image.html post=page.path file="image8.png" %}

### **Preparing Clusters**

In this example, there is one nodepool in AKS.

{% include image.html post=page.path file="image9.png" %}

### **Additional Configurations for Pods and ELB**

To use PV and ELB services in AKS, some additional configurations need to be performed. There is no need to install the CSI driver or kubenet plugin, you only need to enable them.

{% include image.html post=page.path file="image10.png" %}

Also, you can view images of containers running on
Kubernetes using:

{% include image.html post=page.path file="image11.png" %}

{% include image.html post=page.path file="image12.png" %}

**Installing Velero and performing additional configuration**

1. First, verify the AKS cluster and resource group using the
following command:

{% include image.html post=page.path file="image13.png" %}

2. Configure the kubeconfig file:

{% include image.html post=page.path file="image14.png" %}

3. Check if the user account is storage is configured or not. If not, create a storage account using the following command:

{% include image.html post=page.path file="image15.png" %}

4. Install Velero on Azure Cloud Shell:

{% include image.html post=page.path file="image16.png" %}

5. Install Velero Server on AKS cluster:

{% include image.html post=page.path file="image17.png" %}

6. At this point, the “credentials-velero” file needs to be populated with certain parameters, such as “Azure\_Client\_ID”,
“Azure\_Subscription\_ID”, “Azure\_Tenant\_ID”,
“Azure\_Client\_Secret” and “Azure\_Resource\_Group”. These
settings can be obtained in step 5 above.

<!-- end list -->

1. Only the “Azure\_Client\_ID” parameter is obtained through the
Azure console. To obtain this parameter, navigate to “Azure AD” and click
on “APP Registrations”, select “All Applications” and “Storage
account” to get the Client ID.

2. Azure AD \> APP Registrations \> All Applications \> Storage Account

> {% include image.html post=page.path file="image18.png" %}

7. Finally, install Velero on AKS. Check all the variables and
values ​​before starting Velero.

{% include image.html post=page.path file="image19.png" %}

8. Check whether the pods, deployments and replicasets are created or not.

{% include image.html post=page.path file="image20.png" %}

**Creating a backup using Velero**

1. Create a new backup using the command: “./velero backup create
$Backup\_Name” and wait a few minutes until the backup is
completed.

{% include image.html post=page.path file="image21.png" %}

2. Check whether the backup is complete or not. You can use the following command to verify:

```shell
./velero backup describe newbackup2
```

{% include image.html post=page.path file="image22.png" %}

3. Navigate to the storage accounts section and check if the data was successfully backed up. Navigate to Home \>
Storage Account \> Containers.

{% include image.html post=page.path file="image23.png" %}

{% include image.html post=page.path file="image24.png" %}

{% include image.html post=page.path file="image25.png" %}

## **Huawei Cloud**

### **Create a VPC**

First, a VPC needs to be created. In this example, the subnet with
CIDR 192.168.0.0/16 will be used.

{% include image.html post=page.path file="image26.png" %}

### **Create Cluster in Huawei Cloud Console**

1. Navigate to the CCE console and click “Create CCE”;

2. Select the corresponding AZ;

3. Select the specifications according to the scenario;

4. Select the appropriate VPC and security group;

5. After the CCE is created, log in to the created ECS instance;

6. Test the connection and attach an EIP if necessary.

{% include image.html post=page.path file="image27.png" %}

{% include image.html post=page.path file="image28.png" %}

{% include image.html post=page.path file="image29.png" %}

### **Create the nodes**

7. Go to the Nodes section in the CCE console;

8. Click “Create a Node”;

9. Select the Node Host specifications;

10. Select the Container Engine, OS and Storage;

11. Modify the network as needed.

{% include image.html post=page.path file="image30.png" %}

{% include image.html post=page.path file="image31.png)

### **Install Velero on Source and Target Clusters (Same Process" %}**

1. You need to download kubectl and its configuration file, copy the file to your client, and configure kubectl. After configuring, you can use kubectl to access the Kubernetes cluster.

2. Copy “kubectl” and its configuration file to the “/home” directory on your client. If kubectl has already been installed, you only need to copy the kubeconfig file. 

{% include image.html post=page.path file="image32.png" %} 

3. Log in to your client and configure kubectl. If kubectl has already been configured, skip this step. 

{% include image.html post=page.path file="image33.png" %} 

4. Change the kubectl access mode based on the application scenario. Use the following command to enable intra-vpc-access. 

{% include image.html post=page.path file="image34.png" %}

5. Check the cluster information.

> {% include image.html post=page.path file="image35.png" %}

6. Run the following commands:

```shell
wget https://github.com/vmware-tanzu/velero/releases/download/v1.9.1/velero-v1.9.1-linux-amd64.tar.gz
tar -xvf velero-v1.7.0-linux-amd64.tar.gz
cd velero-v1.9.1-linux-amd64/ && sudo chmod +x velero && sudo mv velero /usr/local/bin
```

9. Create the **credentials-velero** access file for storage
 of backup objects.

```shell
vim credentials-velero
tar -xvf velero-v1.7.0-linux-amd64.tar.gz
```

10. Configure the variables for the credentials-velero file.
Specify all the data specified below:

{% include image.html post=page.path file="image36.png" %}

11. Create the velero-credentials configuration file and fill it with
the information below:

{% include image.html post=page.path file="image37.png" %}

12. Open the Velero client. Change the value of **credentials**. Specify –provider –plugins –bucket –secret-file
–backup-location-config –snapshot-location-config –resource-group.
In this example, the bucket name is **velero**. Change the region and url
according to the context of your application.

{% include image.html post=page.path file="image38.png" %}

13. Verify the Velero installation with kubectl.

```shell
kubectl get pod -n velero
```

> {% include image.html post=page.path file="image39.png" %}

### **Migrating Resources**

After installing Velero for both clusters, it is
important to check the backup status directly from the Velero server. To do this, you can check the current backups using the
command: “./velero get backup-locations”. This command provides
important information regarding the backups managed by Velero, ensuring
the security and availability of Kubernetes resources.

1. To see all available backups, use the command: “./velero
get backup-locations”.

{% include image.html post=page.path file="image40.png" %}

2. Verify that all backups are available and can be restored

{% include image.html post=page.path file="image41.png" %}

### **Restoring Applications to the Target Cluster**

1. Use the Velero tool to create a restore and specify
a backup. In this example, the backup named **vpro-backup** will be
used to restore a WordPress application to the CCE cluster.

{% include image.html post=page.path file="image42.png" %}

### Update the Target Cluster and Validate the Migration

Update the image fields in the yaml files within the CCE cluster according to your SWR.

{% include image.html post=page.path file="image43.png" %}

Edit the specs and annotations fields of the input yaml file according to the rules in the official Huawei Cloud documentation.

{% include image.html post=page.path file="image44.png" %}

{% include image.html post=page.path file="image45.png" %}

**Please verify and validate the cluster**

{% include image.html post=page.path file="image46.png" %}

{% include image.html post=page.path file="image47.png" %}

{% include image.html post=page.path file="image48.png" %}