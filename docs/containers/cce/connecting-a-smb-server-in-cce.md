---
title: Connecting a SMB Server to CCE
layout: default
parent: Cloud Container Engine (CCE)
grand_parent: Containers
permalink: /docs/containers/cce/connecting-a-smb-server-in-cce
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Connecting a SMB Server to CCE

V1.0 – August 2024

| **Version**       | **Author**               | **Description** |
|-------------------|--------------------------|-----------------|
| V1.0 – 2024-08-01 | Gustavo Scovini 50037306 | Initial version |

# INTRODUCTION

This guide will walk you through the steps to connect and mount an
existing SMB server to a Kubernetes pod using Huawei Cloud's Cloud
Container Engine (CCE).

## Prerequisites

- Linux SMB server deployed, in this guide it\`ll be used Ubuntu 22.04:
  <https://ubuntu.com/tutorials/install-and-configure-samba#1-overview>

- Kubectl:
  <https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/>

- Buying an EIP:
  <https://support.huaweicloud.com/intl/en-us/qs-eip/eip_qs_0001.html>

- CCE (standard) deployed in HWC with an **EIP**:
  <https://support.huaweicloud.com/intl/en-us/qs-cce/cce_qs_0008.html>

- Node created in CCE:
  <https://support.huaweicloud.com/intl/en-us/api-cce/cce_02_0242.html>

**OBS:** All resources in this guide are deployed within the same
network (192.168.0.0/16). If you plan to deploy them in separate
networks, ensure there is proper connectivity between the SMB server and
the CCE environment.

# CONFIGURATION

## Connecting to cluster using kubectl

In the CCE instance page, click on **Overview**\>**EIP\>Bind**

{% include image.html post=page.path file="image3.png" %}

Now, click on **kubectl \> Configure**, copy the contents of the YAML
file, and paste them into the. kube/config file.

## Installing Helm 3

### To install the CSI driver, we will use the Helm package manager. Follow these steps to complete the installation:

### Windows (Chocolatey) 

```shell
choco install kubernetes-helm 
```

### Linux (Script)

```shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

## Installing SMB CSI Driver for Kubernetes

The SMB CSI driver enables Kubernetes to access SMB servers on both
Linux and Windows nodes. It supports the dynamic provisioning of
Persistent Volumes (PVs) through Persistent Volume Claims (PVCs) by
creating new subdirectories on the SMB server. For more details, visit
the [SMB CSI driver GitHub
page](https://github.com/kubernetes-csi/csi-driver-smb?tab=readme-ov-file).

```shell
helm repo add csi-driver-smb https://raw.githubusercontent.com/kubernetes-csi/csi-driver-smb/master/charts
helm install csi-driver-smb csi-driver-smb/csi-driver-smb --namespace kube-system --version v1.15.0 --set linux.kubelet=" /mnt/paas/kubernetes/kubelet"
```

**OBS:** The parameter **--set linux.kubelet="
/mnt/paas/kubernetes/kubelet"** is mandatory here

## Create a secret to store SMB credentials

```shell
kubectl create secret generic smbcreds --from-literal username=USERNAME --from-literal password="PASSWORD"
```

## Create PV bound with SMB share

Create a **pv-smb.yaml** file and edit *source* in *volumeAttributes*:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  annotations:
    pv.kubernetes.io/provisioned-by: smb.csi.k8s.io
  name: pv-smb
spec:
  capacity:
    storage: 40Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: smb
  mountOptions:
    - dir_mode=0777
    - file_mode=0777
  csi:
    driver: smb.csi.k8s.io
    # volumeHandle format: {smb-server-address}#{sub-dir-name}#{share-name}
    # make sure this value is unique for every share in the cluster
    volumeHandle: smb-server.default.svc.cluster.local/share##
    volumeAttributes:
      source: //192.168.0.93/sambashare
    nodeStageSecretRef:
      name: smbcreds
      namespace: default
```

Execute and create the PV:

```shell
kubectl create -f pv-smb.yaml
```

## Create a PVC

Create a **pvc-smb-static.yaml** file:

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: pvc-smb
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  volumeName: pv-smb
  storageClassName: smb
```

Execute and create the PVC:

```shell
kubectl create -f pvc-smb-static.yaml
```

## Create a deployment **web-demo.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.19.5
          ports:
            - containerPort: 80
          volumeMounts:
            - name: nginx-storage
              mountPath: /usr/share/nginx/html
      volumes:
        - name: nginx-storage
          persistentVolumeClaim:
            claimName: pvc-smb
```

Execute and create the deployment:

```shell
kubectl create -f web-demo.yaml
```

Log in to the container and check the mounted volume:

```shell
kubectl get pods
kubectl exec -it <container-name> -- df -h
```

{% include image.html post=page.path file="image4.png" %}