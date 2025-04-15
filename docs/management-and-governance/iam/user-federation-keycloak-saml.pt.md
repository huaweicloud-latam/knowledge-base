---
title: Federação de Usuários com Keycloak (SAML 2.0)
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/iam/user-federation-with-keycloak-saml-2
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Federação de Usuários com Keycloak (SAML 2.0)

V1.2 – Outubro 2024

| **Versão**        | **Autor**                      | **Descrição**            |
| ----------------- | ------------------------------ | ------------------------ |
| V1.0 – 2024-10-14 | Diogo Hatz d50037923           | Versão Inicial           |
| V1.0 – 2024-10-14 | Wisley da Silva Paulo 00830850 | Revisão do Documento     |
| V1.1 – 2024-11-11 | Diogo Hatz d50037923           | Atualização do documento |
| V1.2 – 2024-12-19 | Diogo Hatz d50037923           | Atualização do documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
efetivação da configuração de federação de identidade na Huawei Cloud
(Service Provider) através de um provedor de identidade (IdP), como o
RedHat SSO ou Keycloak. Neste exemplo, o protocolo utilizado para a
federação de identidade será o SAML 2.0, mapeando os usuários do
provedor de identidade para usuários virtuais na Huawei Cloud.

No diagrama abaixo, é possível visualizar o fluxo do processo de
autenticação na Huawei Cloud utilizando um IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image3.png)

# Keycloak

Primeiramente, faz-se necessário obter o arquivo de configuração XML do
service provider (SP) da Huawei Cloud para realizar a configuração no
Keycloak.

Em um navegador web, acesse a seguinte página e salve o seu conteúdo em
um arquivo XML: <https://auth.huaweicloud.com/authui/saml/metadata.xml>.

**<span class="underline">Nota:</span>** Para implementações baseadas em
nuvem privada, como o HCSO, o endpoint público para obter o XML do SAML
2.0 possuirá a seguinte estrutura: .

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image4.png)

Feito isso, acesse a página de configurações do IdP (Keycloak) e navegue
até a seção “Clients”. Clique em “Create” para criar um novo cliente.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image6.png)

Clique em “Select file” para importar o arquivo de configurações XML da
Huawei Cloud, salvo na etapa anterior e clique em “Save”.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image8.png)

Navegue até o cliente da Huawei Cloud criado e clique em “Edit” para
editar as configurações do cliente.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image9.png)

Desligue a opção “Encrypt Assertions” e clique em “Save” para salvar a
modificação feita.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image10.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image11.png)

Navegue até a seção de “Mappers”, ainda nas configurações do cliente da
Huawei Cloud, e clique em “Create” para criar um mapper para o username.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image12.png)

Selecione o “Mapper Type” como de tipo “User Property” e preencha os
campos conforme a imagem abaixo.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image13.png)

Navegue mais uma vez até a seção de “Mappers”, ainda nas configurações
do cliente da Huawei Cloud, e clique em “Create” para criar um mapper
para o group.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image12.png)

Selecione o “Mapper Type” como de tipo “Group list” e preencha os campos
conforme a imagem abaixo.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image14.png)

Para realizar a federação de usuários da Huawei Cloud, faz-se necessária
a existência de usuários primeiramente. Caso não exista nenhum usuário
criado no Keycloak, crie um usuário.

Navegue até a seção de “Realm Settings” e clique em “SAML 2.0 Identity
Provider Metadata”, na subseção de “Endpoints”. Salve localmente a
página web aberta como um arquivo XML.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image15.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image16.png)

# IAM

Acesse o serviço IAM no console da Huawei Cloud e navegue até a seção
“Identity Providers”. Clique em “Create Identity Provider” para criar
uma configuração de federação de identidade.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image18.png)

Selecione o protocolo SAML e o “SSO Type” como “Virtual User”. Clique no
botão “OK” para salvar as configurações da criação da IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image19.png)

Feito isso, selecione a opção “Modify” ao lado do provedor de identidade
criado e clique em “Select File” para realizar o upload do arquivo de
configurações XML salvo do provedor de identidade (Keycloak). Após ter
selecionado o arquivo, selecione “Upload” para fazer o upload do arquivo
XML e carregar as configurações do IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image20.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image21.png)

Após confirmar o upload do arquivo, clique em “OK” nas configurações
extraídas do Keycloak pelo arquivo XML para salvar.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image22.png)

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
                    "type": "UserName"
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

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image23.png)

Feito isso, clique em “OK” para salvar as modificações feitas no IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image24.png)

# Exemplo

A seguir segue um exemplo de validação do login no console da Huawei
Cloud por meio da federação de identidade.

Acessando o console da Huawei Cloud e selecionando a opção de login por
meio de usuário federado.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image25.png)

Inserindo o nome da conta e selecionando a IdP configurada no dropdown.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image26.png)

Realizando o login na provedora de identidade configurada.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image27.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image28.png)

Autenticação realizada com sucesso, redirecionando para o console da
Huawei Cloud.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image29.png)

**<span class="underline">Importante:</span>** Também é possível
realizar o login no console através da federação de identidade por meio
do hyperlink gerado na configuração de Identity Provider no console da
Huawei Cloud.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image30.png)

# Referências

  - Documentação do IAM:
    <https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_08_0002.html>

  - Blog da Huawei Cloud: <https://bbs.huaweicloud.com/blogs/393396>
