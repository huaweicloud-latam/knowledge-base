---
title: Migrando Servidores com Discos Grandes
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migração
lang: pt
permalink: /docs/migration/sms/migrating-servers-with-huge-disks
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrando Servidores com Discos Grandes

V1.0 – Maio 2024

| **Versão**        | **Autor**                | **Descrição**        |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-05-07 | Diogo Hatz 50037923      | Versão Inicial       |
| V1.0 – 2024-05-07 | Wisley da Silva 00830850 | Revisão do Documento |

# Introdução

O SMS é uma ferramenta de migração de servidores online disponível na
Huawei Cloud. Durante a migração, é possível fazer o resizing do disco
da máquina de origem a fim de modificar as suas partições para melhor
atender o cenário de destino da máquina. O SMS possui uma restrição no
que diz respeito ao tamanho dos discos de sistema operacional, não
podendo ser maiores do que 1TiB.

Este documento tem como objetivo descrever a metodologia que circunda a
migração de servidores com o disco de sistema operacional excedendo
1TiB.

# API Explorer

A fim de realizar a migração de máquinas com o disco de sistema
operacional maiores do que 1TiB através da ferramenta SMS, faz-se
necessário criar o servidor de destino manualmente e expandir o tamanho
do seu disco de sistema por meio de uma API, API a qual é
disponibilizada no ambiente API Explorer da Huawei Cloud.

Para expandir o disco de um servidor, é necessário obter o ID do seu
disco. Para isso, navegue até a seção ECS no console da Huawei Cloud,
clique no servidor em que o disco está montado e clique no disco de
sistema desejado:

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image5.png)

Após obter o ID do disco que será redimensionado, navegue até a seção
API Explorer do console da Huawei Cloud, passando o mouse sobre “More”,
“Tools” e “API Explorer”. Selecione a seção “Elastic Volume Service
EVS” e, por fim, a API “ResizeVolume”. Alternativamente, clique no
seguinte link para ir diretamente até a API:
<https://console-intl.huaweicloud.com/apiexplorer/#/openapi/EVS/doc?api=ResizeVolume>.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image6.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image8.png)

Na janela da API, preencha os campos em vermelho com o ID do disco
selecionado anteriormente e o seu novo tamanho, em GiB. Após preencher
as lacunas, basta clicar em “Debug” que o disco será redimensionado para
o novo tamanho:

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image9.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image10.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Huge-Disks/media/image11.png)

Após redimensionar o disco do servidor de destino para um tamanho maior
do que o servidor de origem, o SMS poderá ser utilizado sem problemas
para a migração do servidor para a Huawei Cloud.

# Referências

  - API da EVS:
    <https://support.huaweicloud.com/intl/pt-br/api-evs/CinderResizeVolumeV3.html>.
