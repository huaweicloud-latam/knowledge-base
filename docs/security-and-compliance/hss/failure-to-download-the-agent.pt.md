---
title: Erro ao Baixar o Agente
layout: default
parent: Host Security Service (HSS)
grand_parent: Segurança e Compliance
lang: pt
permalink: /docs/security-and-compliance/hss/failure-to-download-the-agent
---

# Erro ao Baixar o Agente

V1.0 – Outubro de 2025

| **Versão**        | **Autor**            | **Descrição**        |
| ----------------- | ---------------------| -------------------- |
| V1.0 – 2025-10-15 | Diogo Hatz d00945205 | Versão Inicial       |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
realização do troubleshooting relativo ao erro de download do agente do
serviço HSS por timeout.

# Sintoma

O sintoma apresentado durante a execução do comando de download e
instalação do agente do HSS é o timeout durante o download do agente,
denotado pela imagem abaixo:

```shell
curl -k -O 'https://hss-agent.sa-brazil-1.myhuaweicloud.com:10180/package/agent/linux/install/agent_Install.sh'
```

{% include image.html post=page.path file="image3.png" %}

# Solução

Primeiramente, edite o arquivo de hosts do Linux “/etc/hosts” e adicione
a seguinte entrada:

**Importante:** Este documento considera que a região de utilização do
serviço HSS é São Paulo. Para demais regiões, é possível que ajustes
sejam necessários.

```shell
vim /etc/hosts

100.125.254.13 hss-agent.sa-brazil-1.myhuaweicloud.com
```

{% include image.html post=page.path file="image4.png" %}

Salve o arquivo e tente baixar o agente novamente. Desta vez, o
resultado esperado é que o agente possa ser baixado com sucesso.

{% include image.html post=page.path file="image5.png" %}

# (Opcional) Demais Verificações

Caso a solução acima não tenha solucionado o problema de download do
agente do HSS, é possível verificar os seguintes tópicos:

## **Subnet DNS**

Verifique se o DNS da subnet em que a ECS foi provisionada foi
modificada. Os servidores DNS padrão da Huawei são **100.125.1.22** e
**100.125.1.90**.

{% include image.html post=page.path file="image6.png" %}

## **UFW**

Verifique se há algum firewall em execução na máquina, como o UFW:

```shell
sudo ufw stop
sudo ufw disable
sudo ufw status
```

{% include image.html post=page.path file="image7.png" %}

## **Iptables**

Verifique se há algum firewall em execução na máquina, como o iptables:

```shell
iptables -L -n
```

{% include image.html post=page.path file="image8.png" %}

## **Security Group**

Verifique se há alguma regra de Security Group bloqueando o tráfego de
saída pela porta 10180:

{% include image.html post=page.path file="image9.png" %}

## **Subnet ACL**

Verifique se há alguma regra de Subnet ACL restringindo o tráfego de
origem ou destino para os blocos de endereçamento **100.125.0.0/16**.

{% include image.html post=page.path file="image10.png" %}

## **Ping**

Realize um teste de ping no seguinte domínio e verifique se o endereço
IP resolvido é o **100.125.254.13**.

```shell
ping hss-agent.sa-brazil-1.myhuaweicloud.com
```

{% include image.html post=page.path file="image11.png" %}

## **Telnet**

Realize um teste de telnet no seguinte domínio e verifique a
conectividade na porta **10180**.

```shell
telnet hss-agent.sa-brazil-1.myhuaweicloud.com 10180
```

{% include image.html post=page.path file="image12.png" %}

## **Resolv.conf**

Verifique se os endereços dos servidores DNS da Huawei estão
corretamente configurados no arquivo /etc/resolv.conf.

```shell
vim /etc/resolv.conf

nameserver 100.125.1.22
nameserver 100.125.1.90
```

{% include image.html post=page.path file="image13.png" %}
