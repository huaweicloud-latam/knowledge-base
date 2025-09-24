---
title: Delegando Acesso à Conta de Cliente via Agency
layout: default
parent: Partner Center
grand_parent: Outros
permalink: /docs/others/partner-center/delegating-account-access-agency-partner
lang: pt
---

# Delegando Acesso à Conta de Cliente via Agency

V1.0 – Março 2023

| **Versão**        | **Autor**                | **Descrição**  |
|-------------------|--------------------------|----------------|
| V1.0 – 2023-03-17 | Gabriel Gutierrez 817435 | Versão inicial |

# INTRODUÇÃO

A função Agency permite que o parceiro seja autorizado a realizar O&M na
conta do cliente. O cliente pode delegar acesso a recursos somente para
outras contas. As contas delegadas podem, então, delegar acesso a
usuários IAM sob elas.

Ao criar uma Agency, o cliente pode compartilhar seus recursos com outra
conta ou delegar um indivíduo ou equipe para gerenciar seus recursos. O
cliente não precisa compartilhar suas credenciais de segurança (como
senha e chaves de acesso) com a parte delegada. Em vez disso, a parte
delegada pode fazer login com suas próprias credenciais de conta e, em
seguida, utilizar a função “Switch Role” para entrar em sua conta e
gerenciar seus recursos.

Quando uma relação de confiança é estabelecida entre sua conta e a conta
do cliente, você se torna uma parte delegada. Por predefinição, apenas a
sua conta e os membros do grupo de administradores podem gerir recursos
para a parte delegante. Para autorizar os usuários do IAM a gerenciar
esses recursos, atribua permissões aos usuários.

{% include image.html post=page.path file="image3.png" %}

# PROCEDIMENTO

## CRIAÇÃO DA POLICY

O primeiro passo é a criação de uma Policy que permite que usuários IAM
realizem a operação “Switch Role” para uma determinada conta de cliente.

1.  O cliente deve criar a Agency na conta dele, seguindo o procedimento
    descrito no documento “Delegação de Conta (procedimento para o
    cliente)”. O cliente deve informar o nome da conta (Account Name), o
    nome da Agency e a ID da Agency.

2.  No Console da HUAWEI CLOUD, abra o menu de serviços no lado
    esquerdo, procure por “iam” e selecione a opção “Identity and Access
    Management”

{% include image.html post=page.path file="image4.png" %}

Para chegar no console da HUAWEI CLOUD a partir do Partner Center, passe
o mouse em cima do nome da conta, selecione a opção “Security Settings”
e em seguida clique no menu de serviços do lado esquerdo.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

3.  No menu do lado esquerdo, clique em “Permissions”, em seguida em
    “Policies/Roles”, e depois em “Create Custom Policy” no canto
    superior direito

{% include image.html post=page.path file="image7.png" %}

4.  Configure um nome para a Policy (“Manage Customer XX”, por exemplo);
    selecione “JSON” em Policy View; em Policy Content, coloque o
    seguinte conteúdo, substituindo <span class="mark">xxxxx</span> pelo
    ID da Agency informada pelo cliente; por fim, clique em “OK”:

```json
{
   "Version":"1.1",
   "Statement":[
      {
         "Action":[
            "iam:agencies:assume"
         ],
         "Resource":{
            "uri":[
               "/iam/agencies/xxxxx"
            ]
         },
         "Effect":"Allow"
      }
   ]
}
```

{% include image.html post=page.path file="image8.png" %}

## AUTORIZAÇÃO

Uma vez criada a Policy, é possível associá-la a um User Group já
existente, ou então diretamente a um IAM User. A seguir será detalhado o
processo de atribuição da Policy a um User Group chamado “user_A_group”,
associado a um IAM User “user_A”. O procedimento a seguir deve ser
realizado a partir da conta “root”.

5.  Na página de gerenciamento do IAM (seção 2.1 passo 2), selecione
    “User Groups” no menu do lado esquerdo e clique em “Create User
    Group” no canto superior direito:

{% include image.html post=page.path file="image9.png" %}

6.  Configure um nome para o User Group e uma descrição, se preferir; em
    seguida, clique em “OK”.

{% include image.html post=page.path file="image10.png" %}

7.  Na lista de User Groups, clique no nome do grupo criado

{% include image.html post=page.path file="image11.png" %}

8.  Na aba “Permissions”, clique em “Authorize”

{% include image.html post=page.path file="image12.png" %}

9.  Procure pelo nome da Policy criada anteriormente, marque a caixa de
    seleção correspondente, e em seguida clique em “Next”

{% include image.html post=page.path file="image13.png" %}

10. Na tela seguinte, clique em “OK”, depois em “OK” novamente para
    confirmar, e em seguida em “Finish”.

{% include image.html post=page.path file="image14.png" %}

11. Na tela de detalhes do User Group, clique na aba “Users” e em
    seguida em “Add”:

{% include image.html post=page.path file="image15.png" %}

12. Selecione o usuário “user_A” e clique em “OK”

{% include image.html post=page.path file="image16.png" %}

A partir deste momento, o usuário “user_A” pode utilizar a função
“Switch Role” para entrar na conta do cliente.

## CONFIGURAÇÃO DO “SWITCH ROLE” (PRIMEIRO ACESSO)

13. Uma vez realizado o login como usuário IAM “user_A”, passe o mouse
    em cima do nome da conta e selecione a opção “Switch Role” no menu
    que aparece:

{% include image.html post=page.path file="image17.png" %}

Partindo do Partner Center, passe o mouse em cima do nome de usuário,
selecione a opção “Security Settings”. Em seguida, passe novamente o
mouse em cima do nome de usuário e selecione a opção “Switch Role”.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image18.png" %}

14. Em “Account”, informe o nome da conta do cliente; em seguida, clique
    no campo “Agency Name” e selecione a Agency criada pelo cliente (ex.
    “Partner Management”); por fim, clique em “OK”.

{% include image.html post=page.path file="image19.png" %}{% include image.html post=page.path file="image20.png" %}

## REALIZANDO O “SWITCH ROLE”

1.  No console, passe o mouse em cima do nome da conta, em seguida em
    “Switch Role” e por fim selecione o nome da conta do cliente.

{% include image.html post=page.path file="image21.png" %}

Partindo do Partner Center, passe o mouse em cima do nome de usuário,
selecione a opção “Security Settings”. Em seguida, passe novamente o
mouse em cima do nome de usuário, em seguida em “Switch Role” e por fim
selecione o nome do cliente.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image22.png" %}

15. Caso não apareça no submenu “Switch Role”, clique em “Switch Role”
    ou em “Others”. Em seguida, procure pela conta do cliente na seção
    “Role Switch History” e selecione a opção correspondente. Feito
    isso, ela deve aparecer no menu do passo anterior.

{% include image.html post=page.path file="image23.png" %}

16. A partir de agora, pode-se operar a conta do cliente.

{% include image.html post=page.path file="image24.png" %}

17. Para sair da conta do cliente, basta passar o mouse em cima do nome
    da conta, abrir o menu “Switch Role” e clicar no nome do usuário
    IAM.

{% include image.html post=page.path file="image25.png" %}

# REFERÊNCIAS

**Delegating Resource Access to Another Account**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0001.html>

Acesso em 2023-03-17

**Creating an Agency (by a Delegating Party)**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0002.html>

Acesso em 2023-03-17

**(Optional) Assigning Permissions to an IAM User (by a Delegated
Party)**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_01_0063.html>

Acesso em 2023-03-17

**Switching Roles (by a Delegated Party)**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0003.html>

Acesso em 2023-03-17
