---
title: Instalando e Configurando o Bacula no OBS
layout: default
parent: Object Storage Service (OBS)
grand_parent: Armazenamento
lang: pt
permalink: /docs/storage/obs/installing-and-configuring-bacula-on-obs
---

# Instalação e Configuração do Bacula com OBS

V1.0 – Abril 2023
 
| **Versão**        | **Autor**             | **Descrição**  |
|-------------------|-----------------------|----------------|
| V1.0 – 2023-04-29 | Wisley Paulo w0083850 | Versão inicial |

# Introdução

Este documento apresenta os procedimentos para instalação de um servidor
bacula utilizando instância ECS na HuaweiCloud e configuração do
servidor para armazenamento de backups em um bucket no serviço OBS da
Huawei cloud. Para esse cenário a configuração do bacula será feito
utilizando a versão Community.

# Provisionamento instancia para servidor bacula

Acesso o serviço computacional ECS e clique em “ Buy ECS” 

{% include image.html post=page.path file="image3.png" %}

Selecione os itens: Região, Zona de disponibilidade, tamanho da instância, imagem (Utilizamos nesse tutorial CentOs 7.9), selecione o tamanho do disco e clique em “Next: Configure Network”.

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png" %}

Selecione os itens de rede da instância: VPC, Subnet, Security Group e EIP (IP público).

Na security group é importante que tenha liberado a porta 22 para acesso e configuração da instância, a porta 9095 e 9096 caso queira utilizar plugin para interface gráfica Baculum.

Não é necessário que o servidor tenha IP Público (mas nesse tutorial foi ativado para facilitar o acesso do servidor para configuração).

Por fim clique no botão “Next: Configure Advanced Settings”

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

Defina um nome para instância, se deseja usar senha ou par de chave e clique em “Next: Cofirm”.

{% include image.html post=page.path file="image8.png" %}

Confirme se todos os dados estão corretor e submeta a criação da instância clicando no botão “Submit;”

{% include image.html post=page.path file="image9.png" %}

Utilize a ferramenta de terminal da sua escolha e acesse remotamente a instância.

{% include image.html post=page.path file="image10.png" %}

# Instalação do Bacula 

## Baixar e importar a chave GCP para uso dos pacotes assinados do Bacula Community

```bash
cd /tmp
wget https://www.bacula.org/downloads/Bacula-4096-Distribution-Verification-key.asc
rpm --import Bacula-4096-Distribution-Verification-key.asc
rm Bacula-4096-Distribution-Verification-key.asc
```

## Configurar o repositório do Bacula

Crie o arquivo /etc/yum.repos.d/Bacula.repo e insira as linhas abaixo: 

```bash
[Bacula-Community]
name=CentOS - Bacula - Community
baseurl=http://www.bacula.org/packages/@access-key@/rpms/@bacula-version@/el7/x86_64/
enabled=1
protect=0
gpgcheck=1
gpgkey=http://www.bacula.org/downloads/Bacula-4096-Distribution-Verification-key.asc
```

## Instalar os pacotes de requisitos para o Bacula:

```bash
yum update
yum install postgresql-server -y
postgresql-setup initdb
systemctl enable postgresql.service
```

## Instalar os pacotes do bacula: 

```bash
yum install bacula-postgresql -y
```

## Configuração do Banco de dados do Bacula: 

```bash
systemctl start postgresql.service

su - postgres
/opt/bacula/scripts/create_postgresql_database
/opt/bacula/scripts/make_postgresql_tables
/opt/bacula/scripts/grant_postgresql_privileges
exit

systemctl start bacula-fd.service
systemctl start bacula-sd.service
systemctl start bacula-dir.service
gpasswd -a bacula tape
```

## Instalação do plugin deduplicação com sistema ZFS: 

```bash
yum install bacula-aligned -y
```

## Teste do funcionamento do servidor Bacula: 

```bash
/opt/bacula/bin/bacula-dir running as user bacula
/opt/bacula/bin/bacula-sd running as user bacula
/opt/bacula/bin/bacula-fd running as user root
sudo -u bacula /opt/bacula/bin/bconsole
run job=BackupCatalog
messages
```

{% include image.html post=page.path file="image11.png" %}

```bash
status dir
```

{% include image.html post=page.path file="image12.png" %}

```bash
exit
```

# Configuração armazenamento backup OBS

## Instalação do plugin para armazenamento em cloud

```bash
yum install bacula-cloud-storage -y
```

## Criação do bucket que irá receber os dados do servidor do Bacula:

### Acesso o serviço OBS na console da Huawei Cloud

{% include image.html post=page.path file="image13.png" %}

### Clique no botão “Create Bucket”

{% include image.html post=page.path file="image14.png" %}

Selecione a região do bucket, o nome do bucket (lembre-se que deve ser único por região), selecione o tipo (deve ser utilizado o tipo Standard), Política do Bucket (recomendado “Private”), habilite a encriptação, selecione o projeto, adicione uma tag caso deseje, depois clique no botão “Create Now”

{% include image.html post=page.path file="image15.png" %}

Crie uma política com permissão apenas para serviço de OBS usando serviço de IAM da Huawei Cloud (Qualquer dúvida consulte o tutorial de Criação de Usuário, Grupo e Política)

Crie uma usuário programático aplicando a política criada anteriormente e faça o download do AK/SK para utilizar na configuração no servidor bacula (Qualquer dúvida consulte o tutorial de Criação de Usuário, Grupo e Política)

Abra o arquivo bacula-sd.conf (/opt/bacula/etc/bacula-sd.conf) e acrescente as seguintes linhas(lembre-de de adaptar aos nomes e configurações que realizou):

```ini
Device {
  Name = "huawei-dev1"
  MediaType = "obs"
  DeviceType = "Cloud"
  ArchiveDevice = "/var/lib/bacula"
  AutomaticMount = yes
  LabelMedia = yes
  MaximumFileSize = 20000000
  Cloud = "huawei"
}

Cloud {
  Name = "huawei"
  Driver = "S3"
  HostName = "obs.la-south-2.myhuaweicloud.com"
  BucketName = "testbackupbacula"
  AccessKey = "-----------"
  SecretKey = "-----------"
  TruncateCache = "AfterUpload"
  Upload = "EachPart"
}
```

Abra o arquivo bacula-dir.conf (/opt/bacula/etc/bacula-dir.conf) e acrescente as seguintes linhas(lembre-de de adaptar aos nomes e configurações que realizou):

```ini
# Scratch pool definition
Pool {
  Name = Scratch
  Pool Type = Backup
}

Pool {
  Name = "huaweipool"
  Description = ""
  PoolType = "Backup"
  LabelFormat = "obs-"
  LabelType = "Bacula"
  MaximumVolumes = 100
  MaximumVolumeBytes = 53687091200
  VolumeRetention = 31536000
  Storage = "huawei"
  AutoPrune = yes
  Recycle = yes
  Catalog = "MyCatalog"
}


#
# Restricted console used by tray-monitor to get the status of the director
#
Console {
  Name = bacula-mon
  Password = "---------"
  CommandACL = status, .status
}
```

**Obs.:** Está senha Password = "--------" você encontra dentro da configuração já existente no arquivo bacula-sd.conf

Crie a pasta /var/lib/bacula e a pasta /var/lib/bacula/obs-0002 caso ela não exista e de permissão de acesso para o usuário do bacula.

```bash
mkdir /var/lib/bacula
mkdir /var/lib/bacula/obs-0002
chmod 775 /var/lib/bacula
chmod 775 /var/lib/bacula/obs-002
chown bacula:bacula /var/lib/bacula
chown bacula:bacula /var/lib/bacula/obs-0002
```

**Obs.:** Utilizamos essa pasta que o próprio bacula requisita, porém
está pasta é o local aonde o servidor vai armazenar os arquivos antes
que são gerados antes de serem encaminhados para nuvem (depois eles são
removidos), o recomendado nesses casos é que crie um disco dedicado para
isso (para evitar que fique cheio e pare o servidor) e que tenha um
volume que suporte suas rotinas de backup e que seja mais fácil ampliar
o tamanho caso necessário.

Revise todas as configurações se estão condizentes com os valores adicionados para configuração da nuvem, pode ser necessário revisar itens já existentes no arquivo original para estar de acordo com os novos parâmetros de nuvem, depois disso reinicie o serviço do bacula e faça reload dentro do serviço bconsole. 

**Obs.:** Em alguns casos pode ser melhor reiniciar o servidor para aplicar as alterações que realizou.

Teste a rotina de backup com o comando abaixo depois do comando digite m e de Enter para ver as mensagens até que aparece “You have no messages”.

```bash
sudo -u bacula /opt/bacula/bin/bconsole
run job=BackupCatalog level=Full yes pool=huaweipool
m

exit
```

Se o teste for bem sucedido irá aparecer tela como mostrado abaixo, quando isso ocorrer pode ir até o seu bucket na nuvem que conseguirá ver novos arquivos referente a rotina de backup que realizou. Caso receba mensagem de erro revise a configuração do arquivo sd e dir faça o restart do serviço e reload no bacula e teste novamente.

{% include image.html post=page.path file="image16.png" %}

{% include image.html post=page.path file="image17.png" %}