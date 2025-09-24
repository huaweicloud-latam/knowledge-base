---
title: Funções Ativadas pelo OBS
layout: default
parent: FunctionGraph
grand_parent: Computação
lang: pt
permalink: /docs/compute/functiongraph/obs-triggered-functions
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Funções Ativadas pelo OBS

V1.0 – Julho 2024

| **Versão**        | **Autor**                      | **Descrição**        |
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

{% include image.html post=page.path file="image3.png" %}

Dê um nome para a agency, selecione o tipo de agency como “Cloud
Service” e selecione o serviço FunctionGraph. Clique em “Next” para
avançar.

{% include image.html post=page.path file="image4.png" %}

Delegue permissões de “OBS ReadOnlyAccess” para a agency e clique em
“Next” e, então, em “OK” para concluir.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

# FunctionGraph

Acesse o serviço FunctionGraph no console da Huawei Cloud e navegue até
a página Functions \> Function List. Clique em “Create Function”.

{% include image.html post=page.path file="image7.png" %}

Selecione a opção “Create from scratch”, dê um nome para a função,
selecione o runtime em que a função será executada e selecione a agency
criada no item 2.0 deste documento.

{% include image.html post=page.path file="image8.png" %}

Tendo criada a função, clique em “Create Trigger” para criar um trigger
para a função ser ativada.

{% include image.html post=page.path file="image9.png)

Selecione o Trigger Type como sendo “Object Storage Service (OBS" %}”,
selecione o bucket desejado e o Event como “ObjectCreated”, para que a
função seja ativada toda vez que um novo objeto aparecer no bucket em
questão. Também é possível configurar um prefixo e um sufixo dos objetos
específicos que irão acionar a função, configurando um Prefix ou Suffix.

{% include image.html post=page.path file="image10.png" %}

Tendo criado o trigger, agora basta importar o código que será executado
pela função em Code Source, como APIs.

{% include image.html post=page.path file="image11.png" %}

Também é possível adicionar dependências e bibliotecas third-party
navegando até a parte de baixo do painel da função.

{% include image.html post=page.path file="image12.png" %}

# Exemplo

Neste exemplo, uma função em Python foi escrita para realizar uma
requisição em um servidor web rodando em uma ECS toda vez que um novo
objeto aparecer no bucket definido no item 3.0 deste documento.

{% include image.html post=page.path file="image13.png" %}

Realizando o upload de um objeto no bucket definido:

{% include image.html post=page.path file="image14.png" %}

Resultado no listener do servidor:

{% include image.html post=page.path file="image15.png" %}

# Referências

  - Documentação do FunctionGraph:
    <https://support.huaweicloud.com/intl/en-us/usermanual-functiongraph/functiongraph_01_0205.html>
