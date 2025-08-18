---
title: Mutual Authentication - MTLS
layout: default
parent: API Gateway (APIG)
grand_parent: Middleware
lang: pt
permalink: /docs/middleware/apig/mutual-authentication-mtls
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Autenticação Mútua (mTLS) usando o API Gateway (APIG)

v1.0 – Julho 2023

| **Versão**        | **Autor**                 | **Descrição**         |
| ----------------- | ------------------------  | --------------------- |
| V1.0 – 2023-07-20 | Thamires Calo 50030210    | Versão Inicial        |
| V1.0 – 2023-07-20 | Gabriel Gutierrez 00817435| Revisão do Documento  |

# Introdução

O HUAWEI CLOUD API Gateway é um serviço de gerenciamento de APIs que permite
às empresas publicar, proteger e gerenciar APIs, garantindo a
eficiência, a segurança e a governança das operações de API.

Este documento tem como objetivo explorar o uso do API Gateway na HUAWEI CLOUD para
integração de sistemas internos, garantindo a segurança entre cliente e
servidor usando o método de autenticação mútua (TLS Mútuo, mTLS). Mais
detalhes sobre o API Gateway podem ser encontrados na documentação oficial do serviço
em:

<https://support.huaweicloud.com/intl/en-us/productdesc-apig/apig_01_0001.html>

# Cenário de Autenticação Usual

O cenário usual abaixo demonstra, em uma arquitetura cliente/servidor,
o uso de uma API para autenticar usuários finais que terão acesso a
outra API. Antes de consumir a API, o cliente deve obter um
token de autenticação (usando nome de usuário e senha, por exemplo), que
deve estar presente em todas as solicitações subsequentes. Esse token é válido apenas por
um determinado período de tempo, portanto, o aplicativo cliente deve obter um novo
token periodicamente para continuar consumindo a API.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image3.png"
style="width:4.43265in;height:4.89133in" />

O uso da autenticação mútua (mTLS) no HUAWEI CLOUD API Gateway
garante mais segurança e otimiza esse processo de autenticação,
eliminando a necessidade de tokens para autenticação do cliente da API.

# Arquitetura de Exemplo

# <img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image4.png"
style="width:6.26667in;height:2.45in" />

A arquitetura de exemplo proposta para o cenário de uso do API Gateway na
HUAWEI CLOUD é uma solução altamente escalável e segura para
gerenciamento de APIs.

- A API hospedada em um servidor na HUAWEI CLOUD utiliza um Balanceamento de Carga
Elástico para distribuir o tráfego de entrada.

- A comunicação é realizada com segurança entre as partes com o uso
de autenticação mútua (TLS Mútuo, mTLS) implementada no API Gateway.

# Configurando o Serviço no Console

## Comprando um Gateway

Acesse o serviço API Gateway no Console.

Na opção Visão Geral, clique em Comprar Gateway Dedicado.

*\*Para este exemplo, usaremos o serviço na região de Santiago.*

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image5.png"
style="width:6.26806in;height:2.39722in" />

Selecione as especificações de acordo com a API de Backend. A edição Básica,
que será usada neste exemplo, suporta até 2.000
solicitações por segundo.

Preste atenção ao selecionar a edição Gateway, pois, após
adquirir um tipo específico de edição, não é possível fazer downgrade ou
upgrade (é necessário criar um novo Gateway de API, exportar os dados
do gateway antigo e importar para o novo).

Habilite "Acesso Público de Entrada", selecione a mesma VPC, sub-rede e
Grupo de Segurança configurados para o servidor de aplicativos.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image6.png"
style="width:6.03645in;height:5.68533in" />

Após confirmar os parâmetros definidos para o Gateway Dedicado, aguarde
alguns minutos até que a criação seja concluída.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image7.png"
style="width:6.26806in;height:2.30069in" />

## Criando uma API

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image8.png"
style="width:6.26806in;height:2.48403in" />

Em Gerenciamento de API (1), clique em APIs (2) e crie uma API
clicando em Criar API (3).

## Configurando o Frontend da API

Em Nome da API, defina um nome para a nova API.

Um novo grupo pode ser criado para organizar mais APIs. Neste exemplo, o grupo
DEFAULT será usado.

O método usado para esta API será ANY, já que a API de backend será
responsável pelo roteamento (manipulando métodos HTTP e endpoints/rotas).
Insira "/" em Path e "Prefix match" em Matching.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image9.png"
style="width:5.8625in;height:3.15in" />

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image10.png"
style="width:6.02876in;height:3.18773in" />

## Configurando o Backend da API

Neste exemplo, escolheremos a opção:

- Ignorar para o Canal de Balanceamento de Carga*.*

- Em URL, usaremos o método ANY.

- O Endereço do Backend será o endereço IP privado do Balanceamento de Carga Elástico
associado ao servidor da API.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image11.png"
style="width:5.31458in;height:3.6875in" />

Em Orquestração de Parâmetros, na seção Parâmetros Constantes, é
necessário definir um nome de domínio virtual (inexistente) que acessará
o backend. Este parâmetro será recebido pelo servidor HTTP e
usado para definir qual aplicativo responderá à solicitação.

- **Nome do Parâmetro Constante:** Host

- **Local do Parâmetro:** CABEÇALHO

- **Valor do Parâmetro:** api-mtls.virtual.example (domínio
virtual/inexistente)

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image12.png"
style="width:6.26389in;height:1.87639in" />

## Adicionando um Nome de Domínio

Após a criação da API, clique em “Informações do Grupo” e adicione o nome
de domínio que será acessado pelo Cliente em “Vincular Nome
de Domínio Independente”.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image13.png"
style="width:6.25694in;height:2.39167in" />

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image14.png"
style="width:3.39861in;height:1.55833in" />

# Autenticação Mútua (mTLS)

A autenticação mútua em uma conexão cliente-servidor ocorrerá usando
certificados gerados com OpenSSL. Neste exemplo, a organização
responsável pela API de back-end será a autoridade certificadora (CA).

## Processo mTLS

- O cliente se conecta ao servidor;

- O servidor apresenta seu certificado TLS/SSL;

- O cliente verifica o certificado TLS/SSL do servidor e
prossegue somente se o certificado do servidor for válido/reconhecido;

- O cliente apresenta seu certificado TLS/SSL;

- O servidor verifica o certificado do cliente e autoriza o acesso somente
se o certificado do cliente for válido/reconhecido;

- O cliente e o servidor trocam informações por meio de uma conexão TLS/SSL segura e criptografada.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image15.png"
style="width:5.34464in;height:4.67056in" />

# Criando, assinando e validando certificados

Esta é a lista de arquivos que serão gerados usando a ferramenta OpenSSL:

- **Autoridade Certificadora (CA):** ca.conf, ca.key, ca.csr e ca.crt

- **Servidor:** server.conf, server.key, server.csr e server.crt

- **Cliente:** client.conf, client.key, client.csr e client.crt

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image16.png"
style="width:6.26806in;height:4.06042in" />

## Criando o Certificado da CA

Inicialmente, você precisa criar um arquivo de configuração "ca.conf" com o
nome da organização da autoridade certificadora:

```shell
[ req ]
distinguished_name = req_distinguished_name
prompt = no

[ req_distinguished_name ]
O = Nome da Empresa do Servidor CA
```

Os arquivos CA são criados usando os seguintes comandos OpenSSL:

\- Gerando a chave privada (KEY):

```shell
openssl genrsa -out ca.key 2048
```

\- Assinatura Solicitação (CSR):

```shell
openssl req -new -config ca.conf -key ca.key -out ca.csr
```

\- Gerando o certificado (CRT), válido por 365 dias

```shell
openssl x509 -req -in ca.csr -signkey ca.key \
-sha256 -days 365 -CAcreateserial -out ca.crt
```

## Criando o Certificado do Servidor

Agora, o arquivo "server.conf" deve ser criado, atualizando o nome da empresa
e o domínio associado ao API Gateway:

```shell
[ req ]
distinguished_name = req_distinguished_name
prompt = no
req_extensions = v3_req

[ req_distinguished_name ]
O = Nome da Empresa do Servidor
CN = api-mtls.example.com

[ v3_req ]
subjectAltName = @alt_names

[alt_names]
DNS.1 = api-mtls.example.com
```

Criando os arquivos do servidor usando OpenSSL:

\- Gerando a chave privada (KEY):

```shell
openssl genrsa -out server.key 2048
```
\- Solicitação de Assinatura (CSR):

```shell
openssl req -new -config server.conf \
-key server.key -out server.csr
```

\- Gerando o certificado (CRT), válido por 365 dias

```shell
openssl x509 -req -in server.csr \
-CA ca.crt -CAkey ca.key -CAcreateserial \
-sha256 -days 365 -extensions v3_req -extfile server.conf \
-out server.crt
```

## Criando o Certificado do Cliente

Agora, o arquivo "client.conf" deve ser criado, com o nome da
organização do cliente.

```shell
[ req ]
distinguished_name = req_distinguished_name
prompt = no

[ req_distinguished_name ]
O = Nome da Empresa do Cliente
```

Criando os arquivos do cliente usando OpenSSL:

\- Gerando a chave privada (KEY):

```shell
openssl genrsa -out client.key 2048
```

\- Solicitação de Assinatura (CSR):

```shell
openssl req -new -config client.conf \
-key client.key -out client.csr
```
\- Gerando o certificado (CRT), válido por 365 dias

```shell
openssl x509 -req -in client.csr \
-CA ca.crt -CAkey ca.key -CAcreateserial \
-sha256 -days 365 -extensions v3_req -extfile client.conf \
-out client.crt
```

Alguns aplicativos, no entanto, usam um único arquivo PFX protegido por senha para
executar a autenticação mTLS. Nesse caso, o OpenSSL também é usado para
combinar os arquivos "client.crt", "client.key" e "ca.crt" em um único
arquivo PFX:

```shell
openssl pkcs12 -export -inkey client.key -in client.crt \
-certfile ca.crt -out client.pfx
```

## Verificação de certificados

\- Verificação do certificado do servidor:

```shell
openssl verify -CAfile ca.crt server.crt
```

\- Verificação do certificado do cliente:

```shell
openssl verify -CAfile ca.crt client.crt
```

# Configurando certificados no Console

## Acesse a API criada no API Gateway.

## <img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image17.png"
style="width:6.26806in;height:2.09931in" />

> Em Informações do Grupo, adicione os certificados em Selecionar Certificado SSL:

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image18.png"
style="width:6.26806in;height:3.00417in" />

- **Conteúdo:** conteúdo do arquivo "server.crt" (certificado do servidor)

- **Chave:** conteúdo do arquivo "server.key" (chave privada do servidor)

- **CA:** conteúdo do Arquivo "ca.crt" (certificado CA)

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image19.png"
style="width:5.25189in;height:4.68516in" />

Retorne à aba APIs e publique a API clicando em Publicar
Versão Mais Recente.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image20.png"
style="width:5.89614in;height:2.30201in" />

# Testando mTLS

## Servidor de Teste

Como servidor de API, é utilizado um script Python simples, baseado na biblioteca Flask,
que retorna alguns parâmetros da solicitação HTTP (Host, método
e caminho) no formato JSON.

```python
from flask import Flask, request
from pprint import pprint

app = Flask(__name__)

HTTP_METHODS = [
'GET', 'HEAD', 'POST', 'PUT', 'DELETE',
'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']

@app.route("/", methods=HTTP_METHODS)
@app.route("/<path:path>", methods=HTTP_METHODS)
def hello_world(path=''):
ret = {
'host': request.headers['host'],
'method': request.method,
'path': request.full_path
}
pprint(ret)
return ret
```

## Usando curl

A ferramenta curl é usada para realizar transferência de dados usando vários protocolos,
sendo o HTTP um deles.

Como a autoridade certificadora é privada (gerada pelo OpenSSL,
especificamente para o API Gateway), o certificado não será
reconhecido como válido por nenhum cliente web.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image21.png"
style="width:6.26806in;height:1.24167in" />

Você deve fornecer o certificado da CA (--cacert ca.crt) e desabilitar a
verificação de CRL (--ssl-no-revoke) para fazer uma solicitação ao API Gateway.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image22.png"
style="width:6.26806in;height:0.57222in" />

O erro "APIG.0205" indica que a autenticação do cliente não foi
bem-sucedida porque o certificado e a chave privada do cliente não foram
especificados. Para enviar essas informações, são utilizadas as opções --cert client.crt e --key
client.key.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image23.png"
style="width:6.32197in;height:1.42815in" />

Após a autenticação ser bem-sucedida, a solicitação foi encaminhada para o
servidor de back-end e a resposta obtida foi retornada pelo aplicativo Flask.

Se um certificado ou chave privada inválido for fornecido, o API Gateway
retornará o código de erro "APIG.0205".

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image24.png"
style="width:6.26806in;height:0.90556in" />

## Usando o Postman

O Postman (<https://www.postman.com/>) é uma plataforma que permite o
design, a construção e o teste de APIs.

Assim como o curl, não é possível fazer solicitações ao API Gateway
sem primeiro configurar o certificado da CA.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image25.png"
style="width:6.26806in;height:2.32292in" />

O certificado CA pode ser configurado em Configurações \> Certificados,
ativando a opção "Certificados CA" e clicando em "Selecionar Arquivo".

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image26.png"
style="width:6.26806in;height:2.63681in" />

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image27.png"
style="width:6.26806in;height:3.07014in" />

Sem fornecer o certificado e a chave privada do cliente, o API Gateway
retorna o erro "APIG.0205".

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image28.png"
style="width:6.26806in;height:1.71319in" />

Essas informações são adicionadas em Configurações \> Certificados \> Certificados do Cliente, clicando em "Adicionar Certificado", informando o nome de domínio,
os arquivos CRT e KEY.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image29.png"
style="largura:4,80636 pol;altura:2,37176 pol" />

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image30.png"
style="largura:4,83828 pol;altura:2,91337 in" />

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image31.png"
style="width:4.84169in;height:2.66921in" />

Caso utilize o arquivo PFX, deixe os campos "Arquivo CRT" e "Arquivo de Chave"
em branco e informe o arquivo PFX e sua senha. Ao utilizar o arquivo PFX,
também não é necessário configurar o certificado da CA, pois ele
já está incluso no mesmo arquivo.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image32.png"
style="width:4.47667in;height:2.44962in" />

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image33.png"
style="width:4.51736in;height:2.50392in" />

Após a configuração dos arquivos do cliente, a solicitação é encaminhada para o
servidor de back-end.

<img
src="/huaweicloud-knowledge-base/assets/images/middleware/apig/mutual-authentication-mtls/image34.png"
style="width:6.26806in;height:1.6875in" />