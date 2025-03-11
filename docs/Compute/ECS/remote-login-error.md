---
title: Remote Login Bricked Error
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Compute
permalink: /docs/Compute/ECS/Remote Login Bricked Error
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Remote Login Bricked Error

V1.0 – March 2024

| **Version**       | **Author**              | **Description**                    |
| ----------------- | ------------------------ | ------------------------------------ |
| V1.0 – 2024-03-13 | Yangqiang 1153592        | Versão Inicial em Chinês             |
| V1.0 – 2024-03-13 | Gaowei 1074902           | Tradução do Documento para Inglês    |
| V1.0 – 2024-03-14 | Diogo Hatz 50037923      | Tradução do Documento para Português |
| V1.0 – 2024-03-14 | Wisley da Silva 00830850 | Revisão do Documento                 |

# Introdução

O SMS é um serviço de migração de máquinas virtuais disponibilizado na
Huawei Cloud. Com esse serviço, é possível migrar VMs de outras
provedoras cloud ou de ambientes on-premises para a nuvem. O SMS migra
máquinas virtuais para ECSs, que correspondem ao serviço de máquinas
virtuais na Huawei Cloud.

Este documento tem como objetivo listar otimizações para VMs migradas da
provedora Azure Cloud para a Huawei Cloud, assim como solucionar o erro
de tela congelada em ECSs para a funcionalidade Remote Login no console
da HWC.

# Configurações

O erro em questão para que o Remote Login fique congelado é relativo ao
VNC, software de acesso remoto a outros computadores.

![](/huaweicloud-knowledge-base/assets/images/ECS-Remote-Login-Error/media/image3.png)

As VMs Linux criadas na Azure Cloud possuem o kernel modificado, o que
pode causar problemas de conflitos com o software do VNC. Para realizar
as modificações necessárias, siga o passo-a-passo abaixo:

1.  Conecte à instância via SSH e modifique os seguintes parâmetros:
    
    1.1 Comente a linha GRUB\_TIMEOUT\_STYLE=hidden
    
    1.2 Modifique o GRUB\_TIMEOUT para 10: GRUB\_TIMEOUT=10

![](/huaweicloud-knowledge-base/assets/images/ECS-Remote-Login-Error/media/image4.png)

Delete o arquivo 

```shell
rm -rf /etc/default/grub.d/50*
```

Após a deleção dos arquivos, execute o seguinte comando para atualizar as configurações do grub.

```shell
update-grub2
```

Modifique o repositório do Yum para apontar para o repositório da Huawei:

```shell
sed -i 's/azure.archive.ubuntu.com/repo.huaweicloud.com/g' /etc/apt/sources.list
apt autoclean && apt update
```

Instale o kernel público do Ubuntu: 

```shell
apt install linux-image-generic
```

Após a instalação ser concluída, reinicie a ECS e selecione o kernel genérico na tela do grub. **Obs:** É possível modificar o parâmetro **GRUB_DEFAULT** para apontar para o kernel genérico ao invés de manualmente selecionar o kernel genérico ao bootar a ECS.

# Configurações Opcionais

Além das configurações realizadas acima, também é recomendado que o agente da Azure, que é instalado por padrão em VMs da Azure, seja desinstalado, uma vez que o agente reporta logs para o console da VNC constantemente, o que pode afetar a performance do VNC:

Digite o seguinte comando para desinstalar o agente da Azure: 

```shell
sudo apt -y remove walinuxagent
```

# Referências

  - <https://learn.microsoft.com/en-us/azure/virtual-machines/linux/disable-provisioning>.


