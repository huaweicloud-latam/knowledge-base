---
title: Migrating K8S Cluster Using Velero
layout: default
parent: Cloud Container Engine (CCE)
grand_parent: Containers
permalink: /docs/containers/cce/migrating-k8s-cluster-using-velero
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrating K8S Cluster Using Velero

V1.1 – January 2024

| **Version**       | **Author**            | **Description**          |
| ----------------- | --------------------- | ------------------------ |
| V1.0 – 2023-11-29 | Wisley Paulo w0083850 | Initial Version          |
| V1.1 – 2024-01-22 | Diogo Hatz 50037923   | Document Update          |
| V1.1 – 2024-01-22 | Wisley Paulo w0083850 | Document Review          |

This document presents the procedures for creating a CCE cluster and
implementing an application with ngix and wordpress in the cluster, after
the applications are tested, perform backup and restore of the environment
using velero.

# Cluster creation

To start, we access the CCE service and create the cluster as shown in the images below (for these tests, the source cluster was created in the Santiago region and the target cluster in the São Paulo region):

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png)

# Install and configure kubectl (bastion)

Create a bastion instance with ECS service in the same region as the
cluster with public IP and only with ssh access to secure public IPs
for cluster management.

```shell
#install kubectl (Recommended on bastion in the same region" %}
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(<kubectl.sha256) kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
chmod +x kubectl
mkdir -p ~/.local/bin/kubectl
mv ./kubectl ~/.local/bin/kubectl
cd ~/.local/bin/kubectl
cp kubectl /home
cd /home
chmod +x kubectl
mv -f kubectl /usr/local/bin
cd /home
mkdir -p $HOME/.kube
#transfer the file from the cce console to the bastion
mv -f cce-test-migration-kubeconfig.yaml $HOME/.kube/config
#for external it is necessary to activate EIP (if access from a bastion uses internal). We recommend using bastion with the above configurations
kubectl config use-context internal
#kubectl config use-context external
kubectl cluster-info
```

# Create Nginx and Wordpress cluster

<https://support.huaweicloud.com/intl/en-us/qs-cce/cce_qs_0003.html>

<https://support.huaweicloud.com/intl/en-us/qs-cce/cce_qs_0009.html>

<https://res-static.hc-cdn.cn/cloudbu-site/intl/en-us/Video/cce/wordpress_en.mp4>

# Configure pods

To snapshot specific disks in the cluster, a note must be made in the pod for the disk in question.

```shell
kubectl -n <namespace> annotate <pod/pod_name> backup.velero.io/backup-volumes=<volume_name_1>,<volume_name_2>,...
```

Example:

```shell
kubectl annotate pod/wordpress-758fbf6fc7-s7fsr backup.velero.io/backup-volumes=wp-storage
```

# Install Velero

For this procedure to be performed, the workernode needs to have an EIP, or
a NAT Gateway configured or the Velero images on the SWR.

```shell
wget https://github.com/vmware-tanzu/velero/releases/download/v1.12.1/velero-v1.12.1-linux-amd64.tar.gz

tar -xvf velero-v1.12.1-linux-amd64.tar.gz
cp ./velero-v1.12.1-linux-amd64/velero /usr/local/bin

nano credentials-velero
#place in the file
[default]
aws_access_key_id = {AK}
aws_secret_access_key = {SK}

#execute the command (for it to work, the machine must have internet access to download the image (NAT or EIP)). Note: The –uploader-type and –use-node-agent settings are related to creating a snapshot of the cluster disks.
velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.7.1 \
  --bucket migration-velero-cce \
  --secret-file ./credentials-velero \
  --uploader-type=restic \
  --use-node-agent \
  --use-volume-snapshots=false \
  --backup-location-config region=la-south-2,s3ForcePathStyle="true",s3Url=http://obs.la-south-2.myhuaweicloud.com
#check if the pod is running
kubectl get pod -n velero
#check if the connection to the bucket is ok
velero backup-location get
```

# Backup with Velero

```shell
#Obs: The flag –default-volumes-to-fs-backup is related to creating a snapshot of the cluster's disks.
velero backup create backup20231129 --default-volumes-to-fs-backup
velero backup describe backup20231129
```

# Restore Velero backup

```shell
velero backup get
velero restore create --from-backup=backup20231129
velero restore describe backup20231129-2376345178
```
