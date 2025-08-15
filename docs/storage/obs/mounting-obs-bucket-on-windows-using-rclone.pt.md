---
title: Montar Bucket OBS no Windows usando Rclone
layout: default
parent: Object Storage Service (OBS)
grand_parent: Armazenamento
lang: pt
permalink: /docs/storage/obs/mount-obs-bucket-on-windows-using-rclone
---

# Montando um Bucket OBS no Windows usando Rclone

| **Versão**        | **Descrição**                       | **Descrição**             |
| ----------------- | ----------------------------------- | --------------------------|
| V1.0 – 2025-07-31 | Fernando Gabriel Chacon  50037923   | Versão Inicial            |
| V1.0 – AAAA-MM-DD | XXXXXXXXXXXX YYYYYYYY               | Revisão do Documento      |

1. Índice
{:toc}

## Introdução

O Object Storage Service (OBS) é uma solução de armazenamento em nuvem escalável e segura fornecida pela Huawei Cloud. Em muitos cenários, os usuários podem querer acessar seus buckets OBS diretamente pelo sistema de arquivos local, especialmente em máquinas com Windows. Isso é útil para navegação, leitura e até upload de arquivos como se estivessem armazenados localmente.

O Rclone é uma poderosa ferramenta de linha de comando open-source que permite montar serviços de armazenamento em nuvem como unidades virtuais. Este guia mostrará como montar um bucket OBS no Windows usando o Rclone, permitindo acesso direto ao armazenamento em nuvem através do Windows Explorer.

## Criar um Usuário IAM

Recomenda-se criar um usuário IAM exclusivo para a montagem, a fim de restringir o acesso somente ao OBS.

[https://console-intl.huaweicloud.com/iam/#/iam/users/create](https://console-intl.huaweicloud.com/iam/#/iam/users/create)

selecione **Access Type**: Programmatic access, e **Credential Type**: Access key.

{% include image.html post=page.path file="create-user.png" alt="Create a new user" %}

**Não** crie nem adicione o usuário a nenhum grupo de usuários.  

Clique em **Criar**.

Baixe a Access Key (essa é a única vez em que ela estará disponível). O arquivo `credentials.csv` será salvo.

{% include image.html post=page.path file="download-keys.png" alt="Download the Access Key" %}

{% include image.html post=page.path file="access-key.png" alt="example of AK" %}

## Concedendo Permissões de Leitura/Escrita a um Usuário IAM via "Bucket policies" do OBS

Ao invés de adicionar o usuário a um grupo e atribuir permissões nele, você pode conceder acesso de leitura e escrita diretamente ao usuário IAM criando uma política de bucket.

Acesse o Console OBS → Selecione seu bucket → Permissões → Políticas do Bucket → Criar.

{% include image.html post=page.path file="bucket-policy-create.png" alt="Criar nova política de bucket" %}

1. Digite um nome para a política (ex.: obs-rw-user-policy).
2. Escolha **Current Account** como tipo de principal.
3. Selecione o usuário IAM que você acabou de criar.
4. Marque a opção `"Entire Bucket"` para aplicar a política a todos os objetos do bucket.
5. Selecione `"Bucket Read/Write"` na seção de **Ações**.
6. Clique em **Criar** para salvar a política.

{% include image.html post=page.path file="create-policy-window.png" alt="Create new policy window" %}

## Obtendo o Nome do Bucket OBS e seu Endpoint

Na página de detalhes do Bucket OBS, copie os valores das propriedades Bucket Name e Endpoint:

{% include image.html post=page.path file="get-bucket-details.png" alt="Getting bucket param" %}

## Baixar e instalar o WinFSP e Rclone

1. Baixe e instale a última versão do WinFSP (apenas o recurso *Core* é necessário):
[https://github.com/winfsp/winfsp/releases/](https://github.com/winfsp/winfsp/releases/)
2. Baixe o Rclone para Windows: [https://rclone.org/downloads/](https://rclone.org/downloads/)
3. Extraia os arquivos do Rclone para `C:\rclone`
4. Crie duas pastas dentro: `C:\rclone\conf` e `C:\rclone\logs`

{% include image.html post=page.path file="folder-structure.png" alt="Final folder structure" %}

## Criar arquivo de configuração

Crie o arquivo de configuração com o Bloco de Notas: `C:\rclone\conf\rclone.txt`.

Adicione o seguinte conteúdo:

```ini
[obs]
type = s3
provider = HuaweiOBS
access_key_id = {ak}
secret_access_key = {sk}
region = {region}
endpoint = {endpoint}
acl = private
```

Substitua o `{ak}` e `{sk}` pelos valores obtidos no arquivo `credentials.csv`

Substitua o `{endpoint}` pelo endpoint do bucket OBS

Substitua a `{region}` pela informação entre `obs.` e `.myhuaweicloud.com` no endpoint do bucket  
(ex: se o endpoint for `obs.sa-brazil-1.myhuaweicloud.com`, substitua `{region}` por `sa-brazil-1`)


{% include image.html post=page.path file="create-configuration-file.png" alt="config file created" %}

## Testando a montagem do bucket OBS

Abra o PowerShell e execute o seguinte comando (substitua `{bucket-name}`):

```shell
C:\rclone\rclone.exe mount "obs:/{bucket-name}" X: --config C:\rclone\conf\rclone.txt
```

O bucket OBS deverá ser montado na unidade X: e permanecerá montado enquanto o comando estiver em execução no PowerShell.

Pressione Ctrl+C no PowerShell para desmontar.

{% include image.html post=page.path file="test-mount-command.png" alt="Testing mount command" %}

## Montar automaticamente na inicialização do Windows

Se desejar montar o bucket OBS automaticamente ao iniciar o Windows:

Baixe o NSSM: [https://nssm.cc/download](https://nssm.cc/download)

Abra o arquivo ZIP e extraia o arquivo `nssm-x.xx\win64\nssm.exe` para a pasta `C:\rclone`<br>
Abra o PowerShell e execute o seguinte comando: `C:\rclone\nssm.exe install Rclone-OBS`<br>

Na janela que será aberta, configure os seguintes parâmetros (aba Application):

- Path: `C:\rclone\rclone.exe`
- Startup directory: `C:\rclone`
- Arguments: mount `"obs:/{bucket-name}" X: --config C:\rclone\conf\rclone.txt`
{% include image.html post=page.path file="nssm-application-config.png" alt="NSSM set  param in application tab" %} 

Na aba I/O, configure os seguintes parâmetros:

- Output (stdout): `C:\rclone\logs\mount.txt`
- Error (stderr): `C:\rclone\logs\mount.txt`

{% include image.html post=page.path file="nssm-IO-config.png" alt="NSSM set  param in IO tab" %} 
    
Na aba File Rotation, configure os seguintes parâmetros:

- Check **“Rotate files”**
- Check **“Rotate while service is running”**
- Set **“Restrict rotation to files bigger than”** to “10000000” (~10MB)

{% include image.html post=page.path file="nssm-fr-config.png" alt="NSSM set  param in file rotation tab" %} 

Clique em `Install service`
Execute o seguinte comando:
```shell
C:\rclone\nssm.exe start Rclone-OBS
```
O bucket OBS deverá ser montado.  

Reinicie o sistema para confirmar que a montagem automática está funcionando.

    
{% include image.html post=page.path file="test-after-reboot.png" alt="Testing after rebboting" %}

## Referências
1. OBS – Access Keys (AK/SK): [https://support.huaweicloud.com/intl/en-us/productdesc-obs/obs_03_0208.html](https://support.huaweicloud.com/intl/en-us/productdesc-obs/obs_03_0208.html)
2. Rclone – Install: [https://rclone.org/install/](https://rclone.org/install/). Access date: 2023-01-27
3. Rclone – S3 Storage Providers – Huawei OBS: [https://rclone.org/s3/#huawei-obs](https://rclone.org/s3/#huawei-obs). Access date: 2023-01-27
