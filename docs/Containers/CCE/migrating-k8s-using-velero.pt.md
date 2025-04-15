---
title: Migrando Cluster K8S Usando Velero
layout: default
parent: Cloud Container Engine (CCE)
grand_parent: Containers
lang: pt
permalink: /docs/containers/cce/Migrating K8S Cluster Using Velero
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrando Cluster K8S Usando Velero

V1.1 – Janeiro 2024

| **Versão**        | **Autoria**           | **Descrição**            |
| ----------------- | --------------------- | ------------------------ |
| V1.0 – 2023-11-29 | Wisley Paulo w0083850 | Versão inicial           |
| V1.1 – 2024-01-22 | Diogo Hatz 50037923   | Atualização do documento |
| V1.1 – 2024-01-22 | Wisley Paulo w0083850 | Revisão do documento     |

Este documento apresenta os procedimentos para criar um cluster CCE e
implementar uma aplicação com ngix e wordpress no cluster, depois das
aplicações serem testadas, realizar backup e restore do ambiente
utilizando velero.

# Criação cluster

Para iniciar acessamos o serviço do CCE e criamos o cluster conforme apresentado nas imagens abaixo (para esses teste o cluster de origem foi criado na região de Santiago e o cluster de destino na região de São Paulo):

![](/huaweicloud-knowledge-base/assets/images/CCE-Migrating-K8S-Using-Velero/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/CCE-Migrating-K8S-Using-Velero/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/CCE-Migrating-K8S-Using-Velero/media/image5.png)

# Instalar e configurar kubectl (bastion)

Crie uma instância de bastion com serviço de ECS na mesma região do
cluster com ip público e apenas com acesso ssh para os IPs públicos
seguros para gestão do cluster.

```shell
#install kubectl (Recomendado em bastion na mesma região)
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
#transferir o arquivo da console do cce para bastion
mv -f cce-test-migration-kubeconfig.yaml $HOME/.kube/config
#para external necessário ativar EIP (caso acesso de um bastion usar internal). Recomendamos o uso do bastion com as configurações acima
kubectl config use-context internal
#kubectl config use-context external
kubectl cluster-info
```

# Criar cluster Nginx e Wordpress

<https://support.huaweicloud.com/intl/en-us/qs-cce/cce_qs_0003.html>

<https://support.huaweicloud.com/intl/en-us/qs-cce/cce_qs_0009.html>

<https://res-static.hc-cdn.cn/cloudbu-site/intl/en-us/Video/cce/wordpress_en.mp4>

# Configurar os pods

Para realizar o snapshot de discos específicos do cluster, é preciso ser
feito uma anotação no pod do disco em questão.

```shell
kubectl -n <namespace> annotate <pod/pod_name> backup.velero.io/backup-volumes=<volume_name_1>,<volume_name_2>,...
```

Exemplo:

```shell
kubectl annotate pod/wordpress-758fbf6fc7-s7fsr backup.velero.io/backup-volumes=wp-storage
```

# Instalar o Velero

Para esse procedimento ser realizado o workernode precisa ter um EIP, ou
um NAT Gateway configurado ou as imagens do Velero no SWR.

```shell
wget https://github.com/vmware-tanzu/velero/releases/download/v1.12.1/velero-v1.12.1-linux-amd64.tar.gz

tar -xvf velero-v1.12.1-linux-amd64.tar.gz
cp ./velero-v1.12.1-linux-amd64/velero /usr/local/bin

nano credentials-velero
#colocar no arquivo
[default]
aws_access_key_id = {AK}
aws_secret_access_key = {SK}

#execute o comando (para funcionar é necessário que a máquina tenha acesso a internet para baixar imagem (NAT ou EIP)). Obs: As configurações –uploader-type e –use-node-agent são relativos à criação de uma snapshot dos discos do cluster.
velero install \
  --provider aws \
  --plugins velero/velero-plugin-for-aws:v1.7.1 \
  --bucket migration-velero-cce \
  --secret-file ./credentials-velero \
  --uploader-type=restic \
  --use-node-agent \
  --use-volume-snapshots=false \
  --backup-location-config region=la-south-2,s3ForcePathStyle="true",s3Url=http://obs.la-south-2.myhuaweicloud.com
#verifique se o pod está rodando
kubectl get pod -n velero
#verifique se a conexão com o bucket está ok
velero backup-location get
```

# Backup com Velero

```shell
#Obs: A flag –default-volumes-to-fs-backup é relativa à criação de uma snapshot dos discos do cluster.
velero backup create backup20231129 --default-volumes-to-fs-backup
velero backup describe backup20231129
```

# Restore backup do Velero

```shell
velero backup get
velero restore create --from-backup=backup20231129
velero restore describe backup20231129-2376345178
```
