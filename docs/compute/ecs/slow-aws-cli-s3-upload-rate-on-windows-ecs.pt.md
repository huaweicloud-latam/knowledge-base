---
title: Velocidade de Upload Baixa no AWS CLI S3 em ECSs Windows
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Computação
lang: pt
permalink: /docs/compute/ecs/slow-aws-cli-s3-upload-rate-on-windows
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Velocidade de Upload Baixa no AWS CLI S3 em ECSs Windows

V1.0 – Agosto 2024

| **Versão**        | **Autor**             | **Descrição**        |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-08-09 | Diogo Hatz 50037923   | Tradução do Documento|
| V1.0 – 2024-08-10 | Wisley Paulo 00830850 | Revisão do Documento |

# Sintoma

A velocidade de upload do S3 AWS CLI ficará travada em 9 MiB/s, independentemente
de quão grande seja a largura de banda, em ECSs do Windows Server:

{% include image.html post=page.path file="image1.png" %}

# Solução

Modifique o arquivo: “C:\\Users\\Administrator\\.aws\\config” e adicione o
seguinte parâmetro:

{% include image.html post=page.path file="image2.png" %}

Após a modificação, a velocidade de upload aumentará de acordo com a largura de banda comprada:

{% include image.html post=page.path file="image3.png" %}

# Referências

- Documentação do AWS CLI S3, disponível em:
    <https://awscli.amazonaws.com/v2/documentation/api/latest/topic/s3-config.html#preferred-transfer-client>.
