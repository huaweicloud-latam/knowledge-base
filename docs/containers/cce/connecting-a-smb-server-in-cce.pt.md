---
title: Conectando um Servidor SMB no CCE
layout: default
parent: Cloud Container Engine (CCE)
grand_parent: Containers
lang: pt
permalink: /docs/containers/cce/connecting-a-smb-server-in-cce
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Conectando um Servidor SMB no CCE

V1.0 – Agosto 2024

| **Versão**        | **Autor**                | **Descrição**         |
| ----------------- | ---------------------    | --------------------- |
| V1.0 – 2024-08-01 | Gustavo Scovini 50037306 | Versão Inicial        |

## Introdução

Este guia o guiará pelas etapas para conectar e montar um servidor SMB existente em um pod Kubernetes usando o Cloud Container Engine (CCE) da Huawei Cloud.

## Pré-requisitos

- Servidor Linux SMB implantado. Neste guia, será usado o Ubuntu 22.04:
<https://ubuntu.com/tutorials/install-and-configure-samba#1-overview>

- Kubectl:
<https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/>

- Compra de um EIP:
<https://support.huaweicloud.com/intl/en-us/qs-eip/eip_qs_0001.html>

- CCE (padrão) implantado no HWC com um **EIP**:
<https://support.huaweicloud.com/intl/en-us/qs-cce/cce_qs_0008.html>

- Nó criado no CCE:
<https://support.huaweicloud.com/intl/en-us/api-cce/cce_02_0242.html>

**OBS:** Todos os recursos neste guia são implantados na mesma
rede (192.168.0.0/16). Se você planeja implantá-los em redes
separadas, certifique-se de que haja conectividade adequada entre o servidor SMB e
o ambiente CCE.

# CONFIGURAÇÃO

## Conectando ao cluster usando kubectl

Na página da instância CCE, clique em **Visão Geral**\>**EIP\>Vincular**

{% include image.html post=page.path file="image3.png" %}

Agora, clique em **kubectl \> Configurar**, copie o conteúdo do arquivo YAML
e cole-o no arquivo .kube/config.

## Instalando o Helm 3

### Para instalar o driver CSI, usaremos o gerenciador de pacotes Helm. Siga estas etapas para concluir a instalação:

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

## Instalando o Driver SMB CSI para Kubernetes

O driver SMB CSI permite que o Kubernetes acesse servidores SMB em nós Linux e Windows. Ele suporta o provisionamento dinâmico de Volumes Persistentes (PVs) por meio de Declarações de Volume Persistentes (PVCs), criando novos subdiretórios no servidor SMB. Para mais detalhes, visite
a página do [driver SMB CSI no GitHub](https://github.com/kubernetes-csi/csi-driver-smb?tab=readme-ov-file).

```shell
helm repo add csi-driver-smb https://raw.githubusercontent.com/kubernetes-csi/csi-driver-smb/master/charts
helm install csi-driver-smb csi-driver-smb/csi-driver-smb --namespace kube-system --version v1.15.0 --set linux.kubelet=" /mnt/paas/kubernetes/kubelet"
```

**OBS:** O parâmetro **--set linux.kubelet="
/mnt/paas/kubernetes/kubelet"** é obrigatório aqui

## Crie um segredo para armazenar credenciais SMB

```shell
kubectl create secret generic smbcreds --from-literal username=USERNAME --from-literal password="PASSWORD"
```

## Crie um PV vinculado ao compartilhamento SMB

Crie um Arquivo **pv-smb.yaml** e edite *source* em *volumeAttributes*:

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

Execute e crie o PV:

```shell
kubectl create -f pv-smb.yaml
```

## Crie um PVC

Crie um arquivo **pvc-smb-static.yaml**:

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

Execute e crie o PVC:

```shell
kubectl create -f pvc-smb-static.yaml
```

## Criar uma implantação **web-demo.yaml**

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

Executar e Crie a implantação:

```shell
kubectl create -f web-demo.yaml
```

Efetue login no contêiner e verifique o volume montado:

```shell
kubectl get pods
kubectl exec -it <container-name> -- df -h
```

{% include image.html post=page.path file="image4.png" %}
