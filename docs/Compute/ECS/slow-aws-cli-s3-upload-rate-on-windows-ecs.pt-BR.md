---
title: Velocidade de Upload Baixa no AWS CLI S3 em ECSs Windows
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Computação
lang: pt-BR
permalink: /docs/Compute/ECS/Slow AWS CLI S3 Upload Rate on Windows ECSs
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Velocidade de Upload Baixa no AWS CLI S3 em ECSs Windows

# Sintoma

A velocidade de upload do S3 AWS CLI ficará travada em 9 MiB/s, independentemente
de quão grande seja a largura de banda, em ECSs do Windows Server:

![](/huaweicloud-knowledge-base/assets/images/ECS-Slow-AWS-CLI-S3-Upload-Windows/media/image1.png)

# Solução

Modifique o arquivo: “C:\\Users\\Administrator\\.aws\\config” e adicione o
seguinte parâmetro:

![](/huaweicloud-knowledge-base/assets/images/ECS-Slow-AWS-CLI-S3-Upload-Windows/media/image2.png)

Após a modificação, a velocidade de upload aumentará de acordo com a largura de banda comprada:

![](/huaweicloud-knowledge-base/assets/images/ECS-Slow-AWS-CLI-S3-Upload-Windows/media/image3.png)

# Referências

- Documentação do AWS CLI S3, disponível em:
    <https://awscli.amazonaws.com/v2/documentation/api/latest/topic/s3-config.html#preferred-transfer-client>.
