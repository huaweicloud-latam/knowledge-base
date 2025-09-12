---
title: Configurando DNS + WAF
layout: default
parent: Web Application Firewall (WAF)
grand_parent: Segurança e Compliance
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

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image3.png"
style="width:6.26806in;height:1.84613in"
alt="C:\Users\l50032583\AppData\Roaming\WeLink_Desktop\appdata\IM\l50032583\ReceiveFiles\originalImgfiles\FF16CD1C-1881-4995-AD30-DD13E034C046.png" />

# Configuração de DNS

O DNS (Sistema de Nomes de Domínio) desempenha uma função crítica ao traduzir
nomes de domínio legíveis por humanos em Endereços IP compreensíveis por máquina.
A Huawei Cloud oferece recursos robustos para configurar e gerenciar registros DNS, permitindo que os usuários roteiem com eficiência o tráfego de domínio para servidores designados. Abaixo, um guia simplificado detalha as etapas para
configurar o DNS na Huawei Cloud:

1. Acessando o Serviço DNS: Inicie o processo navegando até o serviço DNS na Huawei Cloud.

2. Criando uma Zona Pública: Comece estabelecendo uma Zona Pública na Huawei Cloud. Esta etapa é fundamental para as configurações subsequentes de DNS:

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image4.png"
style="width:5.15625in;height:5.61458in" />

Acesse **Zonas Públicas\> Criar Zona Pública**

Insira o nome do seu domínio exatamente como registrado com o seu provedor e
siga as instruções fornecidas para concluir o processo de configuração.

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image5.png"
style="width:6.26806in;height:5.11319in" />

## Atualizar o gerenciamento de domínio para o Huawei Cloud

Após criar uma Zona Pública com sucesso, o próximo passo é redirecionar
nosso domínio para o Huawei Cloud DNS. Para isso, precisamos recuperar os
domínios do Huawei Cloud DNS. Veja como proceder:

<img src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image6.png" style="width:6.26806in;height:4.45208in" />

No provedor de domínio onde você adquiriu seu domínio, você precisa
atualizar as configurações de DNS para apontar seu domínio para os dois servidores DNS
fornecidos pela Huawei Cloud. Esta ação conecta efetivamente seu domínio
à infraestrutura de DNS da Huawei Cloud.

<img src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image7.png" style="width:6.26806in;height:2.82556in" alt="C:\Users\g50037306\AppData\Roaming\WeLink_Desktop\appdata\IM\g50037306\ReceiveFiles\originalImgfiles\D149D8EA-3141-4B0C-8872-C3C15522077B.png" />

A atualização do DNS pode levar até 48 horas para se propagar e atualizar completamente
globalmente.

Com o gerenciador de domínio DNS agora transferido para o Huawei Cloud, podemos
prosseguir com a criação de conjuntos de registros para direcionar o tráfego com precisão para os nossos
destinos desejados. Por exemplo, se quisermos apontar um nome de domínio para um endereço IPv4, como uma instância do ECS (Elastic Compute Service) hospedando um servidor NGINX com o IP público **101.44.203.187**, utilizamos um Conjunto de Registros A.

Neste exemplo, temos um ECS com um servidor NGINX instalado
com o IP público **101.44.203.187**. Se quisermos apontar um nome de domínio
para esse IPv4, criamos um **Conjunto de Registros A – Mapear domínios para Endereços IPv4** e, no valor, colocamos o IP que queremos traduzir:

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image8.png"
style="width:6.26806in;height:6.84236in" />

Agora, se digitarmos nginx-test.example.com.br, ele redirecionará o aplicativo NGINX

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image9.png"
style="width:6.26806in;height:2.48542in" />

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

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image10.png"
style="width:6.26806in;height:3.50139in" />

Basta marcar a caixa no valor da nota e clicar em **Avançar**.

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image11.png"
style="width:5.17217in;height:3.11843in" />

## Adicionando um site ao WAF

Para proteger seu site com o WAF, navegue até o console do WAF e acesse
a seção "Configurações do site". Em seguida, adicione o site desejado
seguindo estas etapas: <img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image12.png"
style="width:6.26806in;height:2.37986in" />

Selecione **Nuvem – CNAME \> Adicionar rapidamente nomes de domínio hospedados na nuvem**

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image13.png"
style="width:6.68235in;height:4.02377in" />

Selecione seu domínio, neste caso, é **nginx-waf.example.com.br**

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image14.png"
style="width:6.26806in;height:3.59583in" />

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

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image15.png"
style="width:6.26806in;height:5.2375in" />

Clique em **Avançar.**

## Configuração do WAF

Agora que adicionamos um site ao WAF, precisamos configurar nosso servidor de origem
e DNS para funcionar com o WAF.

### Lista de permissões do WAF

Primeiro, colocaremos o intervalo de IPs do WAF na lista de permissões para todas as portas do Grupo de
segurança:

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image16.png"
style="width:6.26806in;height:0.82847in" />

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image17.png"
style="width:6.02009in;height:8.13706in" />

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image18.png"
style="width:6.26806in;height:3.18056in" />

> Agora, voltamos para a página do console do WAF e clicamos em **Concluído**.

### Testando o CNAME do WAF

Clique em **Testar conectividade** no site:

<img src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image19.png" style="width:6.26806in;height:2.04306in" />

Siga as etapas do guia exibido no lado direito da sua
tela:

- Copie o registro CNAME e Execute ping neste CNAME no seu ECS e copie o IP do
WAF.

<img src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image20.png" style="width:6.26806in;height:0.96104in" />

Agora precisamos adicionar este IP do WAF e o DNS à lista de hosts confiáveis ​​do
nosso servidor NGINX. No Ubuntu, usamos o comando:

**sudo vim /etc/hosts**

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image21.png"
style="width:6.26806in;height:2.47639in" />

Depois disso, precisamos limpar o DNS, com o comando:

**resolvectl flush-caches**

Tente executar ping em "**nginx-waf.example.com.br**" a partir do ECS. O
endereço IP exibido deve corresponder ao IP do WAF.

## Configurar o DNS para redirecionar para o WAF

Nesta etapa, é necessário atualizar nossas configurações de DNS para direcionar o tráfego
para o WAF em vez do nosso aplicativo. O WAF então redirecionará o
tráfego para o nosso servidor:<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image22.png"
style="width:6.26806in;height:2.18681in" />

<img src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image23.png" style="width:6.06348in;height:8.20175in" />

**Certifique-se de que a conexão entre o WAF e o seu servidor tenha sido
estabelecida com sucesso antes de prosseguir.**

Para configurar o WAF com eficiência, você precisa ajustar as configurações de DNS. Comece
removendo o registro tipo A existente para "**nginx-waf.example.com.br**".
Em seguida, crie um novo conjunto de registros usando o tipo CNAME. Especifique o
nome de domínio desejado, como "nginx-waf.example.com.br", e aponte-o para o domínio
fornecido pelo WAF. service.<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image24.png"
style="width:6.26806in;height:7.11528in" />

## Testando a Proteção Precisa do WAF

No console do WAF, acesse a política gerada automaticamente e crie uma
**regra de Proteção Precisa** para bloquear todo o tráfego para um teste:<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image25.png"
style="width:6.26806in;height:1.77014in" />

Acesse **Proteção Precisa\> Adicionar Regra:**

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image26.png"
style="width:6.26806in;height:2.27153in" />

Basta adicionar uma "/" no valor "Conteúdo" e manter os outros valores
padrão:

<img
src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image27.png"
style="width:6.26806in;height:3.36389in" />

Clique em **Confirmar** e depois em **OK.**

Agora, se tentarmos acessar nosso Endereço "**nginx-waf.example.com.br**",
a regra WAF configurada bloqueará todo o tráfego de entrada.

<img src="/huaweicloud-knowledge-base/assets/images/security-and-compliance/waf/dns-waf-configuration/image28.png" style="width:6.26806in;height:2.39444in" />

