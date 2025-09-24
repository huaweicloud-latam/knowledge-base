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

{% include image.html post=page.path file="image3.png" %}

Clicar em “Permission” e depois em “Policeis/Roles”

{% include image.html post=page.path file="image4.png" %}

Clicar em “Create Custom Policy”

{% include image.html post=page.path file="image5.png" %}

Defina o nome para a política e inicie a definição do conteúdo da política. Obs.: No exemplo abaixo estamos definindo permissões para um usuário/grupo com perfil de DBA com acesso exclusivo ao serviço EDS, **mas lembre-se de ajustar de acordo com a necessidade que tem**.

{% include image.html post=page.path file="image6.png" %}

Selecione o serviço

{% include image.html post=page.path file="image7.png" %}

Especifique quais recursos do serviço deseja permitir/negar ou se deseja dar acesso completo ao serviço clique em “Select All”.

{% include image.html post=page.path file="image8.png" %}

Mantenha a opção “All” a menos que tenha conhecimento avançado para especificar recursos do serviço que queira limitar.

{% include image.html post=page.path file="image9.png" %}

Não há necessidade de adicionar condição apenas em casos muito específicos (se precisar entre contato com parceiro para auxiliar), preencha uma desção para a política e por fim clique em “OK”.

{% include image.html post=page.path file="image10.png" %}

# Criação de Grupo

Acesse o serviço de IAM:

{% include image.html post=page.path file="image3.png" %}

Selecione “User Groups” e depois “Create User Group”

{% include image.html post=page.path file="image11.png" %}

Defina o nome do grupo, uma descrição e clique em ok.

{% include image.html post=page.path file="image12.png" %}

Clique no grupo.

{% include image.html post=page.path file="image13.png" %}

Clique em “Authorize”.

{% include image.html post=page.path file="image14.png" %}

Selecione as políticas que deseja utilizar no grupo e clique em “Next”

{% include image.html post=page.path file="image15.png" %}

Selecione a forma com que a permissão será concedida, exemplo: será para uma região específica ou para recursos implementados em um projeto específico. **Quanto mais restritiva a permissão concedida mais seguro estará sua conta.**

{% include image.html post=page.path file="image16.png" %}

Clique em “Finish”

{% include image.html post=page.path file="image17.png" %}

# Criação de Usuário

Acesse o serviço de IAM:

{% include image.html post=page.path file="image3.png" %}

Clique em “Users” e depois em “Create User”:

{% include image.html post=page.path file="image18.png" %}

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

{% include image.html post=page.path file="image19.png" %}

Selecione o grupo com conjunto de permissões que deseja para o usuário. Obs.: Usuário pode ser atribuído a mais de um grupo ou a nenhum grupo, no caso de não pertencer a nenhum grupo as permissões/políticas devem ser atribuídas diretamente no usuário como pode verificar no item 3.4.1 até 3.4.

{% include image.html post=page.path file="image20.png" %}

Clique no usuário que deseja atribuir diretamente políticas:

{% include image.html post=page.path file="image21.png" %}

Clique em “Permissions”:

{% include image.html post=page.path file="image22.png" %}

Clique em “Authorize”:

{% include image.html post=page.path file="image23.png" %}

Selecione “Select permissions”, depois marque todas as permissões que deseja para o usuário (Obs.: Pode utilizar a busca para facilitar) e depois clique em “Next”:

{% include image.html post=page.path file="image24.png" %}

Case tenha modo “Enterprise projects” ativado selecione qual ou quais projetos o usuário terá permissão.

{% include image.html post=page.path file="image25.png" %}

Clique em “Finish”.

{% include image.html post=page.path file="image26.png" %}
