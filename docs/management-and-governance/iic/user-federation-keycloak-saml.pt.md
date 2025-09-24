---
title: Federação de Usuários com Keycloak (SAML 2.0)
layout: default
parent: IAM Identity Center (IIC)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/iic/user-federation-with-keycloak-saml-2
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Federação de Usuários com Keycloak (SAML 2.0)

V1.0 – Outubro 2024

| **Versão**        | **Autor**                      | **Descrição**        |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-10-25 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-10-25 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
efetivação da configuração de federação de identidade na Huawei Cloud
(Service Provider) através de um provedor de identidade (IdP), como o
RedHat SSO ou Keycloak. Neste exemplo, o protocolo utilizado para a
federação de identidade será o SAML 2.0, mapeando os usuários do
provedor de identidade para usuários IAM na Huawei Cloud.

No diagrama abaixo, é possível visualizar o fluxo do processo de
autenticação na Huawei Cloud utilizando um IdP.

{% include image.html post=page.path file="image3.png" %}

# Keycloak Endpoint

Para realizar a integração da Huawei Cloud com um Identity Provider,
primeiramente se faz necessário obter o arquivo de configurações XML
relativo ao protocolo a ser utilizado do Identity Provider.

Acesse o portal do Keycloak e navegue até a seção de “Realm Settings”.
Clique em “SAML 2.0 Identity Provider Metadata”, na subseção de
“Endpoints”, e salve localmente a página web aberta como um arquivo
XML.

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png" %}

# IIC

## **External Identity Provider**

Acesse o serviço IIC no console da Huawei Cloud e navegue até a seção
“Settings”. Clique em “Change to external identity provider” para
criar uma configuração de federação de identidade.

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

Clique em “Download Metadata File” para baixar o arquivo de
configurações XML do protocolo a ser utilizado (SAML 2.0) do Service
Provider.

{% include image.html post=page.path file="image8.png" %}

Clique em “Select File” na subseção “Identity Provider Details” e
selecione o arquivo XML baixado no item 2.0 deste documento.

{% include image.html post=page.path file="image9.png" %}

Feito isso, basta clicar em “Next” seguido por “OK” para finalizar a
configuração.

{% include image.html post=page.path file="image10.png" %}

{% include image.html post=page.path file="image11.png" %}

**Nota:** As próximas três subseções (3.2, 3.3 e 3.4) são relativas a
configurações de usuários, grupos, permission sets e contas do
Organizations. Caso essas configurações já estejam feitas, ignore as
subseções supracitadas.

## **Users and Groups**

Para realizar a federação de identidade utilizando um Identity Provider,
faz-se necessário que usuários e grupos de usuários sejam criados no
Service Provider. Para isso, selecione a seção de “Groups” e clique em
“Create Group” para criar um grupo de usuários.

{% include image.html post=page.path file="image12.png" %}

Dê um nome ao grupo e selecione “OK” para finalizar a criação do grupo
de usuários.

{% include image.html post=page.path file="image13.png" %}

Para criar os usuários, acesse a seção “Users” e clique em “Create
User”.

{% include image.html post=page.path file="image14.png" %}

Preencha as informações pertinentes ao usuário, como username e e-mail,
e clique em “Next” para avançar.

{% include image.html post=page.path file="image15.png" %}

Selecione um grupo de usuários no qual o usuário pertencerá e clique em
“Next” seguido por “OK” para finalizar a criação do usuário.

{% include image.html post=page.path file="image16.png" %}

{% include image.html post=page.path file="image17.png" %}

## **Permission Sets**

Além dos usuários e grupos, também se faz necessário a presença de
permission sets para delegar permissões aos usuários criados. Para isso,
navegue até a subseção “Permission Sets” na seção “Multi-Account
Permissions”, e clique em “Create Permission Set”.

{% include image.html post=page.path file="image18.png" %}

Preencha os campos relativos ao tempo de sessão do usuário e o nome do
permission set e clique em “Next” para avançar.

{% include image.html post=page.path file="image19.png" %}

Selecione as permissões que o permission set irá possuir e selecione
“Next” seguido por “OK” para finalizar a criação do permission set.

{% include image.html post=page.path file="image20.png" %}

{% include image.html post=page.path file="image21.png" %}

## **Accounts**

Por fim, será necessário configurar uma tripla para o usuário,
permission set e conta, afim de delegar permissões a usuários a contas
específicas do Organizations. Para isso, navegue até a subseção
“Accounts” na seção “Multi-Account Permissions”, e clique em “Assign
User/Group” na conta desejada.

{% include image.html post=page.path file="image22.png" %}

Selecione os usuários que terão acesso à conta selecionada e clique em
“Next” para avançar.

{% include image.html post=page.path file="image23.png" %}

Selecione os permission sets que os usuários supracitados terão acesso
na conta selecionada e clique em “Next” seguido por “OK” para finalizar
a delegação de permissões a usuários.

{% include image.html post=page.path file="image24.png" %}

{% include image.html post=page.path file="image25.png" %}

# Keycloak Client

Para realizar a integração da Huawei Cloud com o Keycloack, faz-se
necessário, primeiramente, criar um Client no IdP. Para isso, acesse a
página de configurações do IdP (Keycloak) e navegue até a seção
“Clients”. Clique em “Create” para criar um novo cliente.

{% include image.html post=page.path file="image26.png" %}

{% include image.html post=page.path file="image27.png" %}

Clique em “Select file” para importar o arquivo de configurações XML da
Huawei Cloud, salvo no item 3.1 deste documento, e clique em “Save”.

{% include image.html post=page.path file="image28.png" %}

{% include image.html post=page.path file="image29.png" %}

Navegue até o cliente da Huawei Cloud criado e clique em “Edit” para
editar as configurações do cliente.

{% include image.html post=page.path file="image30.png" %}

Desligue a opção “Client Signature Required”, habilite a opção “Force
Name ID Format”, selecione o campo “Name ID Format” como sendo
“username” e clique em “Save” para salvar as modificações feitas.

{% include image.html post=page.path file="image31.png" %}

{% include image.html post=page.path file="image32.png" %}

Navegue até a seção de “Mappers”, ainda nas configurações do cliente da
Huawei Cloud, e clique em “Create” para criar um mapper para o username.

{% include image.html post=page.path file="image33.png" %}

Selecione o “Mapper Type” como de tipo “User Property” e preencha os
campos conforme a imagem abaixo.

{% include image.html post=page.path file="image34.png" %}

Navegue mais uma vez até a seção de “Mappers”, ainda nas configurações
do cliente da Huawei Cloud, e clique em “Create” para criar um mapper
para o group.

{% include image.html post=page.path file="image33.png" %}

Selecione o “Mapper Type” como de tipo “Group list” e preencha os campos
conforme a imagem abaixo.

{% include image.html post=page.path file="image35.png" %}

**Nota:** Para realizar a federação de usuários da Huawei Cloud, faz-se
necessária a existência de usuários primeiramente. Caso não exista
nenhum usuário criado no Keycloak, crie um usuário.

# Exemplo

A seguir segue um exemplo de validação do login no console da Huawei
Cloud por meio da federação de identidade.

Acessando o hyperlink do portal do IAM Identity Center.

{% include image.html post=page.path file="image36.png" %}

Redirecionamento para a página de login do Identity Provider.

{% include image.html post=page.path file="image37.png" %}

Redirecionamento para a o console da Huawei Cloud após a autenticação
ser bem-sucedida.

{% include image.html post=page.path file="image38.png" %}

Clique em “Access Console” ao lado do permission set desejado para
realizar login na conta desejada.

{% include image.html post=page.path file="image39.png" %}

{% include image.html post=page.path file="image40.png" %}

# Referências

  - Documentação do IIC:
    <https://support.huaweicloud.com/intl/pt-br/productdesc-identitycenter/iic_01_0002.html>

  - Blog da Huawei Cloud: <https://bbs.huaweicloud.com/blogs/429838>
