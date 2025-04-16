---
title: Migrando SOs Não Suportados
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migração
lang: pt
permalink: /docs/migration/sms/migrating-unsupported-os
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrando SOs Não Suportados

V1.0 – Maio 2024

| **Versão**        | **Autor**                | **Descrição**        |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-05-17 | Diogo Hatz 50037923      | Versão Inicial       |
| V1.0 – 2024-05-17 | Wisley da Silva 00830850 | Revisão do Documento |

# Introdução

O SMS é uma ferramenta de migração de servidores online disponível na
Huawei Cloud. Além da migração de servidores de inúmeros sistemas
operacionais, também é possível realizar a sincronização entre
servidores com a função de sync. No entanto, o SMS possui restrições
sobre certos sistemas operacionais específicos, os quais podem ser
verificados na documentação presente nas referências.

Este documento tem como objetivo descrever a metodologia que circunda a
migração de servidores cujos SOs não são suportados pela ferramenta SMS
através do SMS. Vale notar que não é garantido que esse processo
funcionará, tendo em vista que o SMS não é compatível com certos
sistemas operacionais e é possível que configurações adicionais precisem
ser feitas.

# SMS-Agent

A fim de realizar a migração de VMs que possuem um sistema operacional
não suportado pelo SMS, primeiramente é necessário alterar o arquivo
que contém o nome que representa a versão do sistema operacional para
fazer com que o SMS não falhe durante o precheck da migração.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image3.png)

Para realizar essa modificação, faça login no ambiente de origem e
digite o seguinte comando, em que “Amazon_2018_3_64BIT” pode ser
substituído por quaisquer versões compatíveis com o SMS.

```shell
echo "Amazon_2018_3_64BIT" > /root/RainbowOsFile
```

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image4.png)

Após a configuração sido feita, navegue até a seção relativa ao serviço
do SMS no console da HWC e delete as tarefas de migração com erro.
Depois, entre no diretório de instalação do agente do SMS na máquina de
origem e reinicie o agente rodando o script “./restart.sh”. Insira as
chaves AK/SK assim como o endpoint do SMS para configurar novamente o
agente do SMS.

#  Erro de Inicialização da ECS Migrada

Caso a máquina migrada apresente problemas durante a inicialização, como
ficar presa no processo de boot, é possível que alguns ajustes precisem
ser feitos na máquina migrada. Abaixo há uma lista de alguns erros
conhecidos. Caso nenhuma das soluções abaixo resolva o problema, é
recomendado que um ticket seja aberto para que os especialistas possam
averiguar o problema com maior precisão.

Para realizar as seguintes configurações, será necessário remover o
disco de sistema da máquina migrada como um disco de dados em uma ECS
intermediária da seguinte forma.

Após a criação de uma nova ECS no console da HWC, monte os discos na
máquina intermediária. Primeiramente, remova os discos danificados da
ECS original para depois os colocar na ECS intermediária.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image5.png)

Após remover os discos da ECS original, monte-os na ECS intermediária

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image6.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image8.png)

## **IPV6**

Caso o erro durante a inicialização da ECS se assemelhe à imagem abaixo,
é possível que o erro é relativo a uma configuração de IPV6 na máquina.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image9.png)

Para resolver esse erro, desmonte o disco de sistema da máquina migrada
e o conecte à ECS intermediária. Monte o disco de sistema em um novo
diretório (neste exemplo foi montado na pasta /mnt) com o comando
“mount” e acesse o seguinte arquivo: “vim
/mnt/etc/sysconfig/network-scripts/ifcfg-eth0”. Comente as duas
seguintes linhas no arquivo e salve o arquivo com “:wq”.

**<span class="underline">Observação:</span>** caso o erro “Failed to
Mount Wrong FS Type, Bad Option, Bad Superblock on Linux” apareça
durante a montagem do disco, pule para a etapa **3.2** deste documento.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image10.png)

Agora desmonte o disco montado com o comando “umount”, remova o disco de
sistema da máquina migrada da ECS intermediária e a conecte novamente na
ECS migrada. Ligue-a e verifique se a máquina inicializa sem erros.

Para garantir que a funcionalidade de Sync funcione sem quebrar a
máquina migrada, realize a seguinte configuração no script do agente do
SMS na VM de origem:

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image11.png)

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image12.png)

Após esse ajuste, a funcionalidade de Sync deve funcionar sem demais
problemas.

## **Sistema de Arquivos**

Caso o filesystem das máquinas migradas esteja corrompido após a
migração, será necessário restaura-lo através de uma VM intermediária.
Para confirmar que o filesystem do disco de sistema está danificado,
primeiro espere até que a seguinte mensagem apareça durante o boot.
Esperar o seguinte erro aparecer antes de seguir para as próximas etapas
é importante para o processo.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image13.png)

Faça login na ECS intermediária e digite o comando “fdisk -l” para
listar os discos montados na ECS. Copie o path do device cujo filesystem
está danificado, como “/dev/vdc” ou “/dev/vdb1”.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image14.png)

Para recuperar o filesystem danificado, digite o comando “fsck
/dev/vdb”, em que /dev/vdb será substituído pelo disco ou partição que
precisa ser recuperada. Pressione “a” para recuperar todos os inodes
corrompidos. Vale notar que o disco não precisa ser montado em um
diretório para esse processo.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image15.png)

Aguarde até que a recuperação de todos os inodes seja concluída, remova
o disco de sistema da máquina migrada da ECS intermediária e a conecte
novamente na ECS migrada. Ligue-a e verifique se a máquina inicializa
sem erros.

## **Fstab**

Caso a ECS apresente problemas durante a sua inicialização, siga os
seguintes passos para editar a tabela de discos fstab do sistema. Vale a
nota que para este passo também será necessário a utilização de uma ECS
intermediária caso o filesystem da ECS original esteja definido como
somente para leitura devido a uma má inicialização. Primeiramente, monte
o disco de sistema em um diretório.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image16.png)

Edite o arquivo “/etc/fstab” do disco de sistema da ECS original.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image17.png)

Comente todas as passagens de antigos discos montados no fstab.

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image18.png)

Após isso, desmonte o disco do diretório em que foi montado e remova os
discos da ECS para inserir na ECS original novamente

![](/huaweicloud-knowledge-base/assets/images/SMS-Migrating-Unsupported-OS/media/image19.png)

# Referências

  - Documentação do SMS:
    <https://support.huaweicloud.com/intl/en-us/productdesc-sms/sms3_01_0012.html>.
