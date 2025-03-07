---
title: Creating a Private OracleOS 7.9 Image
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating a Private OracleOS 7.9 Image

V1.0 – Junho 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-06-06 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-06-06 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para
criação de imagem do OracleOS 7.9 utilizando o serviço de IMS.

# Criação imagem OracleOS
    
Faça o download da imagem ISO do OracleOS (exemplo - <https://yum.oracle.com/oracle-linux-isos.html>) e faça o upload no OBS.

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image3.png)

## Importe a imagem ISO do OracleOS no serviço IMS.

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image6.png)

## Crie uma ECS usando a imagem criada com o importe da imagem ISO. 

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image8.png)

## Acesse a instância e abra o terminal shell

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image9.png)

## Vincule um EIP à máquina

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image10.png)

## Instalar KVM

Adicione o drivers do KVM no arquivo: “/etc/dracut.conf”:

```shell
vi /etc/dracut.conf

virtio\_blk virtio\_scsi virtio\_net virtio\_pci virtio\_ring virtio
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image11.png)

```shell
dracut -f /boot/initramfs-2.6.32-573.8.1.el6.x86\_64.img
```

Substituia “initramfs-2.6.32-573.8.1.el6.x86\_64.img” pelo initramfs
utilizado pelo kernel atual. Para verificar o arquivo initramfs por
kernel, verifique no arquivo /boot/grub2/grub.cfg.

Para verificar se os drivers foram instalados, digite o seguinte comando

```shell
lsinitrd /boot/initramfs-\`uname -r\`.img | grep virtio
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image12.png)

## Edite a interface de rede eth0

```shell
vi /etc/sysconfig/network-scripts/ifcfg-eth0
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image13.png)

## Instalar e configurar o cloud-init

```shell
yum update -y

yum install cloud-init -y
```

## Instale o plugin de troca de senha da HWC

```shell
vi /etc/selinux/config
```

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image14.png)

```shell
systemctl reboot

wget
<https://ap-southeast-2-cloud-reset-pwd.obs.ap-southeast-2.myhuaweicloud.com/linux/64/reset_pwd_agent/CloudResetPwdAgent.zip>

unzip CloudResetPwdAgent.zip

cd CloudResetPwdAgent/CloudResetPwdAgent.Linux

chmod +x setup.sh

sudo sh setup.sh

chmod 700 /CloudrResetPwdAgent/bin/cloudResetPwdAgent.script

chmod 700 /CloudrResetPwdAgent/bin/wrapper

chmod 600 /CloudrResetPwdAgent/lib/\*

systemctl start cloudResetPwdAgent

systemctl enable cloudResetPwdAgent
```

## (opcional) Troque o kernel default do Grub para o kernel que será utilizado

<https://docs.oracle.com/en/learn/oracle-linux-kernels/#change-the-default-kernel>

## (opcional) Caso algum dos kernels apresente erros para a inicialização, digite o seguinte comando

```shell
dracut --regenerate-all –force
```

## Para a instância e criar a imagem:

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image15.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image16.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/ECS-Private-OracleOS-7.9-Image/media/image18.png)
