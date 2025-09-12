---
title: Delegando Acesso à Conta via Agency
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/iam/delegating-account-access-agency
---

# Delegando Acesso à Conta via Agency

V1.0 – Março 2023

# REGISTRO DE MUDANÇAS

| **Versão**        | **Autoria**              | **Descrição**  |
|-------------------|--------------------------|----------------|
| V1.0 – 2023-03-17 | Gabriel Gutierrez 817435 | Versão inicial |

# INTRODUÇÃO

A função Agency permite que você delegue outra conta para implementar
O&M em seus recursos com base nas permissões atribuídas. Você pode
delegar acesso a recursos somente para contas. As contas podem, então,
delegar acesso a usuários IAM sob elas.

Ao criar uma Agency, você pode compartilhar seus recursos com outra
conta ou delegar um indivíduo ou equipe para gerenciar seus recursos.
Você não precisa compartilhar suas credenciais de segurança (como senha
e chaves de acesso) com a parte delegada. Em vez disso, a parte delegada
pode fazer login com suas próprias credenciais de conta e, em seguida,
utilizar a função “Switch Role” para entrar em sua conta e gerenciar
seus recursos.

# PROCEDIMENTO

1.  No Console da HUAWEI CLOUD, abra o menu de serviços no lado
    esquerdo, procure por “iam” e selecione a opção “Identity and Access
    Management”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image3.png"
style="width:6.26806in;height:2.07361in" />

2.  No menu no lado esquerdo, clique em “Agencies”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image4.png"
style="width:6.26806in;height:2.99306in" />

3.  No canto superior direito, clique em “Create Agency”

> <img
> src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image5.png"
> style="width:6.26806in;height:1.88819in" />

4.  Escolha um nome para a Agency (“Partner Management”, por exemplo);
    em “Delegated Account” informe o nome da conta (ID da conta) do
    parceiro; em seguida clique em “Next”

> <img
> src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image6.png"
> style="width:4.55746in;height:3.3209in" />

5.  Na tela seguinte, procure por “tenant administrator”, marque a caixa
    de seleção, e em seguida clique em “Next”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image7.png"
style="width:6.26806in;height:2.92778in" />

6.  Na tela seguinte, clique em “OK”, e depois em “OK” novamente para
    confirmar.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image8.png"
style="width:6.26806in;height:2.91806in" />

7.  Clique em “Finish”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image9.png"
style="width:4.70912in;height:1.92361in" />

8.  Volte para lista de Agencies (passo 2), passe o mouse em cima do
    nome da Agency criada, e clique no ícone indicado para copiar o ID
    da Agency.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image10.png"
style="width:6.26806in;height:2.05417in" />

Forneça o nome da sua conta (Account Name), o nome da Agency e a ID da
Agency (copiada no passo 8) à parte delegada (parceiro). A parte
delegada pode então alternar a função para sua conta e gerenciar os
recursos.

# REFERÊNCIAS

**Delegating Resource Access to Another Account**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0001.html>

Acesso em 2023-03-17

**Creating an Agency (by a Delegating Party)**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0002.html>

Acesso em 2023-03-17
