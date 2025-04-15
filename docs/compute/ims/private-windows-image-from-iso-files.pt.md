---
title: Criando uma Imagem Privada do Windows
layout: default
parent: Image Management Service (IMS)
grand_parent: Computação
lang: pt
permalink: /docs/compute/ims/creating-a-private-windows-image
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Criando uma Imagem Privada do Windows

V1.0 – Janeiro 2024

| **Versão**        | **Autor**             | **Descrição**        |
| ----------------- | --------------------- | -------------------- |
| V1.0 – 2024-01-02 | Diogo Hatz 50037923   | Versão Inicial       |
| V1.0 – 2024-01-02 | Wisley Paulo 00830850 | Revisão do Documento |

# Introdução

O Image Management Service (IMS) é um serviço disponibilizado na Huawei
Cloud que permite a administração de imagens. Imagens são nada mais que
servidores em cloud ou templates de disco que contêm um sistema
operacional (SO), dados de serviço ou software.

Este documento tem como finalidade discorrer o passo-a-passo de como
fazer a criação de imagens personalizadas no IMS na Huawei Cloud a
partir de arquivos ISO externos à Huawei Cloud.

# Preparação da ISO

A fim de prover as instâncias geradas a partir do arquivo ISO com acesso
à internet e às demais funcionalidades de uma VM, faz-se necessária a
instalação de drivers do VMTools nessas instâncias. Para isso, o driver
do VMTools será integrado ao arquivo ISO desejado por meio do software
AnyBurn, que pode ser baixado através do seguinte hyperlink:
<http://www.anyburn.com/index.htm>.

Ademais, o pacote de drivers do VMTools pode ser baixado através do
seguinte link:
<https://ecs-instance-driver.obs.cn-north-1.myhuaweicloud.com/vmtools-windows.zip>.

Após instalar o AnyBurn e extrair os arquivos do pacote de drivers do
VMTools do arquivo “vmtools-windows.zip”, abra o software instalado do
AnyBurn e clique em “Browse/Extract image file”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image3.png)

Selecione o diretório da pasta “vmtools-windows” e selecione o arquivo
“vmtools-windows.iso”. Clique em “Next” duas vezes.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image4.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image5.png)

Selecione o diretório para onde os arquivos da iso serão extraídos. Como
sugestão, selecione a pasta “vmtools-windows” previamente extraída e
clique em “Next”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image6.png)

Volte ao menu inicial do software AnyBurn e selecione a opção “Edit
image file”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image7.png)

Selecione o diretório da iso da imagem a ser criada e clique em “Next”.
Neste caso, o arquivo selecionado será a iso do Windows server 2019.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image8.png)

Selecione a opção “More” e clique em “New Folder”. Nomeie a pasta como
“vmtools-windows”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image9.png)

Clique na pasta criada e em “Add+”. Selecione os quatro arquivos
extraídos da iso “vmtools-windows.iso” e clique em “Next” e
posteriormente em “Create now”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image10.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image11.png)

Aguarde até que a barra de progresso chegue ao fim.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image12.png)

# Upload da ISO

Para realizar o upload da ISO da instância a ser criada, o serviço de
storage OBS será utilizado. Acesse o console da Huawei Cloud e vá até a
seção do OBS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image13.png)

Caso o aplicativo OBS Browser + não esteja instalado em seu computador,
leia a seção 3.1. Caso contrário, pule para a seção 3.2.

## OBS Browser +

Dentro do OBS, clique em “Download” no ícone representando o OBS Browser
+. Baixe e instale o software do OBS Browser +.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image14.png)

Retorne ao console da Huawei Cloud, coloque o mouse em cima do seu ID da
Huawei Cloud e clique em “My Credentials”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image15.png)

Clique em “Access Keys”, “Create Access Keys”, “Ok” e “Download”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image16.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image18.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image19.png)

## Upload da ISO no bucket

Na seção do OBS dentro do console da Huawei Cloud, clique em “Create
Bucket”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image20.png)

Dê um nome para o bucket e selecione “Standard” em “Default Storage
Class”. Esta configuração é importe, tendo em vista que se outra opção
de classe for selecionada haverá um erro ao criar a imagem a partir da
ISO posteriormente.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image21.png)

Clique em “Create Now” para criar o bucket. Abra o aplicativo OBS
Browser + e insira as informações para acesso conforme pedidas na seção
“AK Login”. Nos campos “Access Key ID” e “Secret Access Key”, insira
os dados gerados na seção 3.1. Em “Service”, selecione “HUAWEI CLOUD OBS
(default)”. Em “Access Path” insira “obs://” seguido do nome do bucket
criado. Neste exemplo, o caminho será “obs://ims-iso-tutorial”. Clique
em “Log In”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image22.png)

Clique em Upload

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image23.png)

Selecione a opção “Standard” em “Storage Class” e em “Add File” para
adicionar a iso da instância a ser criada. Neste caso, a iso do Windows
Server 2019. Aguarde até que o upload seja concluído para seguir para as
próximas etapas.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image24.png)

# Criação da imagem no IMS

Acesse o console da Huawei Cloud e vá até a seção do IMS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image25.png)

Vá até a seção de “Private Images” e clique em “Create Now”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image26.png)

Configure os parâmetros de acordo com a imagem da instância que será
criada. Neste caso, o OS do Windows Server 2019 Standard.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image27.png)

Para imagens Windows, selecione a opção “Bring your own license (BYOL)”.
Clique em “Next” após configurar todos os campos.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image28.png)

Verifique se as informações estão corretas e clique em “Submit”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image29.png)

Aguarde até que a imagem da ISO seja criada e clique em “Create ECS”
para criar uma instância da imagem gerada.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image30.png)

Configure as informações necessárias para a criação da ECS e clique em
“OK” para criar a ECS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image31.png)

As próximas etapas serão importantes para configurar a imagem com os
softwares e configurações necessárias para o bom funcionamento das
instâncias criadas a partir dessa imagem.

# Instalação do SO

Acesse o console da Huawei Cloud e vá até a seção relativa ao serviço
ECS. Clique em “Remote Login” para acessar remotamente a instância
criada na etapa 4 deste documento.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image32.png)

Configure o idioma do sistema e clique em “Next” e “Install now”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image33.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image34.png)

Selecione a versão do SO a ser instalado, verifique que a opção contém
“Desktop Experience” para que uma interface gráfica seja instalada
junto ao sistema, caso desejado, e clique em “Next”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image35.png)

Aceite os termos e clique em “Next”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image36.png)

Selecione a opção “Custom: Install Windows only (advanced)”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image37.png)

Clique em “Load driver” e em “Browse”. Selecione o seguinte caminho:
“C:vmtools-windows/upgrade/**sua-versão-do-SO**/drivers/viostor”.

**Nota: Para o Windows Server 2019 e 2022, selecione o driver relativo
ao Windows Server 2016.**

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image38.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image39.png)

Clique em “Next” duas vezes seguidas e aguarde a instalação do Windows.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image40.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image41.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image42.png)

Configure uma senha para o perfil de Administrador do Windows e clique
em “Finish” para finalizar a instalação do Windows.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image43.png)

Acesse o desktop do Windows, abra o explorador de arquivos e vá até a
unidade ejetável. Abra a pasta “vmtools-windows” e instale o software
“setup”, que corresponde aos drivers do VMTools.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image44.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image45.png)

Reinicie o computador quando pedido.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image46.png)

# Configuração da ECS

## EIP

Para disponibilizar o acesso à internet para a ECS, faz-se necessário
atrelar um EIP à ECS. Para isso, clique em “More” ao lado da ECS
desejada na seção ECS do console da Huawei Cloud, “Manage Network” e
“Bind EIP”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image47.png)

Caso nenhum EIP esteja disponível, compre um EIP clicando em “Buy EIP”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image48.png)

Clique em “Buy EIP novamente”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image49.png)

Selecione os parâmetros do EIP que será atrelado à ECS, como a sua
largura de banda e clique em “Next” e “Submit”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image50.png)

Selecione o EIP comprado para ser atrelado à ECS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image51.png)

Caso seja desejado que as atualizações do sistema sejam instaladas, siga
para a seção 6.2. Caso contrário, pule para a seção 6.3. **Aviso: É
importante que as atualizações do sistema sejam feitas antes de qualquer
outra configuração no sistema caso optado.**

## Atualização do sistema

Para atualizar o sistema, clique no Windows Search, digite “update” e
clique em “Check for updates”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image52.png)

Clique em “Check for updates” novamente e espere até que todas as
atualizações sejam feitas. A ECS poderá ser reiniciada algumas vezes
nesse processo.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image53.png)

## Gpedit.msc

Clique no Windows Search e digite “gpedit.msc” para abrir o editor de
políticas do grupo local.

### Server Manager

Navegue até “Computer Configuration \> Administrative Templates \>
System \> Server Manager”. Clique duas vezes em “Do not display Server
Manager automatically at logon” e selecione “Enabled” para evitar com
que o Server Manager seja aberto automaticamente ao iniciar a instância.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image54.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image55.png)

### Shut down

Navegue até “Computer Configuration \> Windows Settings \> Security
Settings \> User Rights Assignment“ e clique duas vezes na opção “Shut
down the system”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image56.png)

Clique em “Add User or Group”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image57.png)

Clique em “Object Types”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image58.png)

Habilite a opção “Groups” e clique em “OK”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image59.png)

Em “Enter the object names to select”, escreva “Users” e clique na tecla
Enter. Clique “OK”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image60.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image61.png)

### Firewall

Navegue até “Computer Configuration \> Network \> Network Connections \>
Domain Profile”, clique duas vezes em “Windows Firewall: Protect all
network connections” e selecione a opção “Disabled”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image62.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image63.png)

Navegue até “Computer Configuration \> Network \> Network Connections \>
Standard Profile”, clique duas vezes em “Windows Firewall: Protect all
network connections” e selecione a opção “Disabled”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image64.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image65.png)

## Services

**Nota: Para o Windows Server 2019, ignore a seção 6.4.**

Clique no Windows Search e digite “services” para abrir a janela
relativa à administração dos serviços do Windows.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image66.png)

Navegue até “Windows Firewall” e clique duas vezes. Em “Startup type”
selecione “Disabled”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image67.png)

## DHCP

Cheque se os NICs da instância estão configuradas como DHCP. Para isso,
navegue até o “Control Panel” através do Windows Search, vá até “Network
and Internet Connections”, clique em ”Network and Sharing Center”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image68.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image69.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image70.png)

Clique no adaptador de rede disponível em sua instância e em
“Properties”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image71.png)

Selecione o protocolo de rede utilizado pela instância, neste caso IPv4,
e clique em “Properties”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image72.png)

Cheque se para ambas as opções a alternativa habilitada é relativa a
obter o endereço IP e DNS automaticamente. Clique em “Ok” para salvar.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image73.png)

## Remote Desktop

Para habilitar o acesso remoto à instância, abra o Windows Search e
digite “Allow remote access to your computer”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image74.png)

Habilite a opção “Allow remote connections to this computer” e clique em
“OK” para confirmar a mudança feita.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image75.png)

Cheque se o firewall do Windows permite a entrada e saída de tráfego do
serviço de acesso remoto navegando até Windows Firewall

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image76.png)

Clique em “Allow an app or feature through Windows Defender Firewall”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image77.png)

Habilite o acesso remoto pelo firewall habilitando as opções do serviço
“Remote Desktop".

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image78.png)

## PV Driver

O PV Driver é responsável por fazer a gestão de instâncias com a
virtualização Xen. Por mais que esse tipo de tecnologia de virtualização
tenha sido descontinuado na Huawei Cloud, ainda é importante que os
drivers sejam instalados. Baixe-os através do seguinte link na
instância:
<https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0317.html>.
Extraia o arquivo baixado e abra o instalador “pvdriver-win”. Aceite os
termos de serviço e clique em “Install”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image79.png)

Clique em “Finish” após a instalação terminar.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image80.png)

## One-click reset password plugin

Este plugin permite que a senha da instância seja resetada através do
console da Huawei Cloud. Para instalá-lo, baixe-o através do seguinte
link na instância :
<https://cn-north-1-cloud-reset-pwd.obs.cn-north-1.myhuaweicloud.com/windows/reset_pwd_agent/CloudResetPwdAgent.zip>.
Extraia o arquivo “CloudResetPwdAgent.zip” baixado. Antes de instalá-lo,
no entanto, a porta 80 precisa ser habilitada no security group da ECS
para que a instalação ocorra com sucesso.

Navegue até o console da Huawei Cloud e vá para a seção ECS.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image81.png)

Em “Network and Security”, clique em “Security Groups”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image82.png)

Selecione o security group a que a instância da ECS está atrelada.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image83.png)

Em “Outbound Rules”, adicione a regra para permitir o acesso ao
protocolo TCP à porta 80 do seguinte destino: “169.254.0.0/16”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image84.png)

Retorne à ECS e execute o arquivo “Setup” presenta na pasta extraída
previamente.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image85.png)

Para verificar a instalação com sucesso do plugin, abra o gerenciador de
tarefas na seção de serviços e cheque se o serviço “cloudResetPwdAgent”
está presente.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image86.png)

## Cloudbase-Init

O cloudbase-init é um importante software que realiza a gestão de
máquinas virtuais. Para baixa-lo, acesse o seguinte link através do
navegador da ECS:
<https://www.cloudbase.it/downloads/CloudbaseInitSetup_Stable_x64.msi>.

Após baixá-lo, abra o instalador “CloudbaseInitSetup” e clique em “Next”
três vezes consecutivas até a tela de configurações dos usuários
aparecer.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image87.png)

Configure o “Username” como “Administrator” e selecione “COM1” na opção
“Serial port for logging”. Clique em “Next” para avançar e em
“Install” para instalar o software.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image88.png)

Ao fim, desabilite as duas opções disponíveis e clique em “Finish”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image89.png)

Por último, o cloudbase-init precisa ser configurado. Navegue até o
seguinte caminho: “C:\\Program Files\\Cloudbase
Solutions\\Cloudbase-Init\\conf” e abra o arquivo “cloudbase-init.conf”
através do bloco de notas.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image90.png)

Adicione as seguintes configurações ao final do arquivo:

```shell
netbios_host_name_compatibility=false 
metadata_services=cloudbaseinit.metadata.services.httpservice.HttpService
plugins=cloudbaseinit.plugins.common.localscripts.LocalScriptsPlugin,cloudbaseinit.plugins.common.mtu.MTUPlugin,cloudbaseinit.plugins.windows.createuser.CreateUserPlugin,cloudbaseinit.plugins.common.setuserpassword.SetUserPasswordPlugin,cloudbaseinit.plugins.common.sshpublickeys.SetUserSSHPublicKeysPlugin,cloudbaseinit.plugins.common.sethostname.SetHostNamePlugin,cloudbaseinit.plugins.windows.extendvolumes.ExtendVolumesPlugin,cloudbaseinit.plugins.common.userdata.UserDataPlugin,cloudbaseinit.plugins.windows.licensing.WindowsLicensingPlugin
first_logon_behaviour=no
```

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image91.png)

Opcionalmente, adicione também as seguintes configurações:

```shell
plugins=cloudbaseinit.plugins.windows.winrmlistener.ConfigWinRMListenerPlugin,cloudbaseinit.plugins.windows.winrmcertificateauth.ConfigWinRMCertificateAuthPlugin
retry_count=40
retry_count_interval=5
real_time_clock_utc=true
[openstack]
add_metadata_private_ip_route=False
```

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image92.png)

Para melhor compreensão do funcionamento de cada uma das configurações
aqui realizadas, consulte a documentação oficial do IMS no seguinte
link:
<https://support.huaweicloud.com/intl/en-us/usermanual-ims/en-us_topic_0030730602.html>.

Abra o cmd do Windows para limpar o endereço DHCP configurado
atualmente. Esta etapa limitará o acesso à internet da instância até que
ela seja reiniciada. Abra o Windows Search e digite “cmd”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image93.png)

Digite o seguinte comando: “ipconfig /release”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image94.png)

Ademais, digite a seguinte sequência de comandos: “diskpart” e “san
policy=onlineall”. Cheque se a configuração foi aplicada digitando o
comando “san”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image95.png)

Digite “exit” duas vezes consecutivas para sair do cmd. Reinicie a
instância para que a instância retome o acesso à internet. Note que ao
fazer o login na conta de Administrator, a ECS reiniciará
automaticamente. Após a segunda reinicialização, você perceberá que a
senha outrora configurada não mais funciona no perfil de administrador.
Isso se dá pela instalação do cloudbase-init, que irá aleatorizar a
senha do perfil após a primeira reinicialização do sistema depois de sua
instalação. Para configurar a senha novamente, vá até o console da
Huawei Cloud na seção ECS, clique em “More” e “Reset password” ao lado
da instância desejada.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image96.png)

Defina a senha novamente, habilite a caixa de “Auto Restart” e clique em
“OK”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image97.png)

Após a reinicialização automática da instância, é notório como a senha
do perfil Administrator foi trocada pela senha definida no console.
Agora realize as demais configurações desejadas na ECS para gerar a
imagem final da instância.

# Criação da imagem

Após realizar todos os ajustes acima e os escolhidos por você, navegue
até a seção ECS no console da Huawei Cloud, clique em “More” ao lado da
instância desejada e clique em “Stop” para desligar a instância.
Selecione “Yes”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image98.png)

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image99.png)

Navegue até a seção IMS no console da Huawei Cloud

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image100.png)

Clique em “Create Now”, em “Image creation”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image101.png)

Selecione “Create Image” em “Type” e “System disk image” em “Image
Type”. Selecione a ECS desejada, dê um nome para a imagem e clique em
“Next”, após selecionar a caixa para aceitar os termos. Clique em
“Submit”.

![](/huaweicloud-knowledge-base/assets/images/IMS-Private-Images-From-ISO/media/image102.png)

Após finalizada a criação da imagem, agora novas instâncias podem ser
criadas a partir do arquivo ISO baixado na etapa 2\!

# Referências:

  - Documentação do IMS: <https://support.huaweicloud.com/intl/en-us/usermanual-ims/ims_01_0220.html>.
  - Documentação do Workspace: <https://support.huaweicloud.com/intl/en-us/usermanual-workspace/workspace_06_0510.html>.
