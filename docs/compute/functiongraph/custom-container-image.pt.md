---
title: Funções Baseadas em Imagens Customizadas de Containers
layout: default
parent: FunctionGraph
grand_parent: Computação
lang: pt
permalink: /docs/compute/functiongraph/custom-container-image-function
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Funções Baseadas em Imagens Customizadas de Containers

V1.0 – Julho 2024

| **Versão**        | **Autor**                      | **Descrição**        |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-07-11 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-07-11 | Wisley da Silva Paulo 00830850 | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
criação de uma função no serviço serverless FunctionGraph da Huawei
Cloud com runtime baseado em uma imagem de container.

# Considerações

**<span class="underline">Importante:</span>** Para a execução de
funções baseadas em imagens de containers no FunctionGraph, os
seguintes critérios precisam ser cumpridos:

1.  Um servidor HTTP ouvindo na porta 8000 precisa ser configurado e
    estar rodando no container criado;

2.  O usuário USER que irá rodar o container não pode ser o root. É
    necessário criar um novo usuário para rodar o container com UID
    diferente de 0, 1000 e 1002. O UID padrão do FunctionGraph é 1003,
    portanto, se um UID diferente for configurado, é necessário alterar
    na configuração da função no FunctionGraph;

3.  É necessário que as seguintes variáveis de ambiente existam dentro
    do container:

    1.  **HOME**: Path onde o código-fonte da função se encontrará;
    2.  **GROUP\_ID**: GID do grupo do usuário que irá executar o
        container;
    3.  **GROU\_NAME**: Nome do grupo do usuário que irá executar o
        container;
    4.  **USER\_ID**: UID do usuário que irá executar o container;
    5.  **USER\_NAME**: Nome do usuário que irá executar o container.

# SWR

Para criar uma função com base em uma imagem de container, primeiramente
se faz necessário realizar o upload dessa imagem no serviço de
repositório da Huawei Cloud SWR (Software Repository for Container).
**<span class="underline">Aviso:</span>** Para os itens 2.0 e 3.0 deste
documento, também é possível se referir ao seguinte vídeo da HWC para
configuração do SWR:
<https://developer.huaweicloud.com/intl/en-us/forum/topic/02117151603960362356>.

Acesse o painel do serviço SWR no console da HWC e clique em “Create
Organization”. Preencha o campo relativo ao nome da organização e
confirme a sua criação clicando em “OK”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image4.png)

Criada a Organization, clique no botão relativo a “Generate Login
Command” e copie o comando gerado que será utilizado para realizar a
autenticação do Docker com o repositório SWR.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image6.png)

# Docker

Acesse a máquina que possui a imagem do container localmente que irá
rodar no FunctionGraph e cole o comando copiado no item 2.0 deste
documento, relativo à autenticação do Docker com o serviço SWR da HWC.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image7.png)

Feito o login no repositório SWR através do Docker, copie o seguinte
comando, alterando os campos \[image name 1:tag 1\], \[Image repositor
address\], \[Organization name\] e \[Image name 2:tag 2\] de acordo com
a lista abaixo:

  - **\[Image name 1:tag 1\]:** {nome:tag} da imagem que será feito o
    upload;

  - **\[Image repositor address\]:** Domínio do SWR. Pode ser obtido no
    comando de login obtido no item 2.0 deste documento;

  - **\[Organization name\]:** Nome da organização criada no item 2.0
    deste documento;

  - **\[Image name 2:tag 2\]:** {nome:tag} da imagem que aparecerá no
    SWR. Similar a uma renomeação, o mesmo nome e tag podem ser
    mantidos.

```shell
docker tag {Image name 1:tag 1} {Image repository address} {Organization name} {Image name 2:tag 2}
```

Exemplo:

```shell
docker tag novo:1.0 swr.sa-brazil-1.myhuaweicloud.com/functiongraph/helloworld:1.0
```

Agora bata realizar o upload da imagem com o seguinte comando:

```shell
ddocker push {Image repository address} {Organization name} {Image name 2:tag 2}
```

Exemplo:

```shell
docker push swr.sa-brazil-1.myhuaweicloud.com/functiongraph/helloworld:1.0
```

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image8.png)

Na página do serviço do SWR no console da HWC é possível ver que a
imagem foi publicada com sucesso no repositório:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image9.png)

# Agency

Para delegar permissões do serviço SWR para o FunctionGraph, faz-se
necessário criar uma agency com permissões sobre o SWR. Navegue até o
serviço IAM no console da Huawei Cloud e clique na página “Agencies”.
Clique para criar uma agency em “Create Agency”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image10.png)

Dê um nome para a agency, selecione o tipo de agency como “Cloud
Service” e selecione o serviço FunctionGraph. Clique em “Next” para
avançar.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image11.png)

Delegue permissões de “SWR FullAccess” e “SWR Admin” para a agency e
clique em “Next” e, então, em “OK” para concluir.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image12.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image13.png)

# FunctionGraph

Acesse o serviço FunctionGraph no console da Huawei Cloud e navegue até
a página Functions \> Function List. Clique em “Create Function”.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image14.png)

Selecione a opção “Container Image”, “HTTP Function”, dê um nome para a
função, selecione a agency criada no item 4.0 deste documento e
selecione a imagem do SWR.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image15.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image16.png)

Também é possível configurar opções adicionais do container, como o
comando CMD de startup, argumentos de execução, User ID e Group ID.

**<span class="underline">Importante:</span>** O User ID padrão
utilizado é o 1003, e o User ID relativo ao usuário root de sistemas
UNIX não pode ser utilizado. Para a execução de funções baseadas em
imagens de containers, recomenda-se criar um novo usuário com UID = 1003
e definir esse usuário como sendo o USER no momento de build da imagem.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image17.png)

Tendo criada a função, clique em “Test” para testar a função criada.
Confirme o exemplo de requisição HTTP recebida e clique em “Create”.
Clique novamente em “Test” para realizar o teste da função criada.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image18.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image19.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image20.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image21.png)

**<span class="underline">Importante:</span>** Caso a execução da função
apresente o erro “runtime process is exited”, verifique a memória
alocada para a função em “Configuration” e “Memory(MB)”, alocando mais
memória.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image22.png)

Por último, basta configurar um trigger para a função. Neste exemplo, o
trigger que irá chamar a função do FunctionGraph será uma API Gateway do
serviço APIG da HWC. Para criar um trigger, basta clicar em “+ Create
Trigger” e configurar a instância do APIG, preenchendo o API Group,
Environment, Security Authentication, protocolo e timeout.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image23.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image24.png)

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image25.png)

Vale ressaltar que na configuração da API relativa à chamada da função,
deve ser explicitada a referida função como backend da API.

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image26.png)

# Exemplo

Neste exemplo, uma função escrita em .NET 8.0 foi desenvolvida com um
trigger pelo API Gateway (APIG) da HWC para que, toda vez que for
chamada, a função fazer uma requisição GET em um servidor HTTP remoto.

Chamando a API através do painel do API Gateway no console da HWC:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image27.png)

Listener do servidor HTTP remoto:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image28.png)

Resultado da execução da API:

![](/huaweicloud-knowledge-base/assets/images/Functiongraph-Custom-Container-Image/media/image29.png)

# Referências

  - Documentação do FunctionGraph:
    <https://support.huaweicloud.com/intl/en-us/qs-functiongraph/functiongraph_04_0103.html>.
