---
title: Configurando uma VPN Client to Site
layout: default
parent: Virtual Private Network (VPN)
grand_parent: Redes
permalink: /docs/networking/vpn/vpn-client-to-site-startup
lang: pt
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Configurando uma VPN Client to Site

V1.0 – Setembro 2024

| **Versão**        | **Autor**                      | **Descrição**        |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-09-10 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-09-10 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para o
provisionamento de uma VPN Client-to-Site utilizando o serviço de VPN
P2C da Huawei Cloud e realizando o acesso através do cliente OpenVPN.

# Considerações

1.  No momento de escrita deste documento, a VPN P2C da Huawei Cloud só
    se encontra disponível na região de São Paulo e no método de billing
    yearly/monthly;

2.  Um certificado SSL é necessário para realizar a autenticação da VPN,
    certificado o qual pode ser gerado gratuitamente através da
    ferramenta EasyRSA.

# Certificado

Para realizar a autenticação da VPN P2C, primeiramente se faz necessário
gerar um certificado SSL que será hosteado no serviço CCM da Huawei
Cloud. Neste exemplo, a ferramenta que será utilizada para a geração do
certificado será o Easy-RSA, no entanto, todas as demais ferramentas
também são suportadas, como o Let’s Encrypt.

**Obs:** Caso outra ferramenta de emissão de certificado seja utilizada,
faz-se necessário incluir o certificate chain no certificado.

Baixe a ferramenta Easy-RSA através do seguinte hyperlink:
<https://github.com/OpenVPN/easy-rsa/releases/download/v3.1.7/EasyRSA-3.1.7-win64.zip>.

Após extrair o arquivo baixado, abra o CMD e navegue até a pasta
extraída do arquivo baixado.

{% include image.html post=page.path file="image3.png" %}

Após navegar até a pasta do EasyRSA, execute o arquivo
“EasyRSA-Start.bat” através do comando “.\\EasyRSA-Start.bat”

{% include image.html post=page.path file="image4.png" %}

Digite o comando “./easyrsa init-pki” para inicializar o ambiente de PKI

{% include image.html post=page.path file="image5.png" %}

Copie o arquivo “vars.example” do diretório C:\\EasyRSA-3.1.7 para o
diretório C:\\EasyRSA-3.1.7\\pki e, então, renomeie o arquivo para
“vars”.

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

{% include image.html post=page.path file="image8.png" %}

Volte para o CMD e use o comando “./easyrsa build-ca nopass” para gerar
um certificado CA.

{% include image.html post=page.path file="image9.png" %}

  - Por padrão, o certificado CA será armazenado no diretório
    C:\\EasyRSA-3.1.7\\pki. Neste exemplo, o certificado “ca.crt” foi
    gerado.

  - Por padrão, a chave privada do certificado CA será armazenado no
    diretório C:\\EasyRSA-3.1.7\\pki\\private. Neste exemplo, o
    certificado “ca.key” foi gerado.

Use o comando “./easyrsa build-server-full p2cserver.com nopass” para
gerar um certificado de servidor e a sua chave privada. Note que o
argumento “p2cserver.com” será o common name (CN) do certificado gerado.

{% include image.html post=page.path file="image10.png" %}

  - Por padrão, o certificado do servidor será armazenado no diretório
    C:\\EasyRSA-3.1.7\\pki\\issued. Neste exemplo, o certificado
    “p2cserver.com.crt” foi gerado.

  - Por padrão, a chave privada do certificado do servidor será
    armazenado no diretório C:\\EasyRSA-3.1.7\\pki\\private. Neste
    exemplo, o certificado “p2cserver.com.key” foi gerado.

**Obs:** Existem duas formas de realizar a autenticação do cliente, uma
delas sendo através de usuário e senha definidos no console da HWC e o
outro sendo através de um certificado SSL. Para a segunda opção, siga a
etapa abaixo. Caso contrário, pule esta etapa.

Use o comando ./easyrsa build-client-full p2cclient.com nopass” para
gerar um certificado de cliente e a sua chave privada.

{% include image.html post=page.path file="image11.png" %}

  - Por padrão, o certificado do cliente será armazenado no diretório
    C:\\EasyRSA-3.1.7\\pki\\issued. Neste exemplo, o certificado
    “p2cclient.com.crt” foi gerado.

  - Por padrão, a chave privada do certificado do servidor será
    armazenado no diretório C:\\EasyRSA-3.1.7\\pki\\private. Neste
    exemplo, o certificado “p2cclient.com.key” foi gerado.

# CCM

Após ter realizado a emissão do(s) certificado(s) na seção anterior,
faz-se necessário publicar o certificado do servidor no serviço Cloud
Certificate Manager (CCM) da Huawei Cloud.

Para isso, navegue até o serviço CCM no console da HWC

{% include image.html post=page.path file="image12.png" %}

Clique na seção “Hosted Certificates” e selecione a opção “Upload
Certificate”.

{% include image.html post=page.path file="image13.png" %}

No campo “Certificate File”, faz-se necessário inserir tanto o
certificado do servidor quanto do CA, nessa ordem. Portanto, insira
primeiramente o certificado do servidor e posteriormente, na mesma caixa
de texto, o certificado do CA.

No campo “Private Key”, basta inserir o conteúdo da private key do
servidor.

Após inserir ambos campos, basta clicar em “Submit” para salvar o
certificado.

{% include image.html post=page.path file="image14.png" %}

{% include image.html post=page.path file="image15.png" %}

# P2C VPN

Navegue até o serviço VPN no console da Huawei Cloud e clique na seção
“Enterprise – VPN Gateways”, seguido por “P2C VPN Gateways” e em “Buy
P2C VPN Gateway”.

{% include image.html post=page.path file="image16.png" %}

{% include image.html post=page.path file="image17.png" %}

Preencha as informações relativas à VPN Gateway, como o seu nome, VPC e
Subnet em que estarão. Ademais, especifique também um EIP para o
gateway, assim como a sua largura de banda. Após isso, basta clicar em
“Buy Now”.

{% include image.html post=page.path file="image18.png" %}

{% include image.html post=page.path file="image19.png" %}

Clique no VPN Gateway comprado e navegue até a seção “Server” para
configurar o certificado do servidor e a forma de autenticação do
cliente.

{% include image.html post=page.path file="image20.png" %}

Preencha as informações relativas ao CIDR local, CIDR do cliente, o
certificado do servidor e a forma de autenticação do cliente.

**Obs:** O CIDR local corresponde ao bloco de rede da cloud que a VPN
será fechada, ao passo em que o CIDR do cliente corresponde ao bloco
virtual de endereçamento utilizado pelo cliente. É importante que não
haja overlap entre os blocos de rede local e de cliente.

{% include image.html post=page.path file="image21.png" %}

Caso a forma de autenticação do cliente seja feita através de usuário e
senha, é necessário configurar também um usuário e senha na seção “User
Management”.

{% include image.html post=page.path file="image22.png" %}

Crie um usuário e senha e defina um grupo de usuário para o usuário.

{% include image.html post=page.path file="image23.png" %}

Para delegar permissões a um grupo de usuários, navegue até a seção
“Access Policies” e clique em “Create Policy”.

{% include image.html post=page.path file="image24.png" %}

Insira o nome da policy, assim como o CIDR local preenchido
anteriormente e o grupo de usuários que poderão acessar os blocos de
rede especificados.

{% include image.html post=page.path file="image25.png" %}

Feito isso, retorne até a página do serviço de VPN P2C Gateway e clique
na opção “More” seguido por “Download Client Configuration”.

{% include image.html post=page.path file="image26.png" %}

# OpenVPN

Para acessar a VPN P2C criada, faz-se necessário baixar o cliente
OpenVPN através do seguinte hyperlink:
<https://openvpn.net/downloads/openvpn-connect-v3-windows.msi>.

Após baixar o OpenVPN, execute a sua instalação padrão.

{% include image.html post=page.path file="image27.png" %}

Após a instalação do cliente OpenVPN, execute-o e clique em Upload File
para realizar a configuração da VPN. Faça o upload do arquivo .OVPN
baixado no item 5.0 deste documento.

{% include image.html post=page.path file="image28.png" %}{% include image.html post=page.path file="image29.png" %}

Insira o usuário e senha configurados no item 5.0 deste documento e
clique em “Connect”.

{% include image.html post=page.path file="image30.png" %}

Caso uma janela de aviso apareça solicitando um certificado externo,
basta clicar em “Continue”.

{% include image.html post=page.path file="image31.png" %}
{% include image.html post=page.path file="image32.png" %}

Caso todas as etapas tenham sido seguidas corretamente, o cliente do
OpenVPN irá se conectar à VPN criada.

# Referências

  - Documentação da VPN P2C:
    <https://support.huaweicloud.com/intl/en-us/admin-vpn/p2cvpn_admin_00001.html>

  - Documentação da VPN P2C:
    <https://support.huaweicloud.com/intl/en-us/usermanual-vpn/vpn_ug_p2c_00016.html>.
