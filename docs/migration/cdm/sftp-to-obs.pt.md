---
title: SFTP para OBS
layout: default
parent: Cloud Data Migration (CDM)
grand_parent: Migração
lang: pt
permalink: /docs/migration/cdm/sftp-to-obs
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# SFTP para OBS usando CDM

V1.0 – Julho 2023

| **Versão**        | **Autor**                   | **Descrição**         |
| ----------------- | ------------------------    | --------------------- |
| V1.0 – 2023-07-20 | Rodolfo Carvalho 50032519   | Versão Inicial        |
| V1.0 – 2023-07-20 | Gabriel Gutierrez g00817435 | Revisão do Documento  |

# CRIANDO O ECS E CONFIGURANDO O USUÁRIO SFTP

## Criando o ECS

O ECS é um serviço de computação oferecido pela Huawei Cloud, portanto, é
necessário efetuar login no console e solicitar os serviços que fazem o
ECS funcionar de forma eficiente e segura.

- Os serviços de rede são essenciais para o bom funcionamento do ECS. Primeiro,
escolha uma VPC e uma sub-rede para vincular uma identificação privada do ECS
e os serviços básicos de rede, como broadcast e DNS. Em seguida, um EIP
deve ser alocado para conexão com a internet. Crie um grupo de segurança
personalizado para proteger o acesso ao ECS;

- Neste exemplo, será utilizado o servidor Ubuntu 22.04 de 64 bits.

## Verificando o SSH

O protocolo SSH permite uma conexão de rede segura no protocolo TCP/IP;
SFTP é um protocolo de extensão do SSH para transferência de arquivos. Portanto, para
criar um usuário SFTP em uma máquina, é necessário instalar ou atualizar
o SSH, habilitá-lo e iniciá-lo.

- Para verificar se o protocolo SSH está instalado e a versão, use o
comando:
ssh -V. A imagem 1 mostra que o SSH já está instalado.

{% include image.html post=page.path file="image3.png" %}

- Se a instalação for necessária, use: sudo apt install ssh -y

- Para habilitar o SSH: sudo systemctl enable ssh

- Para iniciar o SSH, use: sudo systemctl start ssh

- Verifique o status do SSH usando: sudo systemctl status ssh. Observe
se o status mostrar ativo (em execução). O SSH deve estar ativo, como mostra a imagem 2.

{% include image.html post=page.path file="image4.png" %}

## Criando Grupo e Usuário SFTP

Grupos são métodos para concatenar usuários com as mesmas permissões e
limitações, melhorando a segurança e a organização.

- Crie um grupo SFTP e escolha um nome para ele. Neste caso, o nome escolhido
é “sftp”: sudo addgroup sftp

- Crie o usuário. Neste caso, o nome escolhido é “rodolfo”: sudo
useradd rodolfo

- É possível confirmar a criação do usuário e o diretório home, usando:
less /etc/passwd \| grep rodolfo. O resultado mostra o caminho de
“Rodolfo” no arquivo “passwd”, portanto, o usuário foi criado (como mostra
a imagem 3)

{% include image.html post=page.path file="image5.png" %}

- Defina uma senha para o usuário: sudo passwd rodolfo

- Adicione o usuário ao grupo “sftp”: sudo usermod -a -G sftp rodolfo

- Para verificar se o usuário foi adicionado com sucesso, use o seguinte
comando: grep sftp /etc/group (como mostrado na imagem 4)

{% include image.html post=page.path file="image6.png" %}

## Definindo Permissões

É importante definir permissões e limitações para o usuário. Dessa
forma, quando um cliente se conectar a ele, ele não poderá acessar
o conteúdo de todo o servidor, apenas os dados dentro da pasta raiz SFTP
associada ao usuário.

- Crie um diretório de acesso de usuário chamado "Documento": sudo mkdir -p
/var/sftp/Documento

- Garanta que os diretórios "/var/sftp" estejam sob a propriedade do
usuário root e do grupo de usuários: sudo chown root:root /var/sftp

- Configure as permissões de proprietário, grupo e outros para o grupo "sftp"
usando: sudo chmod 755 /var/sftp. Este comando garante que
o proprietário tenha permissão total e que o grupo e outros tenham apenas permissões de leitura e
execução.

- Permita que o usuário "rodolfo" tenha acesso apenas à pasta "Documento":
sudo chown rodolfo:rodolfo /var/sftp/Documento

- Altere a configuração SSH para definir as permissões do usuário. Para isso, é
necessário alterar o arquivo "/etc/ssh/sshd_config" e adicionar estas linhas:

- Correspondência do usuário rodolfo: especifica para qual usuário essas alterações se aplicam;

- ChrootDirectory /var/sftp: o usuário fica restrito ao diretório “/var/sftp”;

- X11 Forwarding no: o acesso a aplicativos gráficos e
o encaminhamento é desabilitado;

- AllowTcpForwarding no: desabilita o tunelamento para melhorar a segurança;

- ForceCommand internal-sftp: a conexão SSH será estabelecida
somente após o login

{% include image.html post=page.path file="image7.png" %}

- Reinicie o serviço SSH: sudo systemctl restart ssh

- A parte final é verificar a configuração do usuário, usando o IP do host
para entrar no diretório do usuário: sftp rodolfo@{IP}

- Por fim, verifique se a pasta "Documento" pode ser visualizada usando o comando: ls

## Verificando se a conexão SFTP pode ser estabelecida

A parte final é verificar se a conexão SFTP pode ser estabelecida e
os arquivos podem ser transferidos. Para isso, o cliente FileZilla será usado.

- Baixe e instale o cliente do FileZilla em uma máquina remota:
<https://filezilla-project.org/>

- Adicione uma regra de Grupo de Segurança de Entrada relacionada à porta SFTP (número
22), usando o endereço IP público da máquina remota. O IP público
pode ser obtido neste site: https://ip4.me/

- Abra o FileZilla e acesse "Open Site Manager" (no canto superior esquerdo). Insira o endereço IP público do ECS, nome de usuário, porta=22, "SFTP" como
tipo de conexão e senha do usuário. Se a conexão for bem-sucedida,
uma mensagem como a da Imagem 6 será exibida;

{% include image.html post=page.path file="image8.png" %}

- Se a conexão for bem-sucedida, o diretório do usuário estará
acessível no FileZilla e será possível fazer upload e download de arquivos
e diretórios.

# BALDE OBS

## Criar um balde OBS

O Serviço de Armazenamento de Objetos é um Serviço de Nuvem da Huawei que permite o armazenamento
de tipo objeto, portanto, os dados serão armazenados em um balde criado no
console OBS. É necessário criar um balde e um diretório dentro
dele para armazenar os arquivos após o processo de vinculação.

- Faça login no Huawei Cloud Console. No canto superior esquerdo, abra a aba de serviços
e procure por Serviço de Armazenamento de Objetos. No canto superior direito, clique em
“Criar Bucket”;

- Escolha a Região do bucket. Neste caso, a região escolhida é
Santiago;

- Escolha um nome para o bucket, de preferência relacionado ao serviço. Neste
caso, o nome escolhido foi “sftp_obs”;

- Use “Padrão” como Classe de Armazenamento Padrão

- Use “Privado” como Política de Bucket

- Defina a Criptografia de Serviço como “desativada”

# USANDO O CDM PARA MIGRAR

## Criando uma Instância do CDM

O Cloud Data Migration é um serviço de nuvem da Huawei usado para migrar
tipos de dados homogêneos ou heterogêneos de forma fácil e confiável de
uma fonte de dados para outra.

- Acesse o Huawei Cloud Console. No canto superior esquerdo, abra a aba de serviços
e procure por CDM ou Cloud Data Migration. No canto superior direito, clique
em “Comprar Cluster CDM”;

- Escolha um nome de acordo com o processo desejado. Neste caso, o
Cluster criado é “cdm_sftp”;

- Escolha a variante com base nas necessidades computacionais;

- A rede é a parte mais importante. Existem quatro situações:

- O cluster CDM e o serviço Huawei Cloud estão na mesma região,
VPC, sub-rede e grupo de segurança, portanto, podem se conectar
livremente, sem especificações de roteamento e segurança;

- Se estiverem na mesma Região e VPC, mas em sub-redes ou
grupos de segurança diferentes, as regras de roteamento e grupo de segurança devem ser
estabelecidas;

- Se estiverem na mesma Região, mas em VPCs diferentes, uma conexão
de peering é necessária;

- Se estiverem em Regiões diferentes, a conexão com a Internet ou a Conexão Direta devem ser estabelecidas;

- Basta confirmar as informações na próxima etapa e enviar;

- O cluster CDM criado aparecerá na página Gerenciamento de Cluster como
Imagem 7 mostra;

{% include image.html post=page.path file="image9.png" %}

## Vinculando ambas as extremidades com o CDM

A vinculação é o processo de estabelecer uma conexão CDM e identificar
as configurações dos serviços cujos dados serão migrados.

### Criando um Link SFTP

- No gerenciamento de cluster, localize o CDM desejado e clique em Gerenciamento de Tarefas (Imagem 8);

{% include image.html post=page.path file="image10.png" %}

- Clique em “Links” e escolha “Criar Link” (Imagem 9);

{% include image.html post=page.path file="image11.png" %}

- Escolha o tipo de serviço. Neste caso, encontre o tipo “SFTP” e clique em
“Avançar”;

- Escolha um nome de acordo com o serviço desejado. Neste caso:
“sftp_link”;

- Insira o endereço IP do host;

- O número da porta é definido pelo tipo de serviço. Neste caso, o
serviço é SFTP, portanto, a porta SFTP é 22;

- Configure o nome de usuário e a senha;

- Teste a conexão e clique em “Salvar”;

{% include image.html post=page.path file="image12.png" %}

### Criando o link OBS

- Siga os dois primeiros passos do link SFTP e escolha o Serviço de Armazenamento de Objetos
;

- Escolha o nome correspondente. Neste caso: “obs_link_sftp”;

- Selecione o endpoint do objeto:

- Acesse a página do console do OBS e encontre o bucket desejado;

- Clique na barra, não no nome do OBS. Esta ação exibirá a
aba Informações Básicas, onde é possível encontrar o endpoint
;

- Selecione a porta correspondente à conexão desejada;

- Obtenha as chaves AK/SK com acesso ao bucket do OBS e configure nesta etapa;

- Teste a conexão e clique em “Salvar”;

{% include image.html post=page.path file="image13.png" %}

Após a criação, os serviços aparecerão na aba Links, conforme mostrado na
Imagem 12

{% include image.html post=page.path file="image14.png" %}

## Criando uma Tarefa

A tarefa conecta os links do CDM e descreve como a migração se comportará
da origem para o CDM e do CDM para o destino.

- Em Gerenciamento de Tarefas, selecione Migração de Tabela/Arquivo, já que apenas alguns
diretórios dentro do SFTP serão migrados (Imagem 13);

{% include image.html post=page.path file="image15.png" %}

- Selecione os links CDM de origem e destino. Neste caso,
a origem é "sftp_link" e o destino é "obs_link_sftp";

- Selecione o diretório ou arquivo dentro do sftp_link para encaminhar os dados. Neste
caso, a pasta "Document" dentro do rodolfo;

- Escolha o bucket desejado e um diretório de destino desejado. Neste
caso, coloque Document ou sftp;

{% include image.html post=page.path file="image16.png" %}

- Se não houver nenhuma configuração avançada específica, escolha Avançar;

- Configure a execução agendada para verificar as alterações na origem e
atualizar no bucket de destino. Neste caso, o ciclo de tempo escolhido
é de 5 minutos, para ser executado por 24 horas (Imagem 15);

{% include image.html post=page.path file="image17.png" %}

- Se o serviço for criado corretamente, ele aparecerá na aba Migração de Tabela/Arquivo. Selecione Executar e veja se o Status da Migração muda para
Sucesso (Imagem 12);

{% include image.html post=page.path file="image18.png" %}

# Referências

Instalando SSH e Configurando Usuário SFTP no Ubuntu Server 22.04:
<https://itslinuxfoss.com/install-set-up-sftp-server-ubuntu-22-04/>

Migração de Dados em Nuvem\> Visão Geral do Serviço\> O que é CDM?

<https://support.huaweicloud.com/intl/en-us/productdesc-cdm/cdm_01_0143.html>

Migração de Dados na Nuvem\> Guia do Usuário\> Gerenciando Links\> Criando Links

<https://support.huaweicloud.com/intl/en-us/usermanual-cdm/cdm_01_0023.html>

Migração de Dados na Nuvem\> Guia do Usuário\> Gerenciando Tarefas\> Tarefa de Origem
Parâmetros\> De FTP/SFTP

<https://support.huaweicloud.com/intl/en-us/usermanual-cdm/cdm_01_0039.html>

Migração de Dados na Nuvem\> Guia do Usuário\> Gerenciando Tarefas\> Tarefa de Destino
Parâmetros\> Para OBS

<https://support.huaweicloud.com/intl/en-us/usermanual-cdm/cdm_01_0044.html>

Migração de Dados na Nuvem\> Guia do Usuário\> Gerenciando Tarefas

<https://support.huaweicloud.com/intl/en-us/usermanual-cdm/cdm_01_0032.html>