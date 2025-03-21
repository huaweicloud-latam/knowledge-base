---
title: Criando uma Imagem Privada do Workspace para Windows 10 e Ubuntu
layout: default
parent: Image Management Service (IMS)
grand_parent: Computação
lang: pt
permalink: /docs/compute/ims/Creating a Private Windows 10 and Ubuntu Workspace Image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Criando uma Imagem Privada do Workspace para Windows 10 e Ubuntu

V1.0 – Novembro 2023

| **Versão**        | **Autor**                      | **Descrição**   |
| ----------------- | ------------------------------ | --------------- |
| V1.0 – 2023-11-09 | Wisley da Silva Paulo 00830850 | Initial version |
|                   |                                |                 |
|                   |                                |                 |

# Objetivo

Este documento objetiva colher e formalizar informações necessárias para
a implementação criação de imagens privadas no serviço IMS para serem
utilizadas no serviço de Workspace da Huawei Cloud.

# Criação imagem Windows 10

1.  Faço o download da imagem ISO do Windows 10 no site da Microsoft.

2.  Faça o download dos pacotes conforme apresentado no link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0507.html>) e adicione em um bucket para facilitar a transferência para a máquina no momento da instalação.

3.  Depois de baixar a imagem ISO do Windows 10 e todos os pacotes realize o procedimento do link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0508.html>) para adicionar drivers no arquivo ISO.

4.  Inicie a instalação e configure o driver conforme o demonstrado no link (<https://support.huaweicloud.com/intl/en-us/usermanual-ims/en-us_topic_0146474784.html>).

5.  Acesse o CD abra a pasta vmtools que foi adicionada na ISO e instale o vmtools.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image6.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image7.png)

### Ative o usuário Administrator clicando com botão direto do mouse no botão iniciar, acessando opção “Computer Management”, acesse a opção “Local User...”, depois “User”, clique com botão direito no usuário Administrator, propriedades e depois desmarque a opção de desabilitar o usuário. Repita o procedimento para acessar o usuário e configure uma senha para o usuário. Faço logoff com usuário atual e o login com o usuário Administrator.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image8.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image9.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image10.png)

### Efetue os ajuste indicados no link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0510.html>) **até o item 56**.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image11.png)

### Ignore o item marcado em vermelho nesse item.

### Pode ignorar os itens entre 40 e 49

### Itens 50 a 56 apenas verificações (raramente é necessário ajuste).

Efetue a instalação dos softwares indicados no link (<https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0510.html>) do item 57 em diante.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image12.png)

### Verifique no painel de controle se os programas foram instalados

### Antes da instalação da última ferramenta (Workspace\_HDP\_WindowsDesktop\_Installer) garanta que todas as atualizações do sistema operacional foram realizadas, caso contrário pode receber o erro:

![C:\\Users\\w00830850\\AppData\\Roaming\\eSpace\_Desktop\\UserData\\w00830850\\imagefiles\\130E24AA-8D4F-40C5-8D3C-CA991947FBDC.png](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image13.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image14.png)

### Esse comando tem um erro a palavra marcada falta uma letra “n” o comando correto é: run\_silent.bat --passive --environment\_type 2 --nocheck --noshutdown

### Quando inicializar o acesso do Administrator estará indisponível, login com usuário criado na instalação e set uma nova senha para o Administrator, faça o login com Administrator para o procedimento ser finalizado.

### Com todos os ajustes da instância realizados, agora utilizamos a ECS para criação da imagem, basta parar a ECS e na opção more selecionar “Manage Image” e depois Create Image.

### ![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image15.png)

### Com a imagem criada e aparecendo no serviço de IMS já está disponível para ser utilizada no serviço do Workspace.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image16.png)

# Criação imagem Ubuntu

### Faça o download da imagem ISO do Ubuntu Desktop (são suportados no momento do documento as versões 18.04.5-desktop-amd64 ou ubuntu-20.04.5.0-desktop-amd64 - <https://mu.releases.ubuntu.com/20.04.5/> - <https://old-releases.ubuntu.com/releases/18.04.5/>) e faça o upload no OBS.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image17.png)

## Importe a imagem ISO do ubuntu no serviço IMS.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image18.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image19.png)

## ![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image20.png)

## Crie uma ECS usando a imagem criada com o importe da imagem ISO.

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image21.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image22.png)

## Acesso a instância e abra o terminal shell

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image23.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image24.png)

## Instale os pacotes libxcb-xinerama0, gawk

```shell
sudo su
apt update
apt install libxcb-xinerama0 -y
apt install gawk -y
```

##  Install the Linux Kernel (For Ubuntu 20.04 Only)

```shell
apt install linux-image-5.15.0-72-generic -y
apt install linuxheaders-5.15.0-72-generic -y
apt install linux-modules-extra-5.15.0-72-generic -y
grep menuentry /boot/grub/grub.cfg
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image25.png)

## Registre a localização da versão 5.15.0-72, como mostrado na figura do kernel:

```shell
sudo nano /etc/default/grub
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image26.png)

##  Instale e inicie o openssh

```shell
apt update
apt install openssh-server -y
service sshd start
```

##  Configura o sshd.conf

```shell
nano /etc/ssh/sshd_config
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image27.png)

## Instalar python 3

```shell
apt install python3 -y
python3 --version
```

## Instalar e configurar o cloud-init

```shell
apt install cloud-init -y
nano /etc/cloud/cloud.cfg
```

### Altere o parâmetro disable\_root para false, adicione as linhas no final
do arquivo, ajuste os módulos config comentando a linha “locale”, na
lista de módulos de inicialização coloque o ssh como primeiro item :

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image28.png)

```shell
datasource_list: [ OpenStack ]
datasource:
  OpenStack:
    metadata_urls: ['http://169.254.169.254']
    max_wait: 120
    timeout: 5
network:
  config: disabled
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image29.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image30.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image31.png)

###  Verifique o cloud-init, caso apresente algum erro tente reiniciar a instância e execute o comando novamente:

```shell
sudo cloud-init init --local
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image32.png)

##  Instalar KVM

### Adicione o drivers do virtio no arquivo: “/etc/initramfs-tools/modules”:

```shell
nano /etc/initramfs-tools/modules

virtio_blk
virtio_scsi
virtio_net
virtio_pci
virtio_ring
virtio
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image33.png)

```shell
update-initramfs -u
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image34.png)

## Baixe o pacote do HDA

```shell
wget https://workspace-hdp-gray-cn-east-3.obs.cn-east-3.myhuaweicloud.com/WorkspaceHDP/HDPAgent/23.05.5/Workspace_HDP_LinuxDesktop_23.5.5.0922.iso
cp Workspace_HDP_LinuxDesktop_23.5.5.0922.iso /tmp
```

## Instalar o HAD

```shell
mount /tmp/Workspace_HDP_LinuxDesktop_23.5.5.0922.iso /mnt
cd /mnt
/bin/bash autorun.sh

# O sistema vai reiniciar

rm -rf /tmp/Workspace_HDP_LinuxDesktop_23.5.5.0922.iso
cat /usr/local/hdpserver/version.txt
sudo apt-mark hold `uname -r`
```

## Limpe o cache

```shell
cd /usr/local/hdpserver/hwsysagent/scripts20
bash cleanCache.sh
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image35.png)


```shell
touch /usr/share/glib-2.0/schemas/19_mysettings.gschema.override
nano /usr/share/glib-2.0/schemas/19_mysettings.gschema.override
```

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image36.png)

```shell
sudo glib-compile-schemas /usr/share/glib-2.0/schemas
```

## Para a instância e criar a imagem:

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image37.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image38.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image39.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-private-windows-10-and-ubuntu-workspace-images/media/image40.png)
