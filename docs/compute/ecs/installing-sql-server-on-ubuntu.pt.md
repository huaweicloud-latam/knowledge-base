---
title: Instalando SQL Server no Ubuntu
layout: default
parent: Elastic Cloud Server (ECS)
grand_parent: Computação
lang: pt
permalink: /docs/compute/ecs/installing-sql-server-ubuntu
---

# Instalando SQL Server no Ubuntu

V1.0 – Janeiro 2024

| **Versão**        | **Autor**             | **Descrição**        |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-01-05 | Diogo Hatz 50037923   | Versão Inicial       |
| V1.0 – 2024-01-05 | Wisley Paulo 00830850 | Revisão do Documento |

## Introdução

O SQL Server é uma ferramenta de banco de dados relacional desenvolvido
pela Microsoft. Neste documento encontra-se o passo-a-passo de como
fazer a instalação do SQL Server em uma instância Linux na distribuição
do Ubuntu. Para este tutorial, foi utilizado o Ubuntu 20.04 e SQL Server
2019, no entanto, demais versionamentos serão disponibilizados também
abaixo.

## Criação da ECS

Navegue até a seção relativa à ECS no console da Huawei Cloud.

{% include image.html post=page.path file="image3.png" %}

Compre uma nova instância com o SO desejado para a instalação do SQL
Server.

{% include image.html post=page.path file="image4.png" %}

Navegue até a seção relativa aos Security Groups no console da Huawei
Cloud. Clique no security group atrelado à ECS criada e adicione uma
regra para a porta 1433 padrão do SQL Server.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

Retorne à seção da ECS no console da Huawei Cloud e acesse a instância
criada clicando em “Remote Login”. Faça login como usuário “root” com a
senha configurada no momento de criação da instância.

{% include image.html post=page.path file="image7.png" %}

## Instalação do SQL Server

Importe as chaves GPG do repositório público da Microsoft através do
seguinte comando:

```shell
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
```

{% include image.html post=page.path file="image8.png)

Registre o repositório do Ubuntu do SQL Server:

  - SQL Server 2019 (Ubuntu 20.04" %}

```shell
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2019.list)"
```

  - SQL Server 2017 (Ubuntu 18.04)

```shell
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2017.list)"
```

  - SQL Server 2022 (Ubuntu 20.04)

```shell
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2022.list)"
```

{% include image.html post=page.path file="image9.png" %}

Execute o seguinte comando para atualizar os repositórios dos pacotes do
sistema:

```shell
sudo apt-get update
```

{% include image.html post=page.path file="image10.png" %}

Execute o seguinte comando para instalar o SQL Server:

```shell
sudo apt-get install -y mssql-server
```

{% include image.html post=page.path file="image11.png" %}

Após instalado, execute o seguinte comando para realizar a configuração
do SQL Server:

```shell
sudo /opt/mssql/bin/mssql-conf setup
```

Selecione a edição do SQL Server a ser instalada, aceite os termos de
serviço e defina uma senha para a conta de administrador do SQL Server.

{% include image.html post=page.path file="image12.png" %}

Para verificar se o SQL Server está em execução, execute o seguinte
comando:

```shell
systemctl status mssql-server --no-pager
```

{% include image.html post=page.path file="image13.png)

O serviço do SQL Server estar rodando é denotado pelo status “active
(running" %}”.

## Conectar no SQL Server

Para conectar ao SQL Server, outras ferramentas precisam ser instaladas.
Para instâncias Windows, é possível se conectar utilizando o SQL
Management Studio. Para instâncias Linux, através da ferramenta SQLcmd
Utility.

### Linux

Importe as chaves GPG do repositório público da Microsoft:

```shell
curl https://packages.microsoft.com/keys/microsoft.asc | sudo tee /etc/apt/trusted.gpg.d/microsoft.asc
```

{% include image.html post=page.path file="image14.png" %}

Registre o repositório do Microsoft Ubuntu:

  - Ubuntu 22.04

```shell
curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

  - Ubuntu 20.04

```shell
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

  - Ubuntu 18.04

```shell
curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```

  - Ubuntu 16.04

```shell
curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/mssql-release.list
```


{% include image.html post=page.path file="image15.png" %}

Atualize os repositórios do sistema:

```shell
sudo apt-get update
```

{% include image.html post=page.path file="image16.png" %}

Instale o sqlcmd utility:

```shell
sudo apt-get install mssql-tools18 unixodbc-dev
```

Adicione o sqlcmd às variáveis de ambiente:

```shell
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bash_profile
```

Adicione o sqlcmd às variáveis de ambiente:

```shell
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc
source ~/.bashrc
```

Para se conectar localmente à instância do SQL Server, digite o seguinte
comando:

```shell
sqlcmd -S localhost -U sa -P '<SuaSenha>' -C
```

{% include image.html post=page.path file="image17.png" %}

### Windows

Faça download da ferramenta SQL Management Studio e faça a instalação:

<https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16>

Para realizar o login na instância do SQL Server rodando na instância do
Linux, selecione a opção de autenticação por “SQL Server Authentication”
e Server Type de “Database Engine”. O usuário padrão configurado durante
a instalação do SQL Server é “sa”. Clique em “Connect” quando os dados
de login forem inseridos.

{% include image.html post=page.path file="image18.png" %}
