---
title: Automatizar o Ciclo de Vida de Recursos
layout: default
parent: Cloud Operations Center (COC)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/coc/automate-resources-lifecycle
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Automatizar o Ciclo de Vida de Recursos

V1.0 – Setembro 2024

| **Versão**        | **Autor**                      | **Descrição**        |
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

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

Navegue até a seção “Resource O\&M” e acesse a subseção “Automated
O\&M”.

{% include image.html post=page.path file="image5.png" %}

Selecione a rotina de “Scheduled O\&M” para definir uma política
automatizada de ligamento e desligamento de recursos e clique em “Create
Task”.

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

Insira informações pertinentes à task, como o seu nome e o enterprise
project a qual a task pertencerá. Ademais, insira, também, um fuzo
horário para a definição periódica da task. Selecione a opção “Periodic
execution” para definir uma data e horário para a execução da função
periódica, assim como a data de expiração da função.

{% include image.html post=page.path file="image8.png" %}

{% include image.html post=page.path file="image9.png" %}

Selecione o tipo de task como “Jobs” e “Common Jobs” e selecione o job
desejado. Neste exemplo, será criada uma tarefa para a inicialização de
ECSs automaticamente. Selecione a agency “ServiceLinkedAgencyForCOC” em
“IAM Agency” e a região utilizada.

{% include image.html post=page.path file="image10.png" %}

Clique em “+Add” para adicionar instâncias de ECSs que farão parte da
task periódica e selecione as respectivas instâncias.

{% include image.html post=page.path file="image11.png" %}

{% include image.html post=page.path file="image12.png" %}

Após isso, basta desabilitar a opção de Batch Policy e Manual Review e
clicar em “Submit” para salvar a task criada. **Obs:** A opção de batch
policy serve para delimitar grupos distintos de recursos para a task, ao
passo em que a opção manual review serve para forçar a autorização da
execução da task por um aprovador delimitado.

{% include image.html post=page.path file="image13.png" %}

É possível ver o status da task como “Enabled” no console do COC.

{% include image.html post=page.path file="image14.png" %}

# Exemplo

Após a definição da task criada no item 2.0 deste documento, é possível
ver que, no momento em que o dia e horário especificados na task foram
atingidos, a ECS delimitada na task foi inicializada.

{% include image.html post=page.path file="image15.png" %}

{% include image.html post=page.path file="image16.png" %}

Também é possível ver o status de execução da task pelo console do COC

{% include image.html post=page.path file="image17.png" %}

{% include image.html post=page.path file="image18.png" %}

# Referências

  - Documentação do COC:
    <https://support.huaweicloud.com/intl/en-us/usermanual-coc/coc_um_05_03_01.html>.
