---
title: Autenticação Mútua (mTLS)
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

{% include image.html post=page.path file="image3.png" %}

O uso da autenticação mútua (mTLS) no HUAWEI CLOUD API Gateway
garante mais segurança e otimiza esse processo de autenticação,
eliminando a necessidade de tokens para autenticação do cliente da API.

# Arquitetura de Exemplo

{% include image.html post=page.path file="image4.png" %}

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

{% include image.html post=page.path file="image5.png" %}

Selecione as especificações de acordo com a API de Backend. A edição Básica,
que será usada neste exemplo, suporta até 2.000
solicitações por segundo.

Preste atenção ao selecionar a edição Gateway, pois, após
adquirir um tipo específico de edição, não é possível fazer downgrade ou
upgrade (é necessário criar um novo Gateway de API, exportar os dados
do gateway antigo e importar para o novo).

Habilite "Acesso Público de Entrada", selecione a mesma VPC, sub-rede e
Grupo de Segurança configurados para o servidor de aplicativos.

{% include image.html post=page.path file="image6.png" %}

Após confirmar os parâmetros definidos para o Gateway Dedicado, aguarde
alguns minutos até que a criação seja concluída.

{% include image.html post=page.path file="image7.png" %}

## Criando uma API

{% include image.html post=page.path file="image8.png" %}

Em Gerenciamento de API (1), clique em APIs (2) e crie uma API
clicando em Criar API (3).

## Configurando o Frontend da API

Em Nome da API, defina um nome para a nova API.

Um novo grupo pode ser criado para organizar mais APIs. Neste exemplo, o grupo
DEFAULT será usado.

O método usado para esta API será ANY, já que a API de backend será
responsável pelo roteamento (manipulando métodos HTTP e endpoints/rotas).
Insira "/" em Path e "Prefix match" em Matching.

{% include image.html post=page.path file="image9.png" %}

{% include image.html post=page.path file="image10.png" %}

## Configurando o Backend da API

Neste exemplo, escolheremos a opção:

- Ignorar para o Canal de Balanceamento de Carga*.*

- Em URL, usaremos o método ANY.

- O Endereço do Backend será o endereço IP privado do Balanceamento de Carga Elástico
associado ao servidor da API.

{% include image.html post=page.path file="image11.png" %}

Em Orquestração de Parâmetros, na seção Parâmetros Constantes, é
necessário definir um nome de domínio virtual (inexistente) que acessará
o backend. Este parâmetro será recebido pelo servidor HTTP e
usado para definir qual aplicativo responderá à solicitação.

- **Nome do Parâmetro Constante:** Host

- **Local do Parâmetro:** CABEÇALHO

- **Valor do Parâmetro:** api-mtls.virtual.example (domínio
virtual/inexistente)

{% include image.html post=page.path file="image12.png" %}

## Adicionando um Nome de Domínio

Após a criação da API, clique em “Informações do Grupo” e adicione o nome
de domínio que será acessado pelo Cliente em “Vincular Nome
de Domínio Independente”.

{% include image.html post=page.path file="image13.png" %}

{% include image.html post=page.path file="image14.png" %}

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

{% include image.html post=page.path file="image15.png" %}

# Criando, assinando e validando certificados

Esta é a lista de arquivos que serão gerados usando a ferramenta OpenSSL:

- **Autoridade Certificadora (CA):** ca.conf, ca.key, ca.csr e ca.crt

- **Servidor:** server.conf, server.key, server.csr e server.crt

- **Cliente:** client.conf, client.key, client.csr e client.crt

{% include image.html post=page.path file="image16.png" %}

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

{% include image.html post=page.path file="image17.png" %}

> Em Informações do Grupo, adicione os certificados em Selecionar Certificado SSL:

{% include image.html post=page.path file="image18.png" %}

- **Conteúdo:** conteúdo do arquivo "server.crt" (certificado do servidor)

- **Chave:** conteúdo do arquivo "server.key" (chave privada do servidor)

- **CA:** conteúdo do Arquivo "ca.crt" (certificado CA)

{% include image.html post=page.path file="image19.png" %}

Retorne à aba APIs e publique a API clicando em Publicar
Versão Mais Recente.

{% include image.html post=page.path file="image20.png" %}

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

{% include image.html post=page.path file="image21.png" %}

Você deve fornecer o certificado da CA (--cacert ca.crt) e desabilitar a
verificação de CRL (--ssl-no-revoke) para fazer uma solicitação ao API Gateway.

{% include image.html post=page.path file="image22.png" %}

O erro "APIG.0205" indica que a autenticação do cliente não foi
bem-sucedida porque o certificado e a chave privada do cliente não foram
especificados. Para enviar essas informações, são utilizadas as opções --cert client.crt e --key
client.key.

{% include image.html post=page.path file="image23.png" %}

Após a autenticação ser bem-sucedida, a solicitação foi encaminhada para o
servidor de back-end e a resposta obtida foi retornada pelo aplicativo Flask.

Se um certificado ou chave privada inválido for fornecido, o API Gateway
retornará o código de erro "APIG.0205".

{% include image.html post=page.path file="image24.png" %}

## Usando o Postman

O Postman (<https://www.postman.com/>) é uma plataforma que permite o
design, a construção e o teste de APIs.

Assim como o curl, não é possível fazer solicitações ao API Gateway
sem primeiro configurar o certificado da CA.

{% include image.html post=page.path file="image25.png" %}

O certificado CA pode ser configurado em Configurações \> Certificados,
ativando a opção "Certificados CA" e clicando em "Selecionar Arquivo".

{% include image.html post=page.path file="image26.png" %}

{% include image.html post=page.path file="image27.png" %}

Sem fornecer o certificado e a chave privada do cliente, o API Gateway
retorna o erro "APIG.0205".

{% include image.html post=page.path file="image28.png" %}

Essas informações são adicionadas em Configurações \> Certificados \> Certificados do Cliente, clicando em "Adicionar Certificado", informando o nome de domínio,
os arquivos CRT e KEY.

{% include image.html post=page.path file="image29.png" %}

{% include image.html post=page.path file="image30.png" %}

{% include image.html post=page.path file="image31.png" %}

Caso utilize o arquivo PFX, deixe os campos "Arquivo CRT" e "Arquivo de Chave"
em branco e informe o arquivo PFX e sua senha. Ao utilizar o arquivo PFX,
também não é necessário configurar o certificado da CA, pois ele
já está incluso no mesmo arquivo.

{% include image.html post=page.path file="image32.png" %}

{% include image.html post=page.path file="image33.png" %}

Após a configuração dos arquivos do cliente, a solicitação é encaminhada para o
servidor de back-end.

{% include image.html post=page.path file="image34.png" %}