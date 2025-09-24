---
title: Gerando Certificados SSL para ELB
layout: default
parent: Elastic Load Balance (ELB)
grand_parent: Redes
permalink: /docs/networking/vpn/generating-ssl-certificate-for-elb
lang: pt
---

# Gerando Certificados SSL para ELB

V1.0 – Julho 2023

| **Versão**        | **Autor**             | **Descrição**  |
|-------------------|-----------------------|----------------|
| V1.0 – 2023-07-07 | Wisley Paulo w0083850 | Versão inicial |

# Introdução

Este documento apresenta os procedimentos para gerar certificado
gratuito utilizando o certbot e o letsencrypt e adicionar o certificado
no listener do Huawei ELB.

# Gerar Certificado

## Acesse instancia Linux (no exemplo utilizamos ECS com ubuntu 22.04) e execute os comandos (troque tamcloud.com.br pelo domínio desejado):

```shell
snap install –classic certbot
sudo certbot certonly --manual -d \*.tamcloud.com.br -d tamcloud.com.br --agree-tos --preferred-challenges dns
```

{% include image.html post=page.path file="image3.png" %}

## Acesse o serviço de DNS para configurar para configurar o registro TXT no DNS:

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

## Verifique se o registro foi propagado (no exemplo utilizado o isptools para a verificação <http://www.isptools.com.br>):

{% include image.html post=page.path file="image7.png" %}

## Após verificar da propagação do registro DNS pressione “Enter” no servidor para que ele verifique o domínio e gere o certificado:

{% include image.html post=page.path file="image8.png" %}

## Utilize os comandos abaixo para copiar os dados do certificado:

```shell
cat /etc/letsencrypt/live/tamcloud.com.br/fullchain.pem
```

{% include image.html post=page.path file="image9.png" %}

```shell
cat /etc/letsencrypt/live/tamcloud.com.br/privkey.pem
```

{% include image.html post=page.path file="image10.png" %}

Obs.: O arquivo do certificado apresentado na tela possui toda a cadeia
de certificados associado, para adicionar no balanceador de carga da
Huawei basta adicionar o certificado sem toda a cadeia apenas o primeiro
certificado conforme exemplo abaixo:

```shell
-----BEGIN CERTIFICATE-----
MIIFADCCA+igAwIBAgISA5Ff3aJXuXhCevKfJsuL2Y90MA0GCSqGSIb3DQEBCwUA
MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD
.
.
.
TD7pA0xgcb4qQFhKKRyfbie5KxqxCSvNPEpT8bLgbI+sTctXr45N6TkIplMAtW5Q
EgjXCW2apDs17gGG8M+Kn1Yjl5g9eyhLa9EqNWEPFYAIl9oy
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFFjCCAv6gAwIBAgIRAJErCErPDBinU/bWLiWnX1owDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
.
.
.
HlUjr8gRsI3qfJOQFy/9rKIJR0Y/8Omwt/8oTWgy1mdeHmmjk7j1nYsvC9JSQ6Zv
MldlTTKB3zhThV1+XWYp6rjd5JW1zbVWEkLNxE7GJThEUG3szgBVGP7pSWTUTsqX
nLRbwHOoq7hHwg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIFYDCCBEigAwIBAgIQQAF3ITfU6UK47naqPGQKtzANBgkqhkiG9w0BAQsFADA/
.
.
.
Dfvp7OOGAN6dEOM4+qR9sdjoSYKEBpsr6GtPAQw4dy753ec5
-----END CERTIFICATE-----
```

## O certificado gerado tem uma validade de 3 meses nesse ecossistema, assim importante que antes desse período renove o certificado com o comando abaixo (para evitar de ter que realizar esse processo manualmente recomendamos que crie uma automação para que esse processo):

```shell
certbot renew --cert-name tamcloud.com.br
```

# Inserir certificado ELB

## Acesse o serviço de ELB e depois clique no Listener que deseja adicionar o certificado:

{% include image.html post=page.path file="image11.png" %}

{% include image.html post=page.path file="image12.png" %}

## Acesse o serviço de ELB e depois clique no Listener que deseja adicionar o certificado:

{% include image.html post=page.path file="image13.png" %}

{% include image.html post=page.path file="image14.png" %}

Os demais passos para configuração do ELB seguem o mesmo procedimento já
conhecido, qualquer dúvida consultem o tutoria de ELB.
