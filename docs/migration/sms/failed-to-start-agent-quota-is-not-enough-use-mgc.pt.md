---
title: Falha ao iniciar o agente, erro：Current quota is not enough, please use MgC
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migração
lang: pt
permalink: /docs/migration/sms/failed-to-start-agent-error-quota-is-not-enough
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Falha ao iniciar o agente, erro: Current quota is not enough, please use MgC

V1.0 – Maio 2024

| **Versão**        | **Autor**             | **Descrição**        |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-05-21 | Diogo Hatz 50037923   | Tradução do Documento|
| V1.0 – 2024-05-22 | Wisley Paulo 00830850 | Revisão do Documento |

Motivo:

> Esta mensagem é exibida porque o número de servidores de origem
> relatados ao SMS atingiu o limite superior (mais de 10) e a
> tarefa de migração não pode ser adicionada manualmente.

Solução:

1. O sistema operacional é o Windows.

Você pode ir para o seguinte diretório: C:\\SMS-Agent-Py3\\config   ou
C:\\SMS-Agent-Py2\\config.

{% include image.html post=page.path file="image1.png" %}

Em seguida, abra o arquivo conforme mostrado na imagem: g-property.cfg

{% include image.html post=page.path file="image2.png" %}

Em seguida, altere 'start\_type = MANUAL' para 'start\_type = MGC' no arquivo.

antes:{% include image.html post=page.path file="image3.png" %}

depois:{% include image.html post=page.path file="image4.png" %}

Finalmente, reinicie o agente.

2. O sistema operacional é Linux.

Você pode abrir o arquivo :SMS-Agent/agent/config/g-property.cfg

Então altere 'start\_type = MANUAL' para 'start\_type = MGC' no arquivo.

{% include image.html post=page.path file="image5.png" %}



Por último, reinicie o agente.
