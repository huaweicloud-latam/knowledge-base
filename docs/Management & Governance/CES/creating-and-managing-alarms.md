---
title: Creating and Managing Alarms
layout: default
parent: Cloud Eye Service (CES)
grand_parent: Management & Governance
permalink: /docs/Management & Governance/CES/Creating and Managing Alarms
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating and Managing Alarms

V1.1 – December 2023

| **Version**       | **Author**               | **Description**      |
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

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image3.png)

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image4.png)

## Grupos de recurso

Os grupos de recursos viabilizam o agrupamento de diversos recursos da
Huawei Cloud para o seu monitoramento em conjunto, além de facilitar a
gestão de alarmes para diversos recursos em lote.

Um grupo de recursos pode ser criado na seção **Resource Groups**,
clicando em **Create Resource Group**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image5.png)

Na página carregada, escolha um nome para o grupo de recursos em
**Name** e selecione os recursos a serem adicionados ao grupo por
serviço. Após adicionar todos os recursos desejados, clique em
**Create**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image6.png)

É possível criar alarmes para um grupo de recursos específico,
facilitando a criação de alarmes em lote para múltiplos recursos que
compartilhem um mesmo contexto.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image7.png)

## Gestão de alarmes

A seção relativa à gestão de alarmes possui as seguintes subseções:

  - <span class="underline">Regras de alarme:</span> Subseção utilizada
    para visualizar e criar alarmes baseados em métricas ou eventos.

  - <span class="underline">Histórico de alarmes:</span> Subseção
    utilizada para visualizar os alarmes disparados.

  - <span class="underline">Template de alarmes:</span> Subseção
    relativa à visualização de templates para alarmes.

  - <span class="underline">Monitoramento em um clique:</span> Subseção
    que permite a habilitação de monitoramento para eventos comuns de
    serviços

  - <span class="underline">Máscara de alarme:</span> Subseção que
    permite a criação de máscaras de alarmes para que alarmes disparados
    não sejam notificados.

### Criação de um alarme

Para criar um alarme para determinado recurso baseado em um evento ou
métrica, navegue para a seção **Alarm Rules**, em **Alarm Management**
e clique em **Create Alarm Rule**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image8.png)

Configure os ajustes básicos do alarme, como o nome do alarme em
**Name** e o tipo de recurso que será monitorado em **Resource Type**,
assim como o seu escopo em **Dimension**. Para configurar um alarme para
uma ECS, por exemplo, o **Resource Type** é Elastic Cloud Server e a
**Dimension** é ECSs.

Caso a condição de disparo do alarme seja uma métrica, como por exemplo
a taxa de utilização da CPU ou memória da ECS, selecione Metric em
**Alarm Type**. Já caso a condição de disparo do alarme seja um evento,
como por exemplo o evento de uma GPU não instalada, selecione Event no
campo **Alarm Type**. Neste exemplo, a métrica para disparar o alarme
será a utilização da CPU da ECS acima de 80%.

Em **Monitoring Scope**, o recurso específico que irá disparar o alarme
precisa ser configurado. É possível selecionar o recurso de três formas
distintas:

  - <span class="underline">All resources</span>: Selecione essa opção
    caso o alarme poderá ser disparado por todas as instâncias do
    recurso selecionado.

  - <span class="underline">Rresource groups</span>: Selecione essa
    opção caso o alarme poderá ser disparado por todos os recursos
    presentes em um grupo de recursos. Ver seção 3.3.

  - <span class="underline">Specific resources</span>: Selecione essa
    opção para escolher uma instância específica do serviço selecionado
    para disparar o alarme.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image9.png)

Neste exemplo, a ECS “ecs-4194” será selecionada como a instância que
poderá disparar o alarme no campo **Specific resources** em **Monitoring
Scope**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image10.png)

Há três formas distintas de configurar a métrica que irá disparar o
alarme em **Method**:

  - <span class="underline">Associate template:</span> Nesta opção, a
    métrica para disparar o alarme será configurada com base em um
    template já existente.

  - <span class="underline">Use existing template</span>: Nesta opção, a
    métrica para disparar o alarme será configurada com base em um
    template já existente.

  - <span class="underline">Configure manually</span>: Nesta opção, a
    métrica para disparar o alarme será configurada manualmente, o que
    permite uma maior flexibilidade.

Neste exemplo, a métrica que será configurada para disparar o alarme
será caso a utilização de CPU da ECS seja superior ou igual a 80%. Em
**Metric Name** é possível selecionar a métrica que poderá disparar o
alarme, como neste caso é **(Agent) CPU Usage (Recommended)**. Para esta
opção ser selecionada, é necessário que o agente do Cloud Eye seja
instalado, como feito na seção 3.5. É importante que o agente seja
instalado em servidores monitorados para obter uma melhor precisão no
monitoramento dos dados e uma gama maior de métricas de monitoramento.

Em **Alarm Policy** é possível selecionar o tipo de dado que será
analisado, como dados brutos, média, máximo, mínimo, variância ou soma
dos dados ingeridos; assim como a porcentagem que irá disparar o alarme
e a forma de comparação, como maior ou igual, maior, menor, menor ou
igual, aumento em relação à ou decremento em relação à.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image11.png)

Na seção **Alarm Notification** é possível configurar uma notificação
para os alarmes disparados por e-mail, SMS, requests HTTP e HTTPS ou
então por meio de um trigger no FunctionGraph. Caso a notificação
somente precise ser encaminhada no e-mail do dono da conta do console da
Huawei Cloud, é possível selecionar a opção **Account contact** em
**Notification Object** diretamente. Neste exemplo, um segundo e-mail
será configurado para receber as notificações dos alarmes do Cloud Eye.
Para isso, é necessário primeiro ativar o serviço Short Message
Notification (SMN).

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image12.png)

Clique em **Topics** para visualizar os tópicos de notificação criados.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image13.png)

Clique em **Create Topic** para criar um tópico de notificações.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image14.png)

Digite o nome do tópico das notificações em **Topic Name** e clique em
**OK**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image15.png)

Em seguida, clique em **Add Subscription** para adicionar um canal de
comunicações pelo qual a notificação será enviada.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image16.png)

Em seguida, escolha o protocolo de envio da notificação, neste caso
**Email**, e digite o e-mail escolhido em **Endpoints**. Clique em
**OK**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image17.png)

Um e-mail será enviado para o endpoint selecionado. Para que o serviço
SMN funcione corretamente, faz-se necessário que o usuário confirme o
seu e-mail através de uma confirmação que será enviada assim que a
**Subscription** for configurada.

Voltando para a criação do alarme, selecione o tópico criado nas etapas
anteriores em **Notification Object** e configure a janela de horários
em que a notificação pode ser enviada em **Notification Window**.
Ademais, também selecione as ocasiões em que a notificação será enviada
na seção **Trigger Condition**: quando o alarme é gerado ou quando o
alarme é limpo. Após configurado, selecione **Create** para criar o
alarme.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image18.png)

Em **Alarm Rules** é possível ver os alarmes criados e os seus status,
assim como o recurso que é monitorado e a política de ativação do
alarme.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image19.png)

Após um alarme ser disparado, é possível consulta-lo na seção **Alarm
Records** em **Alarm Management**.

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image20.png)

Também é possível visualizar a notificação gerada pelo alarme no
endpoint escolhido para o envio da notificação no serviço SMN. Em um
outro contexto, o seguinte e-mail foi gerado para o monitoramento de um
bucket no serviço OBS para armazenamento de objetos na Huawei Cloud:

![](/huaweicloud-knowledge-base/assets/images/CES-Creating-and-Managing-Alarms/media/image21.png)

As tabelas referentes às métricas e eventos monitorados para os serviços
de ECS, VPN, NAT e CBR da Huawei Cloud foram incluídas na seção 4.0 de
anexos deste documento. Para criar alarmes baseados em eventos ou
métricas para esses serviços, o procedimento é o mesmo do descrito
acima.

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

## Eventos monitorados para alarme de CBR

| **Eventos**                                                   | **Suportado** |
| ------------------------------------------------------------- | ------------- |
| Agente online                                                 | Sim           |
| Agente offline                                                | Sim           |
| Falha ao criar o backup                                       | Sim           |
| Falha ao restaurar o recurso usando um backup                 | Sim           |
| Falha ao deletar o backup                                     | Sim           |
| Falha ao deletar o vault                                      | Sim           |
| O backup foi feito com sucesso                                | Sim           |
| Restaurar o recursando usando um backup foi feito com sucesso | Sim           |
| O backup foi deletado com sucesso                             | Sim           |
| O vault foi deletado com sucesso                              | Sim           |
| Erro durante replicação                                       | Sim           |
| Replicação feita com sucesso                                  | Sim           |

## Eventos monitorados para alarme de servidores

| **Eventos**                                               | **Suportado** |
| --------------------------------------------------------- | ------------- |
| Reimplantação agendada para ser autorizada                | Sim           |
| Troca de disco local cancelada                            | Sim           |
| Troca de disco local para ser executada                   | Sim           |
| Alarme de evento xid disparado na GPU                     | Sim           |
| Modificação de especificações agendada para ser executada | Sim           |
| Migração agendada para ser executada                      | Sim           |
| Encerramento agendado para ser executado                  | Sim           |
| Reinicialização agendada para ser executada               | Sim           |
| Reimplantação agendada para ser executada                 | Sim           |
| Erros ECC irrecuperáveis gerados pela SRAM da GPU         | Sim           |
| Alarme inforom gerado na GPU                              | Sim           |
| Alarme de bit duplo ECC gerado na GPU                     | Sim           |
| Páginas aposentadas em excesso                            | Sim           |
| Alarme ECC gerado na GPU a100                             | Sim           |
| Falha ECC na aposentadoria de página de memória da GPU    | Sim           |
| Falha ECC na aposentadoria de página de GPU               | Sim           |
| Erros ECC demasiados de bit único na GPU                  | Sim           |
| Placa de vídeo não encontrada                             | Sim           |
| Link de GPU com defeito                                   | Sim           |
| Placa de vídeo perdida                                    | Sim           |
| Página de memória da GPU com defeito                      | Sim           |
| Imagem de engine da GPU com defeito                       | Sim           |
| Temperatura da GPU muito alta                             | Sim           |
| NVLink da GPU com defeito                                 | Sim           |
| Suspensão da nvidia-smi                                   | Sim           |
| ECS apagada                                               | Sim           |
| ECS reiniciada                                            | Sim           |
| ECS desligada                                             | Sim           |
| NIC deletada                                              | Sim           |
| ECS redimensionada                                        | Sim           |
| Reinicialização por erro de hardware                      | Sim           |
| Reinicialização por erro de hardware feita com sucesso    | Sim           |
| Timeout de auto recuperação                               | Sim           |
| Erro na inicialização                                     | Sim           |
| Erro no link da GPU                                       | Sim           |
| Erro no link da FPGA                                      | Sim           |
| Erro na ECS por processos anormais no host                | Sim           |
| GuestOS reiniciado                                        | Sim           |
| Migração iniciada                                         | Sim           |
| Migração finalizada com sucesso                           | Sim           |
| Erro durante migração                                     | Sim           |
| Risco de quebra de host                                   | Sim           |
| Erros irrecuperáveis de ECC: NPU                          | Sim           |

# Referências

  - Documentação do CES:
    <https://support.huaweicloud.com/intl/en-us/function-ces/index.html>

  - Limitações do CES:
    <https://support.huaweicloud.com/intl/en-us/productdesc-ces/ces_07_0007.html>

  - FAQ:
    <https://support.huaweicloud.com/intl/en-us/ces_faq/ces_faq_0059.html>

  - Instalação do agente do CES em lote:
    <https://support.huaweicloud.com/intl/en-us/usermanual-ces/ces_01_0033.html>

