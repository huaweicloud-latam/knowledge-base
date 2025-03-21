---
title: Integração com Pipelines
layout: default
parent: FunctionGraph
grand_parent: Computação
lang: pt-BR
permalink: /docs/compute/functiongraph/Pipeline Integration
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Integração com Pipelines

V1.0 – Julho 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-07-16 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-07-16 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
integração de uma função do serviço serverless FunctionGraph da Huawei
Cloud rodando uma imagem de container com processos de CI/CD por meio de
pipelines. Desta forma, é possível garantir que a imagem do container da
função do FunctionGraph esteja sempre atualizada.

# Considerações

**<span class="underline">Importante:</span>** Para realizar a
integração do FunctionGraph com pipelines, basta realizar o upload da
imagem atualizada no serviço de repositório de imagens SWR da Huawei
Cloud. No entanto, é mandatório que tanto o nome da imagem quanto a sua
tag sejam iguais às da imagem que originou a função do FunctionGraph,
para garantir que o URL dessa imagem seja igual à configurada na função
no momento de sua criação. Também é possível alterar o URL da imagem
associada à função através da seguinte API:
<https://support.huaweicloud.com/intl/en-us/api-functiongraph/functiongraph_06_0111.html>.

Existem duas abordagens para essa integração: utilizando pipelines do
serviço CodeArts Pipelines da HWC ou utilizando pipelines de serviços
third-party. Ambas abordagens serão exploradas abaixo:

1.  **CodeArts Pipeline:** Na configuração da task de Build, basta
    selecionar a opção “Build Image and Push to SWR”. A imagem será
    buildada e, então, automaticamente publicada no repositório SWR;

2.  **Pipeline third-party:** Na etapa final da pipeline, basta
    adicionar uma ação para realizar o upload da imagem no repositório
    SWR.

# Organização do SWR

Navegue até o serviço SWR no console da Huawei Cloud. Clique na aba
“Organizations” e clique em “Create Organization”. Dê um nome para a
organização e clique em “OK” para confirmar a criação da organização.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image4.png)

# CodeArts

Para realizar a integração de uma função do FunctionGraph com uma
pipeline criada no serviço CodeArts Pipelines da Huawei Cloud, basta
criar uma task de build no CodeArts Build de acordo com o passo-a-passo
abaixo.

## **Service Endpoint**

Navegue até o serviço CodeArts Req no console da Huawei Cloud. Caso essa
seja a primeira vez entrando no serviço, será requisitada a criação de
um projeto do CodeArts. Entre nas configurações do projeto criado do
CodeArts clicando em “Settings” \> “General” \> “Service Endpoints” \>
“Create Endpoint”. Selecione o serviço em que o código-fonte relativo
ao Dockerfile se encontra.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image5.png)

Selecione o tipo de autenticação com o repositório e clique em
“Authorize and Confirm” para fazer a autenticação com o repositório.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image6.png)

## **CodeArts Build**

Criado o endpoint do repositório, navegue até o serviço CodeArts Build e
clique em “Create Task” para criar uma tarefa de Build. Dê um nome para
a tarefa, selecione o tipo de Code Source em que o código-fonte do
Dockerfile se encontrará.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image8.png)

Configure o Service Endpoint criado no item 4.1 deste documento,
selecione o repositório e a branch do repositório e clique em “Next”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image9.png)

Selecione o template de build “Maven and Container” e clique em “OK”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image10.png)

Apague a etapa de build com Maven do processo de build.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image11.png)

Clique na etapa de build “Build Image and Push to SWR”, selecione a
versão do Docker desejada, o repositório da imagem como sendo SWR e a
organização criada no item 3.0 deste documento.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image12.png)

**<span class="underline">Importante:</span>** Para o nome e tag da
imagem, é necessário que ambos sejam fixos, uma vez que as mudanças
relativas à imagem no FunctionGraph somente serão refletidas para
determinado par de nome e tag. Recomenda-se usar a tag latest.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image13.png)

## **CodeArts Pipelines**

Navegue até a seção do serviço CodeArts Pipelines no console da Huawei
Cloud e clique em “Create Pipeline”.
![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image14.png)

Defina um nome para a pipeline, o serviço onde se encontra o
código-fonte do Dockerfile e o endpoint criado no item 4.1 deste
documento.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image15.png)

Configure, também, o repositório em que o código-fonte se encontra e a
sua branch. Clique em “Next” para avançar e selecione o template “Blank
Template”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image16.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image17.png)

Em “Stage\_1”, apague o “New Job” existente e crie um job para Build. Na
configuração do estágio de Build, associe a task criada no item 4.2
deste documento e o repositório em que o código-fonte do Dockerfile se
encontra.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image18.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image19.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image20.png)

Para adicionar um trigger à pipeline, clique em “Task Orchestration”
acima e selecione a opção “Execution Plan”. Selecione o tipo de trigger,
como code commit ou merge request.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image21.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image22.png)

# Pipeline third-party

Para realizar a integração de uma função do FunctionGraph com uma
pipeline third-party, basta realizar o upload da imagem depois do seu
build no repositório SWR da HWC através da adição de uma task do Docker
no estágio final da pipeline, de acordo com os comandos executados
abaixo. Segue a documentação da task “Docker@2” do Docker na Azure como
referência:
<https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/docker-v2?view=azure-pipelines&tabs=yaml>.

## **Obtendo um login permanente no SWR**

### **Gerando uma AK/SK**

Para obter credenciais permanentes de autenticação com o SWR,
primeiramente faça login no console da Huawei Cloud e acesse o serviço
Identity and Access Management (IAM), clique em “User Groups” e então em
“Create User Group”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image23.png)

Dê um nome para o grupo e clique em “OK”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image24.png)

Clique em “Authorize” ao lado do grupo criado, selecione a policy “SWR
Admin”, seguido por “OK” e “Finish”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image25.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image26.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image27.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image28.png)

Agora para criar um novo usuário, clique em “Create User”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image29.png)

Dê um nome para o usuário, desabilite a caixa “Management console
access” e habilite a caixa “Access key”. Clique em “Next” para
avançar, adicione o usuário ao grupo criado acima e então clique em
“Create”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image30.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image31.png)

Clique em “OK” para baixar a chave AK/SK gerada, que será utilizada para
a criação das credencias de autenticação com o Docker posteriormente.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image32.png)

### **Gerando as credenciais do Docker**

Faça login em uma máquina qualquer rodando o sistema operacional Linux e
digite o seguinte comando, substituindo os campos “AK” e “SK” pela chave
AK/SK gerada no item 5.1.1 deste documento.

```shell
printf "AK" | openssl dgst -binary -sha256 -hmac "SK" | od -An -vtx1 |
sed 's/\[ \\n\]//g' | sed 'N;s/\\n//'
```

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image33.png)

Após a execução do comando, uma chave será gerada. Basta substituir a
chave gerada no comando abaixo no campo “Login key” e a AK no campo “AK”
para obter o comando de autenticação do Docker com o repositório SWR.

docker login -u \[Regional project name\]@\[AK\] -p \[Login key\]
\[Image repository address\]

Para a região de Santiago, por exemplo, o “Regional Project Name” é
la-south-2, ao passo em que o “Image repository address” é
swr.la-south-2.myhuaweicloud.com. Segue um exemplo do comando de
autenticação:

```shell
docker login -u la-south-2@RVHVMX\*\*\*\*\*\* -p
cab4ceab4a1545\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
swr.la-south-2.myhuaweicloud.com
```

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image34.png)

## **Fazendo o upload da imagem no SWR**

Feito o login no repositório SWR através do Docker, copie o seguinte
comando, alterando os campos \[image name 1:tag 1\], \[Image repositor
address\], \[Organization name\] e \[Image name 2:tag 2\] de acordo com
a lista abaixo:

  - **\[Image name 1:tag 1\]:** {nome:tag} da imagem que será feito o
    upload;

  - **\[Image repositor address\]:** Domínio do SWR. Pode ser obtido no
    comando de login obtido no item 5.1.2 deste documento;

  - **\[Organization name\]:** Nome da organização criada no item 3.0
    deste documento;

  - **\[Image name 2:tag 2\]:** {nome:tag} da imagem que aparecerá no
    SWR. Similar a uma renomeação, o mesmo nome e tag podem ser
    mantidos.

```shell
docker tag\[Image name 1:tag 1\] \[Image repository
address\]/\[Organization name\]/\[Image name 2:tag 2\]
```

Exemplo:

```shell
docker tag novo:1.0 swr.la-south-2.myhuaweicloud.com/adada/serase
```

Agora bata realizar o upload da imagem com o seguinte comando:

```shell
docker push \[Image repository address\]/\[Organization name\]/\[Image
name 2:tag 2\]
```

Exemplo:

```shell
docker push swr.la-south-2.myhuaweicloud.com/adada/serase
```

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image35.png)

Na página do serviço do SWR no console da HWC é possível ver que a
imagem foi publicada com sucesso no repositório:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image36.png)

## **Criando a task da pipeline**

A task final da pipeline em si consistirá em uma série de comandos
executados no Docker que seguirão o seguinte workflow:

1.  Fazer login no Registry em que a imagem buildada se encontra;

2.  Fazer o pull da imagem do Registry original;

3.  Fazer logout do Registry;

4.  Fazer login no repositório SWR da Huawei;

5.  Associar uma tag à imagem do item 2;

6.  Fazer o push da imagem no repositório SWR da Huawei;

7.  Fazer logout do repositório SWR;

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image37.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image38.png)

# FunctionGraph

Tendo garantido que o nome e tag da imagem publicada no SWR através da
Pipeline for exatamente a mesma que a imagem associada à função no
FunctionGraph, as mudanças feitas na imagem serão refletidas na função
do FunctionGraph.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image39.png)

# Exemplo

Neste exemplo, uma pipeline foi criada para que, toda vez que um commit
for feito na branch master do repositório Teste especificado, a pipeline
será ativada e irá fazer o build da imagem do Docker de acordo com o
Dockerfile no repositório, realizar o upload no repositório SWR da
Huawei Cloud e, por consequência, atualizar a função do FunctionGraph.

Realizando o commit no repositório do GitHub:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image40.png)

Pipeline acionada:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image41.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image42.png)

Build completo, pipeline concluída:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image43.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image44.png)

É possível ver no repositório do SWR que a imagem foi atualizada:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image45.png)

Como a imagem possui o mesmo URL que a imagem associada à função do
FunctionGraph, as mudanças serão refletidas na função desejada.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Pipeline-Integration/media/image39.png)

# Referências

  - Documentação do FunctionGraph:
    <https://support.huaweicloud.com/intl/en-us/api-functiongraph/functiongraph_06_0111.html>.

  - Documentação do SWR:
    <https://support.huaweicloud.com/intl/en-us/usermanual-swr/swr_01_1000.html>.

  - Documentação da Azure Pipeline Tasks:
    <https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/docker-v2?view=azure-pipelines&tabs=yaml>.
