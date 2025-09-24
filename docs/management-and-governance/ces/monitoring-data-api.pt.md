---
title: Dados de Monitoramento Através de Chamadas de API
layout: default
parent: Cloud Eye Service (CES)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/ces/monitoring-data-through-api-calling
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Dados de Monitoramento Através de Chamadas de API

V1.0 – Março 2024

| **Versão**        | **Autor**                | **Descrição**        |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-03-08 | Diogo Hatz 50037923      | Versão Inicial       |
| V1.0 – 2024-03-08 | Wisley da Silva 00830850 | Revisão do Documento |

# Introdução

O Cloud Eye (CES) é uma ferramenta gratuita para o monitoramento de
recursos da Huawei Cloud. Além do monitoramento de recursos, o Cloud Eye
também pode ser utilizado para criar alarmes baseados em eventos ou
métricas, identificar o mau funcionamento de recursos e rapidamente
reagir à mudança de recursos. Vale ressaltar que, por mais que o Cloud
Eye seja um serviço gratuito, **as cobranças geradas pelo envio de
notificações ao disparar alarmes são cobradas**.

Este documento tem como objetivo descrever as principais funcionalidades
do serviço Cloud Eye e guiar o leitor a utilizar a API do Cloud Eye para
o monitoramento de recursos da nuvem, como VPNs, através de requisições.

# API do CloudEye

Para realizar o monitoramento de recursos provisionados na Huawei Cloud
através de APIs, é necessário, primeiramente, obter uma lista das
métricas de monitoramento do serviço desejado com os seus respectivos
parâmetros. Para isso, identifique a *namespace* do serviço que se
deseja realizar o monitoramento através do seguinte hyperlink:
<https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0059.html>. O
*namespace* de monitoramento do serviço de VPN, por exemplo, se
configura como “SYS.VPN”.

## **API relativa à listagem das métricas de monitoramento**

Para realizar a listagem das métricas de monitoramento de determinado
serviço, basta utilizar a API “ListMetrics” disponibilizada na HWC.
**Atenção: Para obter as métricas de monitoramento de determinado
serviço, é necessário que pelo menos um recurso ou instância desse
serviço esteja provisionado na região em que a API está apontando.**
Para este guia, será utilizado o serviço API Explorer da Huawei Cloud
para facilitar a visualização dos parâmetros da API. O serviço API
Explorer pode ser acessado através do seguinte link:
<https://console-intl.huaweicloud.com/apiexplorer/#/openapi/CES/doc?version=v1&api=ListMetrics>,
ou então através do passo-a-passo abaixo:

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png" %}

Para esta API, basta preencher os parâmetros relativos à região em que o
recurso a ser monitorado está provisionado, ao id do projeto do recurso
e o *namespace* do recurso, que foi obtido no item 3.0 deste guia. Para
obter o id do projeto do recurso, basta navegar até a seguinte página do
console:

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

Após preencher os parâmetros necessários, clique em “Debug” para obter o
json relativo às métricas de monitoramento existentes para a *namespace*
do recurso desejado.

{% include image.html post=page.path file="image8.png" %}

{% include image.html post=page.path file="image9.png" %}

A resposta da requisição será a listagem das métricas de monitoramento
para o recurso desejado, como é possível ser observado na figura abaixo:

{% include image.html post=page.path file="image10.png" %}

A documentação desta API pode ser visualizada no seguinte link, para
maior detalhamento das configurações da API:
<https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0023.html> .

## **API relativa à consulta dos dados de monitoramento**

A API que realizará a query para os dados do monitoramento de
determinado serviço é a API “BatchListMetricData”, que pode ser acessada
através do seguinte link:
<https://console-intl.huaweicloud.com/apiexplorer/#/openapi/CES/debug?version=v1&api=BatchListMetricData>
; ou então através do seguinte passo-a-passo:

{% include image.html post=page.path file="image11.png" %}

Para esta API, preencha todos os parâmetros disponíveis na API. Os
parâmetros *metric\_name*, *name* e *value* foram retornados pela API
relativo ao item 3.1 deste guia, ao passo em que o parâmetro *namespace*
foi obtido no item 3.0 deste documento. Para as demais configurações, é
possível ver quais parâmetros colocar nos campos abaixo:

  - **period:** Possíveis valores: 1, 300, 1200, 3600, 14400 ou 86400:

    - **1:** Não é feita agregação, os dados são mostrados em formato
    bruto;

    - **300:** A agregação dos dados é feita a cada 5 minutos;

    - **1200:** A agregação dos dados é feita a cada 20 minutos;

    - **3600:** A agregação dos dados é feita a cada 60 minutos;

    - **14400:** A agregação dos dados é feita a cada 4 horas;

    - **86400:** A agregação dos dados é feita a cada 24 horas.

  - **filter:** Possíveis valores: max, min, average, sum ou variance.

    - **Max:** Retorna os valores máximos dos dados;

    - **Min:** Retorna os valores mínimos dos dados;

    - **Average:** Retorna uma média dos dados;

    - **Variance:** Retorna a variância dos dados.

  - **from:** O período de início da busca. Este parâmetro de tempo
    adota a unidade **UNIX** de tempo em **milissegundos**. Um conversor
    de tempo padrão para UNIX pode ser acessado na seguinte página:
    <https://www.unixtimestamp.com/>. Após realizar a conversão,
    adicione três zeros (0) ao número, para esse ser representado em
    milissegundos.

  - **to:** O período de fim da busca. Este parâmetro de tempo adota a
    unidade **UNIX** de tempo em **milissegundos**. Um conversor de
    tempo padrão para UNIX pode ser acessado na seguinte página:
    <https://www.unixtimestamp.com/>. Após realizar a conversão,
    adicione três zeros (0) ao número, para esse ser representado em
    milissegundos.

Exemplo de requisição:

{% include image.html post=page.path file="image12.png" %}

Após o preenchimento de todos os parâmetros, selecione o botão de
“Debug” para obter a resposta da requisição da API:

{% include image.html post=page.path file="image13.png" %}

A métrica utilizada como exemplo é relativa à quantidade de conexões
presentes no gateway de determinada VPN. A documentação desta API pode
ser visualizada no seguinte link, para maior detalhamento:
<https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0034.html> .

## **Demais configurações das requisições**

Para obter um template do header e body da requisição da API, utilize o
serviço API Explorer listado acima da Huawei Cloud ou refira à
documentação através do seguinte link:
<https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0002.html> .
Seguindo o passo-a-passo da documentação é possível visualizar como
estruturar a requisição, o endpoint do request, a autenticação, etc.

# Anexos

## **Métricas de monitoramento de VPN Gateway**

| **Métricas**                       | **Suportado** |
| ---------------------------------- | ------------- |
| Taxa de pacotes de entrada         | Sim           |
| Taxa de pacotes de saída           | Sim           |
| Largura de banda de entrada        | Sim           |
| Largura de banda de saída          | Sim           |
| Uso de largura de banda de entrada | Sim           |
| Número de conexões                 | Sim           |
| Uso de largura de banda de saída   | Sim           |

## **Métricas de monitoramento da conexão VPN**

| **Métricas**                      | **Suportado** |
| --------------------------------- | ------------- |
| Média de RTT do túnel             | Sim           |
| Máximo de RTT do túnel            | Sim           |
| Taxa de perda de pacotes do túnel | Sim           |
| Média de link RTT                 | Sim           |
| Máximo de link RTT                | Sim           |
| Taxa de perda de pacotes do link  | Sim           |
| Status da conexão VPN             | Sim           |
| Taxa de recebimento de pacotes    | Sim           |
| Taxa de envio de pacotes          | Sim           |
| Taxa de recebimento de tráfego    | Sim           |
| Taxa de envio de tráfego          | Sim           |
| Taxa de envio de pacote SA        | Sim           |
| Taxa de recebimento de pacote SA  | Sim           |
| Taxa de envio de tráfego SA       | Sim           |
| Taxa de recebimento de tráfego SA | Sim           |

# Referências

  - Documentação do CES:
    <https://support.huaweicloud.com/intl/en-us/function-ces/index.html>

  - API do CloudEye:
    <https://support.huaweicloud.com/intl/en-us/api-ces/en-us_topic_0171212514.html>

  - API ListMetrics:
    <https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0023.html>

  - API BatchListMetricData:
    <https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0034.html>

  - Cloud Eye API:
    <https://support.huaweicloud.com/intl/en-us/api-ces/ces_03_0002.html>
