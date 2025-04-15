---
title: Monitoramento de Recursos
layout: default
parent: Cloud Eye Service (CES)
grand_parent: Gerenciamento e Governança
lang: pt
permalink: /docs/management-and-governance/ces/resources-monitoring
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Monitoramento de Recursos

V1.1 – Dezembro 2023

| **Versão**        | **Autor**                | **Descrição**        |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2023-12-20 | Diogo Hatz 50037923      | Versão Inicial       |
| V1.0 – 2023-12-21 | Wisley da Silva 00830850 | Revisão do Documento |

# Introdução

O Cloud Eye (CES) é uma ferramenta gratuita para o monitoramento de
recursos da Huawei Cloud. Além do monitoramento de recursos, o Cloud Eye
também pode ser utilizado para criar alarmes baseados em eventos ou
métricas, identificar o mau funcionamento de recursos e rapidamente
reagir à mudança de recursos. Vale ressaltar que, por mais que o Cloud
Eye seja um serviço gratuito, **as cobranças geradas pelo envio de
notificações ao disparar alarmes são cobradas**.

Este documento tem como objetivo descrever as principais funcionalidades
do serviço Cloud Eye e guiar o leitor a utilizar o CES para o
monitoramento de recursos da nuvem, como ECSs, VPNs e CBRs etc. Ademais,
também é descrito como criar alarmes baseados em eventos ou métricas e
customizar dashboards para o monitoramento de recursos.

# Cloud Eye no console

## Overview

Ao abrir o Cloud Eye no console, a página inicial que será carregada é a
Overview, na qual é possível ter uma visão geral de todos os recursos
utilizados na Huawei Cloud, a utilização geral de rede, CPU, memória e
disco e quais recursos dispararam alarmes recentemente e precisam de uma
maior atenção.

  - <span class="underline">Visão geral dos recursos:</span> Permite a
    visualização do número total de recursos monitorados e os alarmes
    gerados para esses recursos.

  - <span class="underline">Estatística dos alarmes:</span> Mostra os
    alarmes disparados nos últimos sete dias por severidade do alarme.

  - <span class="underline">Monitoramento de servidores:</span> Permite
    a visualização da utilização geral de CPU e memória dos servidores
    monitorados e uma lista do top 5 ECSs ranqueados pela utilização de
    CPU ou memória.

  - <span class="underline">Monitoramento de rede:</span> Mostra a
    utilização geral de largura de banda de EIPs e uma lista do top 5
    EIPs ranqueados por utilização de largura de banda.

  - <span class="underline">Monitoramento de armazenamento:</span>
    Permite a visualização da utilização geral de disco (EVS) por IOPS
    de leitura e escrita e uma lista do top 5 discos ranqueados por
    IOPS.

É possível ter uma visão de como a página inicial do Cloud Eye é nas
imagens abaixo:

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image4.png)

## Monitoramento de servidores

O monitoramento de servidores (ECSs e BMSs) pode ser visualizado na
seção **Server Monitoring**. Vale ressaltar que para o monitoramento
de servidores, a instalação do agente (Telescope) é recomendada, uma vez
que providencia métricas mais específicas e precisas, de acordo com o
anexo 4.1.

A instalação do agente pode ser feita de três formas distintas: de forma
manual, automática ou em lote. Independentemente da forma de instalação
escolhida, é necessário configurar as permissões para o agente
previamente: na seção de monitoramento de servidores, clique em
**Configure** no aviso de que a permissão do agente não foi configurada
para a região atual.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image6.png)

### Automática:

Para instalar o agente de forma automática, basta clicar na peça de
quebra-cabeça na seção de **monitoramento de servidores** e na coluna de
**status do agente** na ECS/BMS correspondente e aguardar a instalação
do agente.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image7.png)

### Manual:

Para instalar o agente de forma manual, primeiramente vá para a seção
relativa à **ECS** ou **BMS**, a depender do tipo de servidor em que o
agente será instalado.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image8.png)

Selecione **Remote Login** para realizar o login no servidor desejado

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image9.png)

Realize o login no servidor digitando o usuário e a senha configurados
no momento de criação do servidor e, posteriormente, digite o seguinte
comando, caso a região em que o servidor se encontre seja
**LA-Santiago**:

```shell
cd /usr/local && curl -k -O https://uniagent-la-south-2.obs.la-south-2.myhuaweicloud.com/script/agent_install.sh && bash agent_install.sh
```

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image10.png)

Caso a região em que o servidor se encontre seja diferente de
**LA-Santiago**, é possível encontrar a lista de comandos por região no
seguinte link:
<https://support.huaweicloud.com/intl/en-us/usermanual-ces/ces_01_0029.html>

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image11.png)

Caso a mensagem em vermelho acima apareça ao final da instalação, o
agente foi instalado com sucesso.

## Dashboard

A seção **Dashboard** diz respeito à área em que gráficos personalizados
podem ser criados para o monitoramento de serviços e recursos
selecionados, com as métricas escolhidas.

Para criar um dashboard, navegue até a seção **My Dashboards** em
**Dashboards** e clique em **Create Dashboard**.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image12.png)

Escolha um nome para o dashboard em **Name** e clique em **OK**.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image13.png)

Para adicionar gráficos para o monitoramento de métricas específicas,
gráficos podem ser adicionados à dashboards. Para adicionar um gráfico,
clique no dashboard criado e em **Add Graph**.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image14.png)

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image15.png)

Escolha o tipo de gráfico a ser criado e clique em **OK**.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image16.png)

Certas configurações podem ser feitas ao adicionar um gráfico a uma
dashboard, como se o mesmo gráfico irá possuir múltiplas métricas ou
somente uma métrica, o período em que os dados foram coletados, o tipo
de dado que será visualizado (dados brutos, máximo, mínimo, média ou
soma) e as métricas a serem mostradas.

Em **Metric Display** selecione **One graph for a single metric** para
adicionar uma única métrica ao gráfico ou selecione **One graph for
multiple metrics** para adicionar múltiplas métricas ao gráfico.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image17.png)

Clique em **Select Resource and Metric** para selecionar o recurso que
será monitorado e a métrica para esse recurso.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image18.png)

Selecione o tipo de serviço que será monitorado à esquerda da página
**Select Resource and Metric**, o recurso específico a ser monitorado na
área central da página e as métricas desse recurso à direita. Neste
exemplo, o uso da CPU, disco, memória e rede serão monitorados na
“ecs-9152”.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image19.png)

Ajuste o horário da coleta dos dados no canto superior direito da página
**Add Graph**.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image20.png)

Uma amostra do gráfico gerado irá aparecer na página. Clique em **Save**
para confirmar e adicionar o gráfico à dashboard.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image21.png)

Na dashboard, é possível criar uma legenda para o gráfico, edita-lo,
colocá-lo em tela cheia, recarregar os dados mostrados no gráfico e
mover o gráfico de lugar.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image22.png)

No Cloud Eye é possível criar inúmeras dashboards com diversos gráficos
em cada dashboard, sendo que cada gráfico pode mostrar múltiplas
métricas de monitoramento. Além disso, como descrito no tópico 3.1, na
seção **Overview** do CES é possível ter a visualização geral dos
recursos monitorados com as principais métricas utilizadas, como uso de
CPU, memória e disco em servidores; uso de rede e um total de alarmes
disparados no Cloud Eye.

## Monitoramento de serviços da nuvem

Na seção **Cloud Service Monitoring**, dashboards para cada recurso dos
serviços de ECS, EIP e largura de banda, NAT e VPN são criados
automaticamente durante a criação desses recursos. As principais
métricas de monitoramento desses serviços são adicionadas em forma de
gráfico nessa seção para o monitoramento rápido e geral desses serviços.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image23.png)

Além da visualização dos gráficos relativos às principais métricas
monitoradas, também é possível exportar os dados coletados clicando no
botão **Export Data**.

![](/huaweicloud-knowledge-base/assets/images/CES-Resources-Monitoring/media/image24.png)

# Anexos

## Métricas de monitoramento de servidores

| **Métricas**                                           | **Sem agente** | **Agente instalado** |
| ------------------------------------------------------ | -------------- | -------------------- |
| Uso de CPU                                             | Sim            | Sim / Dedicado       |
| Uso de disco                                           | Sim            | Sim                  |
| Uso de memória                                         | Sim            | Sim / Dedicado       |
| Largura de banda de escrita em disco                   | Sim            | Sim                  |
| Largura de banda de leitura em disco                   | Sim            | Sim                  |
| IOPS de escrita em disco                               | Sim            | Sim                  |
| IOPS de leitura em disco                               | Sim            | Sim                  |
| Taxa de entrada em banda                               | Sim            | Sim                  |
| Taxa de saída em banda                                 | Sim            | Sim                  |
| Taxa de entrada fora de banda                          | Sim            | Sim                  |
| Taxa de saída fora de banda                            | Sim            | Sim                  |
| Uso de crédito de CPU                                  | Sim            | Sim                  |
| Balanceamento de crédito de CPU                        | Sim            | Sim                  |
| Excedente de balanceamento de crédito de CPU           | Sim            | Sim                  |
| Excedente de crédito carregado de CPU                  | Sim            | Sim                  |
| Conexões de rede                                       | Sim            | Sim                  |
| Largura de banda de entrada por servidor               | Sim            | Sim                  |
| Largura de banda de saída por servidor                 | Sim            | Sim                  |
| PPS de entrada                                         | Sim            | Sim                  |
| PPS de saída                                           | Sim            | Sim                  |
| Novas conexões                                         | Sim            | Sim                  |
| Erros incorrigíveis agregados de ECC                   | Sim            | Sim                  |
| Páginas aposentadas com erros de bit único             | Sim            | Sim                  |
| Páginas aposentadas com erros de bit duplos            | Sim            | Sim                  |
| Status de saúde da GPU                                 | Sim            | Sim                  |
| Uso de encoder da GPU                                  | Sim            | Sim                  |
| Uso de decoder da GPU                                  | Sim            | Sim                  |
| Erros corrigíveis voláteis de ECC                      | Sim            | Sim                  |
| Erros incorrigíveis voláteis de ECC                    | Sim            | Sim                  |
| CPU ociosa                                             | Não            | Sim / Dedicado       |
| Uso de CPU de espaço de usuário                        | Não            | Sim / Dedicado       |
| Uso de CPU de espaço de kernel                         | Não            | Sim / Dedicado       |
| Uso de CPU de outros processos                         | Não            | Sim / Dedicado       |
| Uso de CPU de processos ótimos                         | Não            | Sim / Dedicado       |
| Tempo em que a CPU está esperando por operações de E/S | Não            | Sim / Dedicado       |
| Tempo de interrupção de CPU                            | Não            | Sim / Dedicado       |
| Tempo de interrupção de CPU por software               | Não            | Sim / Dedicado       |
| Memória disponível                                     | Não            | Sim / Dedicado       |
| Memória ociosa                                         | Não            | Sim / Dedicado       |
| Buffer                                                 | Não            | Sim / Dedicado       |
| Cache                                                  | Não            | Sim / Dedicado       |
| Largura de banda de entrada por NIC                    | Não            | Sim / Dedicado       |
| Largura de banda de saída por NIC                      | Não            | Sim / Dedicado       |
| Taxa de pacotes enviados por NIC                       | Não            | Sim / Dedicado       |
| Taxa de pacotes recebidos por NIC                      | Não            | Sim / Dedicado       |
| Taxa de pacotes com erro recebidos por NIC             | Não            | Sim / Dedicado       |
| Taxa de pacotes com erro transmitidos por NIC          | Não            | Sim / Dedicado       |
| Taxa de pacotes recebidos largados por NIC             | Não            | Sim / Dedicado       |
| Taxa de pacotes transmitidos largados por NIC          | Não            | Sim / Dedicado       |
| Processos em execução                                  | Não            | Sim / Dedicado       |
| Processos ociosos                                      | Não            | Sim / Dedicado       |
| Processos zombies                                      | Não            | Sim / Dedicado       |
| Processos bloqueados                                   | Não            | Sim / Dedicado       |
| Processos dormindo                                     | Não            | Sim / Dedicado       |
| Total de processos                                     | Não            | Sim / Dedicado       |
| Taxa de retransmissão TCP                              | Não            | Sim / Dedicado       |
| TCP SYS\_SENT                                          | Não            | Sim / Dedicado       |
| TCP SYS\_RECV                                          | Não            | Sim / Dedicado       |
| TCP FIN\_WAIT1                                         | Não            | Sim / Dedicado       |
| TCP FIN\_WAIT2                                         | Não            | Sim / Dedicado       |
| TCP CLOSE                                              | Não            | Sim / Dedicado       |
| TCP LAST\_ACK                                          | Não            | Sim / Dedicado       |
| TCP LISTEN                                             | Não            | Sim / Dedicado       |
| TCP CLOSING                                            | Não            | Sim / Dedicado       |
| Média de carga da CPU no último minuto                 | Não            | Sim / Dedicado       |
| Média de carga da CPU nos últimos 15 minutos           | Não            | Sim / Dedicado       |
| Média de carga da CPU nos últimos 5 minutos            | Não            | Sim / Dedicado       |
| TCP ESTABLISHED                                        | Não            | Sim / Dedicado       |
| TCP TOTAL                                              | Não            | Sim / Dedicado       |
| UDP TOTAL                                              | Não            | Sim / Dedicado       |
| NTP Offset                                             | Não            | Sim / Dedicado       |
| Total de arquivos processados                          | Não            | Sim / Dedicado       |

## Métricas de monitoramento de VPN Gateway

| **Métricas**                       | **Suportado** |
| ---------------------------------- | ------------- |
| Taxa de pacotes de entrada         | Sim           |
| Taxa de pacotes de saída           | Sim           |
| Largura de banda de entrada        | Sim           |
| Largura de banda de saída          | Sim           |
| Uso de largura de banda de entrada | Sim           |
| Número de conexões                 | Sim           |
| Uso de largura de banda de saída   | Sim           |

## Métricas de monitoramento da conexão VPN

| **Métricas**                      | **Suportado** |
| --------------------------------- | ------------- |
| Média de RTT do túnel             | Sim           |
| Máximo de RTT do túnel            | Sim           |
| Taxa de perda de pacotes do túnel | Sim           |
| Média de link RTT                 | Sim           |
| Máximo de link RTT                | Sim           |
| Taxa de perda de pacotes do link  | Sim           |
| Status da conexão VPN             | Sim           |
| Taxa de recebimento de pacotes    | Sim           |
| Taxa de envio de pacotes          | Sim           |
| Taxa de recebimento de tráfego    | Sim           |
| Taxa de envio de tráfego          | Sim           |
| Taxa de envio de pacote SA        | Sim           |
| Taxa de recebimento de pacote SA  | Sim           |
| Taxa de envio de tráfego SA       | Sim           |
| Taxa de recebimento de tráfego SA | Sim           |

## Métricas de monitoramento de NAT

| **Métricas**                                      | **Suportado** |
| ------------------------------------------------- | ------------- |
| Conexões SNAT                                     | Sim           |
| Largura de banda de entrada                       | Sim           |
| Largura de banda de saída                         | Sim           |
| PPS de entrada                                    | Sim           |
| PPS de saída                                      | Sim           |
| Tráfego de entrada                                | Sim           |
| Tráfego de saída                                  | Sim           |
| Taxa de uso de conexões SNAT                      | Sim           |
| Taxa de uso de largura de banda de entrada        | Sim           |
| Taxa de uso de largura de banda de saída          | Sim           |
| Total de largura de banda de saída (UDP)          | Sim           |
| Total de largura de banda de saída (TCP)          | Sim           |
| Total de largura de banda de entrada (UDP)        | Sim           |
| Total de largura de banda de entrada (TCP)        | Sim           |
| Pacotes perdidos por conexões SNAT excessivas     | Sim           |
| Pacotes perdidos por excesso de PPS               | Sim           |
| Pacotes perdidos por todos os portes EIP alocados | Sim           |

# Referências

  - Documentação do CES:
    <https://support.huaweicloud.com/intl/en-us/function-ces/index.html>

  - Limitações do CES:
    <https://support.huaweicloud.com/intl/en-us/productdesc-ces/ces_07_0007.html>

  - FAQ:
    <https://support.huaweicloud.com/intl/en-us/ces_faq/ces_faq_0059.html>

  - Instalação do agente do CES em lote:
    <https://support.huaweicloud.com/intl/en-us/usermanual-ces/ces_01_0033.html>
