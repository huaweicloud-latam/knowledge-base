---
title: OBS-triggered Functions
layout: default
parent: Functiongraph
grand_parent: Compute
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# OBS-triggered Functions

V1.0 – Julho 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-07-04 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-07-04 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
criação de uma função no serviço serverless FunctionGraph da Huawei
Cloud com ativação por meio de upload de novos objetos em buckets do
OBS.

# Agency

Para delegar permissões do serviço de object storage (OBS) para o
FunctionGraph, faz-se necessário criar uma agency com permissões sobre o
OBS. Navegue até o serviço IAM no console da Huawei Cloud e clique na
página “Agencies”. Clique para criar uma agency em “Create Agency”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image3.png)

Dê um nome para a agency, selecione o tipo de agency como “Cloud
Service” e selecione o serviço FunctionGraph. Clique em “Next” para
avançar.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image4.png)

Delegue permissões de “OBS ReadOnlyAccess” para a agency e clique em
“Next” e, então, em “OK” para concluir.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image6.png)

# FunctionGraph

Acesse o serviço FunctionGraph no console da Huawei Cloud e navegue até
a página Functions \> Function List. Clique em “Create Function”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image7.png)

Selecione a opção “Create from scratch”, dê um nome para a função,
selecione o runtime em que a função será executada e selecione a agency
criada no item 2.0 deste documento.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image8.png)

Tendo criada a função, clique em “Create Trigger” para criar um trigger
para a função ser ativada.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image9.png)

Selecione o Trigger Type como sendo “Object Storage Service (OBS)”,
selecione o bucket desejado e o Event como “ObjectCreated”, para que a
função seja ativada toda vez que um novo objeto aparecer no bucket em
questão. Também é possível configurar um prefixo e um sufixo dos objetos
específicos que irão acionar a função, configurando um Prefix ou Suffix.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image10.png)

Tendo criado o trigger, agora basta importar o código que será executado
pela função em Code Source, como APIs.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image11.png)

Também é possível adicionar dependências e bibliotecas third-party
navegando até a parte de baixo do painel da função.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image12.png)

# Exemplo

Neste exemplo, uma função em Python foi escrita para realizar uma
requisição em um servidor web rodando em uma ECS toda vez que um novo
objeto aparecer no bucket definido no item 3.0 deste documento.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image13.png)

Realizando o upload de um objeto no bucket definido:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image14.png)

Resultado no listener do servidor:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-OBS-Trigger/media/image15.png)

# Referências

  - Documentação do FunctionGraph:
    <https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_0205.html>
