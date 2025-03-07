---
title: Migrating Multiple Disks
layout: default
parent: Image Management Service (IMS)
grand_parent: Compute
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrating Multiple Disks

V2.0 – Maio 2024

| **Versão**        | **Autor**                | **Descrição**            |
| ----------------- | ------------------------ | ------------------------ |
| V1.0 – 2024-05-08 | Diogo Hatz 50037923      | Versão Inicial           |
| V1.0 – 2024-05-08 | Wisley da Silva 00830850 | Revisão do Documento     |
| V2.0 – 2024-05-16 | Diogo Hatz 50037923      | Atualização do Documento |

# Introdução

O IMS é um serviço de gerenciamento de imagens disponível na Huawei
Cloud. Além de disponibilizar uma gama de imagens públicas para livre
utilização, através do IMS também é possível criar imagens privadas a
partir de inúmeros formatos ou utilizar imagens disponíveis no
marketplace.

Este documento tem como objetivo descrever a metodologia que circunda a
criação de imagens privadas a partir de discos de sistema e discos de
dados.

# qemu-img

Para realizar a migração de VMs utilizando o IMS, faz-se necessário a
instalação da ferramenta qemu-img para realizar a geração das imagens de
sistema e disco. Instale a ferramenta através do seguinte comando: “yum
install qemu-img -y”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image3.png)

Para verificar os paths dos discos a serem migrados, digite o comando
“fdisk -l” para listar os discos presentes na VM.
**<span class="underline">Importante:</span>** Tome nota do path do
disco como **um todo (vda),** e não de somente uma partição do disco
(vda1).

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image4.png)

Para exportar os discos para imagens, digite o seguinte comando “sudo
qemu-img convert -f raw -O qcow2 /dev/vda /mnt/vdb/test.qcow2”, em que o
parâmetro ”-O” corresponde ao formato em que a imagem será exportada
(possíveis formatos: qcow2, vhd, vmdk, raw, etc), “/dev/vda” corresponde
ao disco que será exportado e “/mnt/vdb/test.qcow2” corresponde à imagem
que será gerada pela ferramenta.

Após a geração da imagem, será necessário exportar essa imagem para um
bucket no OBS, o serviço de object storage da HWC. Para isso, uma das
opções é a utilização da ferramenta obsutil, que permite o upload de
arquivos de uma máquina Linux diretamente para um bucket do OBS através
da CLI. Documentação do obsutil:
<https://support.huaweicloud.com/intl/en-us/utiltg-obs/obs_11_0003.html>.

# IMS

A fim de realizar a importação de imagens para o IMS, faz-se necessário
que essas imagens estejam disponíveis em um bucket no serviço de Object
Storage OBS da Huawei Cloud. Após realizar o upload dessas imagens para
o bucket, navegue até a seção do serviço IMS no console da Huawei Cloud
e selecione “Create Image”, na seção “Private Images”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image6.png)

Selecione a opção “Import Image”. Para discos de sistema, selecione, em
seguida, a opção “System disk image” e clique no bucket em que a imagem
está contida.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image7.png)

Selecione a imagem do disco de sistema dentre os objetos contidos no
bucket e selecione a opção “Enable automatic configuration”. Preencha,
também, os campos relativos ao modo de Boot da máquina de origem, BIOS
ou UEFI, o sistema operacional da máquina, o tamanho do disco de sistema
e o nome da imagem a ser criada. Clique em “Next” para avançar e
confirme a criação da imagem.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image8.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image9.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image10.png)

Aguarde até que a imagem termine de ser criada.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image11.png)

Para realizar a criação dos discos de dados, repita o mesmo processo
acima, selecionando a opção “Data disk image” em “Image Type” ao invés
de “System disk image”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image12.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image13.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image14.png)

# Criação da ECS

Após o término da criação das imagens, navegue até a imagem do disco de
sistema criada e selecione “Apply for Server” para criar um servidor a
partir da imagem gerada.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image15.png)

Selecione a imagem do disco de sistema criada e preencha as demais
configurações de criação da ECS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image16.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image17.png)

# Criação da EVS

Após a criação do servidor a partir de seu disco de sistema, navegue até
a imagem do disco de dados criada e selecione “Create Data Disk” para
criar um disco de dados a partir da imagem gerada.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image18.png)

Configure os parâmetros do disco a ser criado, como nome e tamanho do
disco, e **assinale a mesma AZ do servidor criado previamente**. Caso
contrário, **não** será possível montar o disco na ECS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image19.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image20.png)

# Mount da EVS na ECS

Por último, para realizar o mount do disco de dados no servidor, navegue
até a seção de ECS no console e clique na ECS criada. Após isso, clique
na seção “Disks” e selecione “Attach Disk”

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image21.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image22.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image23.png)

Selecione o disco criado e clique em “OK” para associar o disco à
instância. Com o disco associado à instância, basta configurar o mount
do disco através do terminal da instância.

# Recuperar Sistema de Arquivos

Caso o filesystem das máquinas migradas esteja corrompido após a
migração, será necessário restaura-lo através de uma VM intermediária.
Para confirmar que o filesystem do disco de sistema está danificado,
primeiro espere até que a seguinte mensagem apareça durante o boot.
Esperar o seguinte erro aparecer antes de seguir para as próximas etapas
é importante para o processo.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image24.png)

Após a criação de uma nova ECS no console da HWC, monte os discos cujo
filesystem precisarão ser restaurados na ECS intermediária.
Primeiramente, remova os discos danificados da ECS original para depois
os colocar na ECS intermediária.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image25.png)

Após remover os discos da ECS original, monte-os na ECS intermediária

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image26.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image27.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image28.png)

Faça login na ECS intermediária e digite o comando “fdisk -l” para
listar os discos montados na ECS. Copie o path do device cujo filesystem
está danificado, como “/dev/vdc” ou “/dev/vdb1”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image29.png)

Para recuperar o filesystem danificado, digite o comando “fsck
/dev/vdb”, em que /dev/vdb será substituído pelo disco ou partição que
precisa ser recuperada. Pressione “a” para recuperar todos os inodes
corrompidos. Vale notar que o disco não precisa ser montado em um
diretório para esse processo.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image30.png)

Aguarde até que a recuperação de todos os inodes seja concluída.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image31.png)

# Modificação do fstab

Caso a ECS apresente problemas durante a sua inicialização, siga os
seguintes passos para editar a tabela de discos fstab do sistema. Vale a
nota que para este passo também será necessário a utilização de uma ECS
intermediária caso o filesystem da ECS original esteja definido como
somente para leitura devido a uma má inicialização. Primeiramente, monte
o disco de sistema em um diretório.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image32.png)

Edite o arquivo “/etc/fstab” do disco de sistema da ECS original.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image33.png)

Comente todas as passagens de antigos discos montados no fstab.

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image34.png)

Após isso, desmonte o disco do diretório em que foi montado e remova os
discos da ECS para inserir na ECS original novamente

![](/huaweicloud-knowledge-base/assets/images/IMS-Migrating-Multiple-Disks/media/image35.png)

# Referências

  - Documentação do SMS:
    <https://support.huaweicloud.com/intl/en-us/bestpractice-sms/sms_05_0071.html>.

  - Documentação do IMS:
    <https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0215.html>.

  - Documentação do obsutil:
    <https://support.huaweicloud.com/intl/en-us/utiltg-obs/obs_11_0003.html>.
