---
title: Falha ao iniciar o agente, erro: Current quota is not enough, please use MgC
layout: default
parent: Server Migration Service (SMS)
grand_parent: Migração
lang: pt-BR
permalink: /docs/Migration/SMS/Failed to start agent，error：Current quota is not enough, please use MgC
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Falha ao iniciar o agente, erro: Current quota is not enough, please use MgC

Motivo:

> Esta mensagem é exibida porque o número de servidores de origem
> relatados ao SMS atingiu o limite superior (mais de 10) e a
> tarefa de migração não pode ser adicionada manualmente.

Solução:

1、O sistema operacional é o Windows.

Você pode ir para o seguinte diretório: C:\\SMS-Agent-Py3\\config   ou
C:\\SMS-Agent-Py2\\config.

![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image1.png)

Em seguida, abra o arquivo conforme mostrado na imagem: g-property.cfg

![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image2.png)

Em seguida, altere 'start\_type = MANUAL' para 'start\_type = MGC' no arquivo.

antes:![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image3.png)

depois:![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image4.png)

Finalmente, reinicie o agente.

2、O sistema operacional é Linux.

Você pode abrir o arquivo :SMS-Agent/agent/config/g-property.cfg

Então altere 'start\_type = MANUAL' para 'start\_type = MGC' no arquivo.

![](/huaweicloud-knowledge-base/assets/images/SMS-Failed-to-Start-Agent/media/image5.png)



Finalmente, reinicie o agente.
