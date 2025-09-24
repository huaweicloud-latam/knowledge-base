---
title: Configurando DNS + WAF
layout: default
parent: Web Application Firewall (WAF)
grand_parent: Segurança e Compliance
lang: pt
permalink: /docs/security-and-compliance/waf/dns-waf-configuration
---

# Guia de Configuração de DNS + WAF

V1.0 – Março de 2024

| **Versão**        | **Autor**                           | **Descrição**        |
| ----------------- | ----------------------------------- | -------------------- |
| V1.0 – 2024-18-03 | Gustavo Marques Scovini g50037306   | Versão Inicial       |
| V1.0 – 2024-18-03 | Leandro Ramos l50032583             | Versão Inicial       |

# Compra de Domínio

## Compre um domínio

Primeiramente, é necessário adquirir um domínio válido de um provedor de domínio
certificado para registrar seu DNS. Neste exemplo, um domínio foi
adquirido em [registro.br](https://registro.br/):

{% include image.html post=page.path file="image3.png" %}

# Configuração de DNS

O DNS (Sistema de Nomes de Domínio) desempenha uma função crítica ao traduzir
nomes de domínio legíveis por humanos em Endereços IP compreensíveis por máquina.
A Huawei Cloud oferece recursos robustos para configurar e gerenciar registros DNS, permitindo que os usuários roteiem com eficiência o tráfego de domínio para servidores designados. Abaixo, um guia simplificado detalha as etapas para
configurar o DNS na Huawei Cloud:

1. Acessando o Serviço DNS: Inicie o processo navegando até o serviço DNS na Huawei Cloud.

2. Criando uma Zona Pública: Comece estabelecendo uma Zona Pública na Huawei Cloud. Esta etapa é fundamental para as configurações subsequentes de DNS:

{% include image.html post=page.path file="image4.png" %}

Acesse **Zonas Públicas\> Criar Zona Pública**

Insira o nome do seu domínio exatamente como registrado com o seu provedor e
siga as instruções fornecidas para concluir o processo de configuração.

{% include image.html post=page.path file="image5.png" %}

## Atualizar o gerenciamento de domínio para o Huawei Cloud

Após criar uma Zona Pública com sucesso, o próximo passo é redirecionar
nosso domínio para o Huawei Cloud DNS. Para isso, precisamos recuperar os
domínios do Huawei Cloud DNS. Veja como proceder:

{% include image.html post=page.path file="image6.png" %}

No provedor de domínio onde você adquiriu seu domínio, você precisa
atualizar as configurações de DNS para apontar seu domínio para os dois servidores DNS
fornecidos pela Huawei Cloud. Esta ação conecta efetivamente seu domínio
à infraestrutura de DNS da Huawei Cloud.

{% include image.html post=page.path file="image7.png" %}

A atualização do DNS pode levar até 48 horas para se propagar e atualizar completamente
globalmente.

Com o gerenciador de domínio DNS agora transferido para o Huawei Cloud, podemos
prosseguir com a criação de conjuntos de registros para direcionar o tráfego com precisão para os nossos
destinos desejados. Por exemplo, se quisermos apontar um nome de domínio para um endereço IPv4, como uma instância do ECS (Elastic Compute Service) hospedando um servidor NGINX com o IP público **101.44.203.187**, utilizamos um Conjunto de Registros A.

Neste exemplo, temos um ECS com um servidor NGINX instalado
com o IP público **101.44.203.187**. Se quisermos apontar um nome de domínio
para esse IPv4, criamos um **Conjunto de Registros A – Mapear domínios para Endereços IPv4** e, no valor, colocamos o IP que queremos traduzir:

{% include image.html post=page.path file="image8.png" %}

Agora, se digitarmos nginx-test.example.com.br, ele redirecionará o aplicativo NGINX

{% include image.html post=page.path file="image9.png" %}

# Configuração do WAF (Firewall de Aplicativos Web)

O WAF (Firewall de Aplicativos Web) serve como uma medida de segurança crucial
protegendo aplicativos e sites contra diversas ameaças online,
incluindo injeção de SQL, Cross-Site Scripting (XSS) e ataques de Negação de Serviço Distribuído (DDoS).

Neste cenário, vamos considerar uma instância do ECS executando o Ubuntu 22.04
hospedando um aplicativo NGINX básico com o endereço IP **1.178.38.186**.

Além disso, temos uma entrada DNS "**nginx-waf.example.com.br**"
apontando para o IP Elástico (EIP) associado a esta instância do ECS.

## Comprar uma instância do WAF com pagamento por uso

Primeiro, precisamos comprar uma instância do Firewall de Aplicação Web
no console. Para isso, acesse **Lista de Serviços \> Firewall de Aplicação Web
\> Comprar WAF \> Modo Nuvem.**

{% include image.html post=page.path file="image10.png" %}

Basta marcar a caixa no valor da nota e clicar em **Avançar**.

{% include image.html post=page.path file="image11.png" %}

## Adicionando um site ao WAF

Para proteger seu site com o WAF, navegue até o console do WAF e acesse
a seção "Configurações do site". Em seguida, adicione o site desejado
seguindo estas etapas: {% include image.html post=page.path file="image12.png" %}

Selecione **Nuvem – CNAME \> Adicionar rapidamente nomes de domínio hospedados na nuvem**

{% include image.html post=page.path file="image13.png" %}

Selecione seu domínio, neste caso, é **nginx-waf.example.com.br**

{% include image.html post=page.path file="image14.png" %}

- **Nome do site:** WAF-guide

- **Nome de domínio:** nginx-waf.example.com.br

- **Observações do site:** Padrão

- **Porta protegida:** Porta padrão

- **Configuração do servidor**

- **Protocolo do cliente:** HTTP

- **Protocolo do servidor:** HTTP

- **Endereço do servidor:** IPv4 - 1.178.38.186 **\#Alterar com base no seu
IP**

- **Porta do servidor:** 80

- **Proxy configurado:** Não Proxy

- **Política:** Política gerada pelo sistema

{% include image.html post=page.path file="image15.png" %}

Clique em **Avançar.**

## Configuração do WAF

Agora que adicionamos um site ao WAF, precisamos configurar nosso servidor de origem
e DNS para funcionar com o WAF.

### Lista de permissões do WAF

Primeiro, colocaremos o intervalo de IPs do WAF na lista de permissões para todas as portas do Grupo de
segurança:

{% include image.html post=page.path file="image16.png" %}

{% include image.html post=page.path file="image17.png" %}

{% include image.html post=page.path file="image18.png" %}

> Agora, voltamos para a página do console do WAF e clicamos em **Concluído**.

### Testando o CNAME do WAF

Clique em **Testar conectividade** no site:

{% include image.html post=page.path file="image19.png" %}

Siga as etapas do guia exibido no lado direito da sua
tela:

- Copie o registro CNAME e Execute ping neste CNAME no seu ECS e copie o IP do
WAF.

{% include image.html post=page.path file="image20.png" %}

Agora precisamos adicionar este IP do WAF e o DNS à lista de hosts confiáveis ​​do
nosso servidor NGINX. No Ubuntu, usamos o comando:

**sudo vim /etc/hosts**

{% include image.html post=page.path file="image21.png" %}

Depois disso, precisamos limpar o DNS, com o comando:

**resolvectl flush-caches**

Tente executar ping em "**nginx-waf.example.com.br**" a partir do ECS. O
endereço IP exibido deve corresponder ao IP do WAF.

## Configurar o DNS para redirecionar para o WAF

Nesta etapa, é necessário atualizar nossas configurações de DNS para direcionar o tráfego
para o WAF em vez do nosso aplicativo. O WAF então redirecionará o
tráfego para o nosso servidor:{% include image.html post=page.path file="image22.png" %}

{% include image.html post=page.path file="image23.png" %}

**Certifique-se de que a conexão entre o WAF e o seu servidor tenha sido
estabelecida com sucesso antes de prosseguir.**

Para configurar o WAF com eficiência, você precisa ajustar as configurações de DNS. Comece
removendo o registro tipo A existente para "**nginx-waf.example.com.br**".
Em seguida, crie um novo conjunto de registros usando o tipo CNAME. Especifique o
nome de domínio desejado, como "nginx-waf.example.com.br", e aponte-o para o domínio
fornecido pelo WAF. service.{% include image.html post=page.path file="image24.png" %}

## Testando a Proteção Precisa do WAF

No console do WAF, acesse a política gerada automaticamente e crie uma
**regra de Proteção Precisa** para bloquear todo o tráfego para um teste:{% include image.html post=page.path file="image25.png" %}

Acesse **Proteção Precisa\> Adicionar Regra:**

{% include image.html post=page.path file="image26.png" %}

Basta adicionar uma "/" no valor "Conteúdo" e manter os outros valores
padrão:

{% include image.html post=page.path file="image27.png" %}

Clique em **Confirmar** e depois em **OK.**

Agora, se tentarmos acessar nosso Endereço "**nginx-waf.example.com.br**",
a regra WAF configurada bloqueará todo o tráfego de entrada.

{% include image.html post=page.path file="image28.png" %}

