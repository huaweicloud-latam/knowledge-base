---
title: Criando uma Imagem Privada Ubuntu
layout: default
parent: Image Management Service (IMS)
grand_parent: Computação
lang: pt
permalink: /docs/compute/ims/Creating a Private Ubuntu Image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Criando uma Imagem Privada Ubuntu

V1.0 – Novembro 2023

| **Versão**        | **Autor**                      | **Descrição**   |
| ----------------- | ------------------------------ | --------------- |
| V1.0 – 2023-11-20 | Wisley da Silva Paulo 00830850 | Initial version |
|                   |                                |                 |
|                   |                                |                 |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para
criação de imagem do Ubuntu 20.04 com UEFI utilizando o serviço de IMS.

# Criação imagem Ubuntu

## Faça o download da imagem ISO do Ubuntu Server (exemplo - <https://releases.ubuntu.com/focal/>) e faça o upload no OBS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image3.png)

## Importe a imagem ISO do ubuntu no serviço IMS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image6.png)

Obs.: No momento da criação deste documento quando selecionamos UEFI e
Ubuntu não aparece as opções para versões 18.04 e 20.04, mas isso foi
reportado ao time de produto que informou e a alteração será feita em
dezembro de 2023. Nesse momento pode selecionar a opção 16.04 que o
sistema irá funcionar normalmente.

## Crie uma ECS usando a imagem criada com o importe da imagem ISO.

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image8.png)

## Acesso a instância e abra o terminal shell

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image9.png)

## Instalar KVM

Adicione o drivers do virtio no arquivo: “/etc/initramfs-tools/modules”:

```shell
nano /etc/initramfs-tools/modules

virtio_blk
virtio_scsi
virtio_net
virtio_pci
virtio_ring
virtio
```

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image10.png)

```shell
update-initramfs -u
```

## Instale e inicie o openssh

```shell
apt update
apt install openssh-server -y
service sshd start
```

##  Configura o sshd.conf

```shell
nano /etc/ssh/sshd_config
```

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image11.png)

## Instalar e configurar o cloud-init

(apt install cloud-init não está funcionando para versão 20.04, instala
a versão 23 e ela está com problemas de compatibilidade)

```shell
apt remove cloud-init
apt purge cloud-init
rm -rf /var/lib/cloud/*
rm -rf /var/log/cloud-init*
rm -rf /var/lib/cloud
rm -rf /etc/cloud
rm -rf /usr/local/bin/cloud*
apt update
apt install cloud-guest-utils -y
apt install python3-pip -y
apt install python3-devel
wget https://launchpad.net/cloud-init/trunk/19.1/+download/cloud-init-19.1.tar.gz
tar -zxvf cloud-init-19.1.tar.gz
cd cloud-init-19.1
pip3 install -r ./requirements.txt
python3 setup.py install
cloud-init -v
cloud-init init --local

nano /etc/cloud/cloud.cfg
```

Altere os parâmetros conforme imagens, adicione as linhas no final do
arquivo:

```shell
- name: root
   lock_passwd: False

ssh_pwauth: true
```

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image12.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image13.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image14.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image15.png)

```shell
datasource_list: [ OpenStack ]
datasource:
  OpenStack:
    metadata_urls: ['http://169.254.169.254']
    max_wait: 120
    timeout: 5
    apply_network_config: false
network:
  config: disabled
```

##  Verifique o cloud-init, caso apresente algum erro tente reiniciar a instância e execute o comando novamente:

```shell
sudo cloud-init init --local
```

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image16.png)

## Para a instância e criar a imagem:

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image18.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image19.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Creating-a-Private-Ubuntu-Image/media/image20.png)
