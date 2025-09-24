---
title: Migrando Azure AKS para Huawei CCE
layout: default
parent: Cloud Container Engine (CCE)
grand_parent: Containers
lang: pt
permalink: /docs/containers/cce/migrating-azure-aks-to-huawei-cce
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrando Azure AKS para Huawei CCE

V1.0 – Janeiro 2024

| **Versão**        | **Autor**             | **Descrição**         |
| ----------------- | --------------------- | --------------------- |
| V1.0 – 2024-01-16 | Diogo Hatz 50037923   | Tradução do documento |
| V1.0 – 2024-01-16 | Wisley Paulo 00830850 | Revisão do documento  |

# Migração de cluster Kubernetes de AKS para CCE

## Introdução

Realizar a migração do serviço de Kubernetes AKS, da provedora Microsoft
Azure, para o serviço gerenciado de clusters Cloud Container Engine
(CCE) da Huawei Cloud é uma decisão estratégica que pode empoderar
organizações a refinar a sua estratégia de orquestração de containers em
resposta às crescentes demandas do cenário de cloud. A transição
representa uma oportunidade para otimizar operações, aumentar a
escalabilidade e analisar o ecossistema da Huawei Cloud. Crucialmente, a
jornada de migração é guiada e facilitada pela poderosa ferramenta de
backup e migração de containers Velero, garantindo a integridade dos
dados e minimizando a interrupção dos serviços. Seja a migração motivada
por custo-benefício, o anseio por uma integração suave com os serviços
da Huawei Cloud, ou a jornada por uma maior performance, este guia
oferece um passo-a-passo detalhado para uma transição bem-sucedida,
permitindo que a sua empresa abrace a era cloud-native com confiança,
juntamente com o suporte imensurável da ferramenta Velero.

{% include image.html post=page.path file="image3.png)

## Processo da Operação

Para a migração do serviço Microsoft Azure Kubernetes Service (AKS) para
a Huawei Cloud Container Engine (CCE" %}, uma operação meticulosa foi
executada. Primeiramente, uma análise detalhada foi conduzida para
identificar todos os workloads, configurações e dependências dentro do
cluster AKS. Os recursos necessários foram provisionados dentro da
Huawei CCE, garantindo a compatibilidade e escalabilidade para acomodar
os workloads.

Em seguida, as preparações para a migração dos dados foram realizadas,
incluindo a transferência de imagens do container, volumes persistentes
e arquivos de configuração, tudo resguardado pelo Velero para backup e
restauração confiáveis. A migração por si foi executada com cautela para
minimizar downtime, com monitoramento contínuo ao longo de toda a
transição para abordar quaisquer desafios prontamente.

Após a conclusão da migração, workloads na Huawei CCE foram validados
para garantir uma operação estável. Configurações foram otimizados
conforme o necessário, e práticas de monitoramento e manutenção foram
estabelecidas para garantir o sucesso contínuo da operação de aplicações
em container no ambiente Huawei CCE. O processo dessa operação garantiu
uma migração suave e bem-sucedida, alinhando a infraestrutura com as
necessidades crescentes e estratégias na Huawei Cloud Container Engine.

{% include image.html post=page.path file="image4.png" %}

# Implementação

## **Microsoft Azure**

### **VPC para os Nodes**

Neste exemplo, o AKS tem 1 VPC com 1 subnet. Redes virtuais foram
utilizadas para o gerenciamento dos endereços de IP, segurança,
integração com os serviços da Azure e demais funcionalidades
relacionadas à rede para os nodes do AKS. Eles são uma parte essencial
na implementação e gerenciamento dos clusters AKS na Azure.

{% include image.html post=page.path file="image5.png" %}

### **AKS – Cluster**

1.  Primeiramente, é necessário checar os recursos essenciais do
    Kubernetes, como os workloads, namespaces, armazenamento, nodes,
    pods e serviços.

2.  Navegue até a home, Kubernetes services e clique no serviço de
    Kubernetes para migrar.

3.  Conecte no cluster utilizando a ferramenta de comandos por texto
    para interagir diretamente com o cluster utilizando o kubectl, a
    ferramenta de comandos por texto do Kubernetes. Kubectl está
    disponível dentro do Azure Cloud Shell por padrão e pode, também,
    ser instalado localmente.

{% include image.html post=page.path file="image6.png" %}

4.  Após abrir o cloud shell, também é necessário configurar a
    subscription do cluster e fazer download das credenciais.

{% include image.html post=page.path file="image7.png" %}

5.  Após conectar ao cluster, é possível checar os deployments,
    namespaces, pods e as informações do cluster para analisar o
    cluster.

{% include image.html post=page.path file="image8.png" %}

### **Preparação dos Clusters**

Neste exemplo, há um nodepool no AKS.

{% include image.html post=page.path file="image9.png" %}

### **Configurações Adicionais para Pods e ELB**

Para utilizar os serviços de PV e ELB no AKS, algumas configurações
adicionais precisam ser realizadas. Não é necessário instalar o driver
CSI ou o plugin kubenet, somente é necessário ativá-los.

{% include image.html post=page.path file="image10.png" %}

Igualmente, é possível ver as imagens dos containers em execução no
Kubernetes utilizando:

{% include image.html post=page.path file="image11.png" %}

{% include image.html post=page.path file="image12.png" %}

**Instalando o Velero e realizando configurações adicionais**

1.  Primeiramente, verifique o cluster AKS e o resource group através do
    seguinte comando:

{% include image.html post=page.path file="image13.png" %}

2.  Configure o arquivo kubeconfig:

{% include image.html post=page.path file="image14.png" %}

3.  Cheque se a conta de storage está configurada ou não. Em caso
    negativo, crie uma conta de storage através do seguinte comando:

{% include image.html post=page.path file="image15.png" %}

4.  Instale o Velero no Azure Cloud Shell:

{% include image.html post=page.path file="image16.png" %}

5.  Instale o Velero Server no cluster AKS:

{% include image.html post=page.path file="image17.png" %}

6.  A este ponto, o arquivo “credentials-velero” precisa estar
    preenchido com certos parâmetros, como “Azure\_Client\_ID”,
    “Azure\_Subscription\_ID”, “Azure\_Tenant\_ID”,
    “Azure\_Client\_Secret” e “Azure\_Resource\_Group”. Essas
    configurações podem ser obtidas na etapa 5 acima.

<!-- end list -->

1.  Somente o parâmetro “Azure\_Client\_ID” é obtido através do console
    da Azure. Para obter esse parâmetro, navegue até “Azure AD” e clique
    em “APP Registrations”, selecione “All Aplications” e “Storage
    account” para conseguir o Client ID.

2.  Azure AD \> APP Registrations \> All Applications \> Storage Account

> {% include image.html post=page.path file="image18.png" %}

7.  Por fim, instale o Velero na AKS. Cheque todas as variáveis e
    valores antes de iniciar o Velero.

{% include image.html post=page.path file="image19.png" %}

8.  Cheque se os pods, deployments e replicasets estão criados ou não.

{% include image.html post=page.path file="image20.png" %}

**Criando um backup utilizando o Velero**

1.  Crie um novo backup através do comando: “./velero backup create
    $Backup\_Name” e espere alguns minutos até que o backup esteja
    concluído.

{% include image.html post=page.path file="image21.png" %}

2.  Cheque se o backup está completo ou não. É possível utilizar o
    seguinte comando para verificar:

```shell
./velero backup describe newbackup2
```

{% include image.html post=page.path file="image22.png" %}

3.  Navegue até a seção relativa às storage accounts e cheque se o
    backup dos dados foi realizado com sucesso. Navegue até Home \>
    Storage Account \> Containers.

{% include image.html post=page.path file="image23.png" %}

{% include image.html post=page.path file="image24.png" %}

{% include image.html post=page.path file="image25.png" %}

## **Huawei Cloud**

### **Criar uma VPC**

Primeiramente, uma VPC precisa ser criada. Neste exemplo, a subnet com
CIDR 192.168.0.0/16 será utilizada.

{% include image.html post=page.path file="image26.png" %}

### **Criar o Cluster no Console da Huawei Cloud**

1.  Navegue até o console da CCE e clique em “Create CCE”;

2.  Selecione a AZ correspondente;

3.  Selecione as especificações de acordo com o cenário;

4.  Selecione a VPC e security group apropriados;

5.  Após a criação do CCE, faça login na instância da ECS criada;

6.  Teste a conexão e atrele um EIP se necessário.

{% include image.html post=page.path file="image27.png" %}

{% include image.html post=page.path file="image28.png" %}

{% include image.html post=page.path file="image29.png" %}

### **Criar os nodes**

7.  Vá para a seção de Nodes no console do CCE;

8.  Clique em “Create a Node”;

9.  Selecione as especificações do Host do Node;

10. Selecione o Container Engine, SO e armazenamento;

11. Modifique a rede de acordo com o necessário.

{% include image.html post=page.path file="image30.png" %}

{% include image.html post=page.path file="image31.png)

### **Instalar o Velero nos Clusters de Origem e de Destino (Mesmo Processo" %}**

1.  É necessário fazer o download do kubectl e o seu arquivo de
    configurações, copiar o arquivo para o seu cliente e configure o
    kubectl. Após realizar a configuração, é possível utilizar o kubectl
    para acessar o cluster Kubernetes.

2.  Copie “kubectl” e o seu arquivo de configurações para o diretório
    “/home” no seu client. Se o kubectl já tiver sido instalado, só é
    necessário copiar o arquivo kubeconfig.

{% include image.html post=page.path file="image32.png" %}

3.  Logue no seu client e configure o kubectl. Se o kubectl já tiver
    sido configurado, pule esta etapa.

{% include image.html post=page.path file="image33.png" %}

4.  Troque o modo de acesso do kubectl baseado no cenário de aplicação.
    Use o seguinte comando para habilitar intra-vpc-access.

{% include image.html post=page.path file="image34.png" %}

5.  Cheque as informações do cluster.

> {% include image.html post=page.path file="image35.png" %}

6. Execute os seguintes comandos:

```shell
wget https://github.com/vmware-tanzu/velero/releases/download/v1.9.1/velero-v1.9.1-linux-amd64.tar.gz
tar -xvf velero-v1.7.0-linux-amd64.tar.gz
cd velero-v1.9.1-linux-amd64/ && sudo chmod +x velero && sudo mv velero /usr/local/bin
```

9.  Crie o arquivo de acesso **credentials-velero** para o armazenamento
    de objetos de backup.

```shell
vim credentials-velero
tar -xvf velero-v1.7.0-linux-amd64.tar.gz
```

10.  Configure as variáveis para o arquivo credentials-velero.
    Especifique todos os dados especificados abaixo:

{% include image.html post=page.path file="image36.png" %}

9.  Crie o arquivo de configurações velero-credentials e o preencha com
    as informações abaixo:

{% include image.html post=page.path file="image37.png" %}

10. Abra o client do Velero. Mude o valor de **credentials**.
    Especifique –provider –plugins –bucket –secret-file
    –backup-location-config –snapshot-location-config –resource-group.
    Neste exemplo, o nome do bucket é **velero**. Mude a região e o url
    de acordo com o contexto de sua aplicação.

{% include image.html post=page.path file="image38.png" %}

11. Verifique a instalação do Velero com o kubectl.

```shell
kubectl get pod -n velero
```

> {% include image.html post=page.path file="image39.png" %}

### **Migrando os Recursos**

Após realizar a instalação do Velero para ambos os clusters, é
importante verificar o status do backup diretamente do servidor do
Velero. Para fazer isso, é possível checar os backups atuais através do
comando: “./velero get backup-locations”. Esse comando provê informações
importantes em relação aos backups administrados pelo Velero, garantindo
a segurança e disponibilidade dos recursos do Kubernetes.

1.  Para ver todos os backups disponíveis, utilize o comando: “./velero
    get backup-locations”.

{% include image.html post=page.path file="image40.png" %}

2.  Verifique se todos os backups estão disponíveis e podem ser
    restaurados

{% include image.html post=page.path file="image41.png" %}

### **Restaurando Aplicações no Cluster de Destino**

1.  Utilize a ferramenta do Velero para criar um restore e especificar
    um backup. Neste exemplo, o backup nomeado **vpro-backup** será
    utilizado para restaurar uma aplicação WordPress para o cluster CCE.

{% include image.html post=page.path file="image42.png" %}

### Atualizar o Cluster de Destino e Validar a Migração

Atualize os campos de imagem nos arquivos yaml dentro do CCE cluster de
acordo com o seu SWR.

{% include image.html post=page.path file="image43.png" %}

Edite os campos specs e annotations do arquivo yaml de entrada de acordo
com as regras na documentação oficial da Huawei Cloud.

{% include image.html post=page.path file="image44.png" %}

{% include image.html post=page.path file="image45.png" %}

**Verifique e valide o cluster**

{% include image.html post=page.path file="image46.png" %}

{% include image.html post=page.path file="image47.png" %}

{% include image.html post=page.path file="image48.png" %}
