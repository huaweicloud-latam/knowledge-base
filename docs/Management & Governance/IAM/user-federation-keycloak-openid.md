---
title: User Federation with Keycloak (OpenID)
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Management & Governance
permalink: /docs/Management & Governance/IAM/User Federation with Keycloak OpenID
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# User Federation with Keycloak (OpenID)

V1.0 – October 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-10-15 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-10-15 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
efetivação da configuração de federação de identidade na Huawei Cloud
(Service Provider) através de um provedor de identidade (IdP), como o
RedHat SSO ou Keycloak. Neste exemplo, o protocolo utilizado para a
federação de identidade será o OpenID, mapeando os usuários do provedor
de identidade para usuários virtuais na Huawei Cloud.

No diagrama abaixo, é possível visualizar o fluxo do processo de
autenticação na Huawei Cloud utilizando um IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image3.png)

# Keycloak

Primeiramente, faz-se necessário realizar a configuração do provedor de
identidade (IdP). Para isso, acesse a página de configurações do IdP
(Keycloak) e navegue até a seção “Clients”. Clique em “Create” para
criar um novo cliente.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image5.png)

Selecione o “Client Protocol” como sendo “openid-connect” e insira
“hws-oidc” no campo relativo ao “Client ID”. Feito isso, clique em
“Save” para efetivar a criação do client.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image6.png)

Navegue até o cliente da Huawei Cloud criado e clique em “Edit” para
editar as configurações do cliente.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image7.png)

Habilite a opção “Implicit Flow Enabled”, altere o campo “Access Type”
para “confidential” e insira o seguinte hyperlink no campo de “Valid
Redirect URIs”: <https://auth.huaweicloud.com/authui/oidc/post>. Feito
isso, clique em “Save” para salvar as modificações feitas.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image8.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image9.png)

Navegue até a seção de “Mappers”, ainda nas configurações do cliente da
Huawei Cloud, e clique em “Create” para criar um mapper para o username.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image10.png)

Selecione o “Mapper Type” como de tipo “User Property” e preencha os
demais campos conforme a imagem abaixo.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image11.png)

Navegue mais uma vez até a seção de “Mappers”, ainda nas configurações
do cliente da Huawei Cloud, e clique em “Create” para criar um mapper
para o group.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image10.png)

Selecione o “Mapper Type” como de tipo “Group Membership”, desabilite a
opção “Full group path” e preencha os demais campos conforme a imagem
abaixo.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image12.png)

Para realizar a federação de usuários da Huawei Cloud, faz-se necessária
a existência de usuários primeiramente. Caso não exista nenhum usuário
criado no Keycloak, crie um usuário.

Navegue até a seção de “Realm Settings” e clique em “OpenID Endpoint
Configuration”, na subseção de “Endpoints”.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image13.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image14.png)

Tome nota dos seguintes parâmetros, que precisarão ser configurados no
lado do service provider (Huawei Cloud): “authorization\_endpoint” e
“jwks\_uri”.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image15.png)

No web browser, navegue até o hyperlink relativo ao parâmetro
“jwks\_uri” copiado acima e tome nota da chave.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image16.png)

# IAM

Acesse o serviço IAM no console da Huawei Cloud e navegue até a seção
“Identity Providers”. Clique em “Create Identity Provider” para criar
uma configuração de federação de identidade.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image18.png)

Selecione o protocolo OpenID-Connect e o “SSO Type” como “Virtual User”.
Clique no botão “OK” para salvar as configurações da criação da IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image19.png)

Feito isso, selecione a opção “Modify” ao lado do provedor de identidade
criado e preencha os campos conforme mostrado na figura abaixo.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image20.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image21.png)

1.  > **<span class="underline">Identity Provider URL:</span>**
    > Hyperlink relativo ao realm em que o cliente foi configurado no
    > keycloak. Exemplo: ;

2.  **<span class="underline">Client ID:</span>** Mesmo parâmetro
    configurado no campo “Client ID” do Keycloak;

3.  > **<span class="underline">Authorization Endpoint:</span>**
    > Parâmetro “authorization\_endpoint” presente no arquivo de
    > configurações do endpoint Open-ID no Keycloak;

4.  **<span class="underline">Response Mode:</span>** “form\_post”;

5.  > **<span class="underline">Signing Key:</span>** Conteúdo do
    > parâmetro “jwks\_uri”, presente no arquivo de configurações do
    > endpoint Open-ID no Keycloak.

**<span class="underline">Importante:</span>** O protocolo Open-ID
requer, necessariamente, que um certificado SSL seja configurado no
provedor de identidade para possibilitar comunicação via protocolo
HTTPS. O certificado SSL pode ser um certificado auto assinado.

Por fim, na seção de “Identity Conversion Rules”, clique em “Create
Rule” para criar uma regra de conversão de usuários e grupos do IdP
para os usuários e grupos correspondentes na Huawei Cloud. É possível
utilizar o exemplo de regra de conversão abaixo.

**<span class="underline">Importante:</span>** A regra de conversão
abaixo mapeia **todos** os usuários do Keycloak para os grupos do IAM na
Huawei Cloud que possuam os mesmos nomes dos grupos configurados no
Keycloak. Por exemplo: No Keycloak, o usuário “Teste” pertencente ao
grupo “admin” será mapeado, na Huawei Cloud, para o usuário virtual
“Teste” no grupo “admin”. Não é necessário que o usuário “Teste” seja
previamente criado na Huawei Cloud. No entanto, é obrigatório que o
grupo “admin” seja criado previamente na Huawei Cloud com as devidas
políticas de controle de acesso.

```json
[
    {
        "remote": [
            {
                    "type": "username"
            },
            {
                    "type": "Group"
            }
        ],
        "local": [
            {
                    "user": {
                            "name": "{0}"
                    }
            },
            {
                    "group": {
                            "name": "{1}"
                    }
            }
        ]
    }
]
```

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image22.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image23.png)

Feito isso, clique em “OK” para salvar as modificações feitas no IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image24.png)

# Exemplo

A seguir segue um exemplo de validação do login no console da Huawei
Cloud por meio da federação de identidade.

Acessando o console da Huawei Cloud e selecionando a opção de login por
meio de usuário federado.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image25.png)

Inserindo o nome da conta e selecionando a IdP configurada no dropdown.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image26.png)

Realizando o login na provedora de identidade configurada.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image27.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image28.png)

Autenticação realizada com sucesso, redirecionando para o console da
Huawei Cloud.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image29.png)

**<span class="underline">Importante:</span>** Também é possível
realizar o login no console através da federação de identidade por meio
do hyperlink gerado na configuração de Identity Provider no console da
Huawei Cloud.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-OpenID/media/image30.png)

# Referências

  - Documentação do IAM:
    <https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_08_0002.html>

  - Blog da Huawei Cloud: <https://bbs.huaweicloud.com/blogs/401343>
