---
title: ECS Travada Após Migração
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migração
lang: pt
permalink: /docs/migration/sms/bricked-ecs-after-migration-troubleshooting
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# ECS Travada Após Migração

V1.0 – Julho 2024

| **Versão**        | **Autor**                | **Descrição**        |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-07-30 | Diogo Hatz 50037923      | Versão Inicial       |
| V1.0 – 2024-07-30 | Wisley da Silva 00830850 | Revisão do Documento |

# Introdução

O SMS é um serviço de migração de máquinas virtuais disponibilizado na
Huawei Cloud. Com esse serviço, é possível migrar VMs de outras
provedoras cloud ou de ambientes on-premises para a nuvem. O SMS migra
máquinas virtuais para ECSs, que correspondem ao serviço de máquinas
virtuais na Huawei Cloud.

Este documento tem como objetivo apresentar uma solução para VMs
migradas utilizando o serviço de migração SMS em que não é possível nem
acessar a máquina através do “remote login”, pelo console, e nem por
acesso remoto através de protocolos como o SSH.

# Considerações

**<span class="underline">Importante:</span>** É possível que inúmeros
fatores distintos causem o congelamento de ECSs após a sua migração por
meio do SMS. Neste documento será abordada a questão de compatibilidade
de certas versões do cloud-init com o serviço de ECS, que é um dos
fatores que pode causar o congelamento da ECS.

# Sintomas

Ao tentar acessar a ECS por meio de “remote login” ou SSH, os seguintes
erros ocorrem:

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

# ECS temporária

Como a ECS não pode ser acessada, será necessário remover o seu disco de
sistema e o acoplar a uma ECS temporária para poder acessar o seu menu
de boot. Para isso, primeiramente, crie uma ECS temporária com o
**<span class="underline">mesmo sistema operacional</span>** e
**<span class="underline">mesma AZ</span>** da máquina congelada. Após
isso, remova o disco de sistema da ECS congelada e o coloque na ECS
temporária como um disco de dados.

Removendo o disco de sistema da ECS congelada:

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

Acoplando o disco de sistema da ECS congelada na ECS temporária como um
disco de dados:

{% include image.html post=page.path file="image8.png" %}

{% include image.html post=page.path file="image9.png" %}

{% include image.html post=page.path file="image10.png" %}

Após isso, acesse remotamente a ECS temporária e use o comando “fdisk
-l” para listar os discos acoplados na máquina.

{% include image.html post=page.path file="image11.png" %}

Ao identificar o disco que foi acoplado à ECS temporária, realize a
montagem do disco com o comando mount. Por exemplo: “mount /dev/vdb1
/mnt”.

{% include image.html post=page.path file="image12.png" %}

Feito a montagem, realize os seguintes passos:

1.  > Delete o arquivo de configurações do grub com o comando:
2.  
```shell
rm /mnt/boot/grub/grub.cfg
```

{% include image.html post=page.path file="image13.png" %}

2.  > Copie o kernel genérico da ECS temporária para o diretório /boot da ECS congelada: 

```shell
cp /boot/vmlinuz-5.4.0-170-generic /mnt/boot/vmlinuz-5.4.0-170-generic
```
**<span class="underline">Importante:</span>** O nome do kernel utilizado foi somente um exemplo, é necessário copiar o kernel utilizado pela ECS temporária. Em caso de dúvida, utilize o comando “uname -r” para listar a versão do kernel em execução.

{% include image.html post=page.path file="image14.png" %}

3.  > Copie o initrd da ESC temporária para o diretório /boot da ECS congelada: 

```shell
cp /boot/initrd.img-5.4.0-170-generic /mnt/boot/initrd.img-5.4.0-170-generic
```
**<span class="underline">Importante:</span>** Copie o initrd relativo ao kernel copiado no item 2.0. Caso não haja nenhum initrd, gere um com o comando “update-initramfs -u”.

{% include image.html post=page.path file="image15.png" %}

Remova o disco de dados com o comando “umount /dev/vdb1”.

{% include image.html post=page.path file="image16.png" %}

Feito isso, coloque o disco de sistema da ECS congelada de volta na ECS
original, seguindo o passo-a-passo do item 4.0 deste documento. Feito
isso, inicie a máquina e faça “remote login” nela através do console.

{% include image.html post=page.path file="image17.png" %}

# Grub shell

{% include image.html post=page.path file="image18.png)

Execute o comando “ls” para listar as partições de disco vistas pelo
Grub. Para identificar qual é a partição correta a ser utilizada,
execute o comando “ls (hd0,gpt1" %}/” até encontrar a partição com o
conteúdo do disco de sistema, substituindo “hd0,gpt1” pelas partições
vistas pelo comando “ls”.

{% include image.html post=page.path file="image19.png)

Ao encontrar a partição correta, efetue os seguintes passos para dar
boot em modo single-user no kernel da ECS temporária:

1. Substituindo (hd0,gpt1) pela partição encontrada acima;
```shell
set root=(hd0,gpt1" %}
```

2. Substituindo “vmlinuz-5.4.0-170-generic” pelo kernel copiado da
ECS temporária no item 4.0 deste documento e substituindo “vda1”
de acordo com a partição encontrada.
**<span class="underline">Exemplo:</span>** (hd0,gp1) = vda1, (hd1,gpt1) = vdb1, (hd3,gpt2) = /dev/vdd2, e assim por diante;
```shell
linux /boot/vmlinuz-5.4.0-170-generic root=/dev/vda1 ro single
```

3. Substituindo “initrd.img-5.4.0-170-generic” pelo initrd copiado da
ECS temporária no item 4.0 deste documento;
```shell
initrd /boot/initrd.img-5.4.0-170-generic
```

4. Finalize dando boot.
```shell
boot
```

{% include image.html post=page.path file="image20.png" %}

Após digitar o comando boot, a ECS será inicializada em modo
single-user. Digite a senha root da ECS quando requisitado.

{% include image.html post=page.path file="image21.png" %}

# Single-user

Utilize o comando “apt-get remove cloud-init -y” para desinstalar o
cloud-init.

{% include image.html post=page.path file="image22.png" %}

Utilize o comando “update-grub” para gerar o arquivo de configurações do
grub previamente deletado.

{% include image.html post=page.path file="image23.png" %}

Utilize o comando “grep 'menuentry ' /boot/grub/grub.cfg” para listar as
versões do kernel existentes no sistema e copie a versão desejada para
que o Grub dê boot por padrão.

{% include image.html post=page.path file="image24.png" %}

Utilize o comando “vim /etc/default/grub” para modificar o arquivo de
configurações do grub. Altere os parâmetros grub_default={nome do
kernel copiado acima}, "grub_timeout_style=menu" e "grub_timeout=10".

{% include image.html post=page.path file="image25.png" %}

{% include image.html post=page.path file="image26.png" %}

Utilize o comando “update-grub” para atualizar o arquivo de
configurações do grub novamente.

{% include image.html post=page.path file="image23.png" %}

Utilize o comando “reboot” para reiniciar a ECS. Note que agora a
máquina inicializará normalmente.

# Configurações

Verifique a conectividade da ECS com o comando “ip a”. Caso a ECS não
possua a interface eth0 configurada corretamente, é possível que haja um
conflito na configuração do programa netplan. Caso a ECS possua
conectividade normalmente, pule a seção 7.1 deste documento.

## **Netplan**

Digite o comando “vim /etc/netplan/50-cloud-init.yaml” para abrir o
arquivo de configurações de rede da ECS e adicione a interface eth0 da
seguinte forma:

{% include image.html post=page.path file="image27.png" %}

Feito isso, aplique as configurações feitas com o comando “netplan
apply”

{% include image.html post=page.path file="image28.png" %}

{% include image.html post=page.path file="image29.png" %}

Caso a conectividade ainda não tenha retornado ao normal, verifique a
instalação dos drivers KVM a partir da seguinte documentação:
<https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0326.html#ims_01_0326__section1865536911274>.

## Config

Caso a VM tenha sido migrada da Azure, será necessário alterar os
repositórios do Yum da máquina para apontar para o repositório da
Huawei:

```shell
sed -i 's/azure.archive.ubuntu.com/repo.huaweicloud.com/g' /etc/apt/sources.list

apt autoclean && apt update
```

{% include image.html post=page.path file="image30.png" %}

Feito a troca dos repositórios, reinstale o cloud-init com o comando:

```shell
apt-get install cloud-init
```

**<span class="underline">Importante:</span>** Não instale a versão
23.3.3 do cloud-init.

{% include image.html post=page.path file="image31.png" %}

Instale uma nova versão do kernel do Linux com o comando:

```shell
apt-get install linux-image-generic
```

{% include image.html post=page.path file="image32.png" %}

Utilize o comando “grep 'menuentry ' /boot/grub/grub.cfg” para listar as
versões do kernel existentes no sistema e copie a versão mais recente
instalada.

{% include image.html post=page.path file="image33.png" %}

Utilize o comando “vim /etc/default/grub” para modificar o arquivo de
configurações do grub. Altere os parâmetros grub\_default={nome do
kernel copiado acima}.
{% include image.html post=page.path file="image34.png" %}

Utilize o comando “update-grub” para atualizar o arquivo de
configurações do grub novamente.

{% include image.html post=page.path file="image35.png)

Utilize o comando “reboot” para reiniciar a ECS no kernel atualizado.

# Configurações (Opcional" %}

Além das configurações realizadas acima, também é recomendado que o
agente da Azure, que é instalado por padrão em VMs da Azure, seja
desinstalado, uma vez que o agente reporta logs para o console da VNC
constantemente, o que pode afetar a performance do VNC:

Digite o seguinte comando para desinstalar o agente da Azure:

```shell
sudo apt -y remove walinuxagent
apt-get remove -y linux-azure-*
apt-get remove -y *azure
```

# Referências

  - Instalação dos drivers KVM:
    <https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0326.html#ims_01_0326__section1865536911274>.
