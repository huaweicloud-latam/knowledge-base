---
title: Automate Resources Lifecycle
layout: default
parent: Cloud Operations Center (COC)
grand_parent: Management & Governance
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Automate Resources Lifecycle

V1.0 – Setembro 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-09-10 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-09-10 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
criação de uma task automatizada para ligar e desligar recursos na
Huawei Cloud de forma periódica através do serviço Cloud Operations
Center (COC).

# COC

Para criar uma task automatizada para ligar e desligar os recursos de
uma conta na Huawei Cloud, primeiramente, acesse o serviço COC através
do console da HWC e permita a delegação de permissões para a agency
relativa ao serviço do COC. **Obs:** As agencies criadas para o serviço
do COC serão utilizadas somente para delegar permissões ao serviço COC.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image4.png)

Navegue até a seção “Resource O\&M” e acesse a subseção “Automated
O\&M”.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image5.png)

Selecione a rotina de “Scheduled O\&M” para definir uma política
automatizada de ligamento e desligamento de recursos e clique em “Create
Task”.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image6.png)

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image7.png)

Insira informações pertinentes à task, como o seu nome e o enterprise
project a qual a task pertencerá. Ademais, insira, também, um fuzo
horário para a definição periódica da task. Selecione a opção “Periodic
execution” para definir uma data e horário para a execução da função
periódica, assim como a data de expiração da função.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image8.png)

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image9.png)

Selecione o tipo de task como “Jobs” e “Common Jobs” e selecione o job
desejado. Neste exemplo, será criada uma tarefa para a inicialização de
ECSs automaticamente. Selecione a agency “ServiceLinkedAgencyForCOC” em
“IAM Agency” e a região utilizada.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image10.png)

Clique em “+Add” para adicionar instâncias de ECSs que farão parte da
task periódica e selecione as respectivas instâncias.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image11.png)

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image12.png)

Após isso, basta desabilitar a opção de Batch Policy e Manual Review e
clicar em “Submit” para salvar a task criada. **Obs:** A opção de batch
policy serve para delimitar grupos distintos de recursos para a task, ao
passo em que a opção manual review serve para forçar a autorização da
execução da task por um aprovador delimitado.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image13.png)

É possível ver o status da task como “Enabled” no console do COC.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image14.png)

# Exemplo

Após a definição da task criada no item 2.0 deste documento, é possível
ver que, no momento em que o dia e horário especificados na task foram
atingidos, a ECS delimitada na task foi inicializada.

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image15.png)

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image16.png)

Também é possível ver o status de execução da task pelo console do COC

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/COC-Automate-Resources-Lifecycle/media/image18.png)

# Referências

  - Documentação do COC:
    <https://support.huaweicloud.com/intl/en-us/usermanual-coc/coc_um_05_03_01.html>.
