---
title: Criação de Usuário, Grupo e Política
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/iam/create-user-group-policy
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Criação de Usuário, Grupo e Política

V1.0 – Março 2023

| **Versão**        | **Autor**                      | **Descrição**        |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2023-03    | Gabriel Gutierrez 00817435     | Versão Inicial       |

# Introdução

Este documento apresenta os procedimentos para criar uma política, grupo
e usuário. Caso já possua a políticas criadas ou deseje utilizar
políticas já existentes na console pode pular a etapa de “Criação de
política” e iniciar pela criação dos grupos e depois dos usuários.

# Criação de Política

Acesse o serviço de IAM:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image3.png"
style="width:6.26806in;height:1.31319in" />

Clicar em “Permission” e depois em “Policeis/Roles”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image4.png"
style="width:6.26806in;height:2.04583in" />

Clicar em “Create Custom Policy”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image5.png"
style="width:6.26806in;height:3.04236in" />

Defina o nome para a política e inicie a definição do conteúdo da política. Obs.: No exemplo abaixo estamos definindo permissões para um usuário/grupo com perfil de DBA com acesso exclusivo ao serviço EDS, **mas lembre-se de ajustar de acordo com a necessidade que tem**.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image6.png"
style="width:6.27574in;height:2.58302in" />

Selecione o serviço

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image7.png"
style="width:6.29661in;height:2.64184in" />

Especifique quais recursos do serviço deseja permitir/negar ou se deseja dar acesso completo ao serviço clique em “Select All”.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image8.png"
style="width:6.26806in;height:3.51597in" />

Mantenha a opção “All” a menos que tenha conhecimento avançado para especificar recursos do serviço que queira limitar.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image9.png"
style="width:6.26806in;height:2.50069in" />

Não há necessidade de adicionar condição apenas em casos muito específicos (se precisar entre contato com parceiro para auxiliar), preencha uma desção para a política e por fim clique em “OK”.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image10.png"
style="width:6.26806in;height:2.48194in" />

# Criação de Grupo

Acesse o serviço de IAM:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image3.png"
style="width:6.26806in;height:1.31319in" />

Selecione “User Groups” e depois “Create User Group”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image11.png"
style="width:6.26806in;height:2.03681in" />

Defina o nome do grupo, uma descrição e clique em ok.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image12.png"
style="width:6.26806in;height:2.08819in" />

Clique no grupo.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image13.png"
style="width:6.26806in;height:2.02778in" />

Clique em “Authorize”.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image14.png"
style="width:6.26806in;height:2.35069in" />

Selecione as políticas que deseja utilizar no grupo e clique em “Next”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image15.png"
style="width:6.26806in;height:3.53333in" />

Selecione a forma com que a permissão será concedida, exemplo: será para uma região específica ou para recursos implementados em um projeto específico. **Quanto mais restritiva a permissão concedida mais seguro estará sua conta.**

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image16.png"
style="width:6.26806in;height:3.50556in" />

Clique em “Finish”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image17.png"
style="width:6.26806in;height:2.49167in" />

# Criação de Usuário

Acesse o serviço de IAM:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image3.png"
style="width:6.26806in;height:1.31319in" />

Clique em “Users” e depois em “Create User”:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image18.png"
style="width:6.26806in;height:2.05625in" />

Realize os preenchimentos como orientado nos subitens seguintes:

Preencha o campo “Username” com o padrão que deseja utilizar na console ou com padrão que já existe em sua infraestrutura, exemplo nome.últimon

Preencha o campo “Email Address” com o email do usuário, utilize email coorporativo evite uso de email pessoal. Obs.: Em algumas redes os usuários têm dificuldade de ber informações no email coorporativo como código de verificação, caso isso ocorra contate sua equipe de rede/segurança para verificar o proble

Preencher o “Mobile Number” não é obrigatório, mas recomendado para eventuais problemas com recebimento de código de verificação por ema

Selecione o tipo de acesso de acordo com uso do usuário, porém por segurança evite de que todos os usuários tenham acesso programático e console com um padr

Selecione o campo “Credential Type” para realizar o download credenciais de acesso programático.

Defina a senha inicial do usuário ou deixe o sistema gear uma senha aleatória e mantenha a opção de trocar senha no primeiro acesso marcada por segurança. Obs.: Caso o 
rio tenha problemas em trocar a senha no primeiro acesso por conta do email de verificação, desmarque opção de trocar senha o primeiro conceda o acesso presencialmente para 
rio oferendo seu terminal no momento de o usuário digitar a sen

**EXTREMAMENTE** recomendado a ativação do MFA para proteção do log

Clique em “Next”.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image19.png"
style="width:6.26806in;height:3.51597in" />

Selecione o grupo com conjunto de permissões que deseja para o usuário. Obs.: Usuário pode ser atribuído a mais de um grupo ou a nenhum grupo, no caso de não pertencer a nenhum grupo as permissões/políticas devem ser atribuídas diretamente no usuário como pode verificar no item 3.4.1 até 3.4.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image20.png"
style="width:6.26806in;height:3.51667in" />

Clique no usuário que deseja atribuir diretamente políticas:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image21.png"
style="width:5.65117in;height:1.83071in" />

Clique em “Permissions”:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image22.png"
style="width:5.6659in;height:2.38475in" />

Clique em “Authorize”:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image23.png"
style="width:5.6524in;height:2.40662in" />

Selecione “Select permissions”, depois marque todas as permissões que deseja para o usuário (Obs.: Pode utilizar a busca para facilitar) e depois clique em “Next”:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image24.png"
style="width:5.75014in;height:3.21207in" />

Case tenha modo “Enterprise projects” ativado selecione qual ou quais projetos o usuário terá permissão.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image25.png"
style="width:5.70919in;height:3.20439in" />

Clique em “Finish”.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image26.png"
style="width:6.26806in;height:1.825in" />
