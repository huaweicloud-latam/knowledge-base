---
title: Migrating MySQL to GaussDB
layout: default
parent: Database and Application Migration (UGO)
grand_parent: Databases
permalink: /docs/Databases/UGO/Migrating MySQL to GaussDB
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Migrating MySQL to GaussDB

V1.0 – April 2024

| **Version**       | **Author**               | **Description**      |
| ----------------- | ------------------------ | -------------------- |
| V1.0 – 2024-04-23 | Diogo Hatz 50037923      | Versão Inicial       |
| V1.0 – 2024-04-24 | Wisley da Silva 00830850 | Revisão do Documento |

# Introdução

O Database and Application Migration (UGO) é uma ferramenta gratuita
disponível na Huawei Cloud para a migração de schemas de bancos de dados
heterogêneos. O UGO pode converter statements em DDL para aqueles
compatíveis com os bancos de dados disponíveis na Huawei Cloud, como o
GaussDB e RDS. Além da migração de schemas e da avaliação da migração, o
UGO pode converter automaticamente a sintaxe do banco de origem para ser
compatível com o banco de destino.

Este documento tem como objetivo guiar o leitor a utilizar a ferramenta
UGO para a migração de bancos de dados heterogêneos para instâncias RDS
ou GaussDB na HWC através de um cenário de migração de um banco de dados
MySQL para GaussDB. O dataset utilizado é um dos datasets de teste do
MySQL, Sakila, disponível publicamente no website do MySQL.

# UGO

Para a migração do banco de dados MySQL para o GaussDB, faz-se
necessário utilizar o serviço UGO disponível na HWC para a avaliação da
migração e conversão da sintaxe do banco de origem para uma sintaxe
compatível com o banco de destino, além da checagem da compatibilidade
da engine de origem com a engine de destino. Para acessar o serviço UGO,
basta pesquisar por “UGO” na lista de serviços disponíveis no console da
HWC. Vale notar que o serviço somente está disponível nas regiões de
Santiago e Singapura.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image3.png)

## **DB Evaluation**

Para realizar a migração do banco, primeiramente é necessário fazer a
avaliação dos bancos de origem e destino para checar a compatibilidade
entre eles. Para isso, acesse a janela “DB Evaluation”, no item “Schema
Migration”, e selecione “Create Project”.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image4.png)

Preencha as informações relativas ao banco de dados de origem, como IP
público, porta, usuário e senha do banco. Vale notar que, atualmente, a
ferramenta UGO não permite a migração do banco através de VPN, portanto
um IP público precisa ser fornecido. Ademais, é necessário que o usuário
informado à ferramenta tenha permissão de DBA no banco de origem.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image5.png)

A caixa de opção “Skip Target DB Evaluation” precisa ser selecionada
caso o banco de dados de destino já tenha sido escolhido. Caso
contrário, deixe essa opção desabilitada para que o UGO faça uma
análise da compatibilidade do banco de origem com o banco de destino.
Após o preenchimento, realize o teste de conexão com o banco de origem e
clique em “Next”. Caso o teste de conexão falhe, verifique se a porta
3306 está aberta no security group da instância do banco de origem.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image6.png)

Após o pre-check ser feito, clique em “Next” novamente.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image7.png)

Nesta janela, selecione os objetos do banco de origem a serem migrados,
como tabelas, schemas, triggers, procedures, etc. Após isso, selecione a
engine do banco de dados de destino, neste caso o GaussDB 8.1
Primary/Standby Enterprise Edition.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image8.png)

Selecione o dataset a ser migrado. Neste caso, o dataset Sakila. Clique
em “Next” para continuar.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image9.png)

Confirme a avaliação do banco de dados de origem clicando em “Create”.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image10.png)

Aguarde o final da avaliação do banco de dados de origem e clique em
“Confirm Target DB Pending”.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image11.png)

Confirme a engine do banco de dados de destino e clique em “Confirm DB
Selection”.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image12.png)

Clique em “Create Now” para criar um projeto de migração.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image13.png)

Preencha as informações relativas ao banco de dados de destino, como a
instância do banco de dados, o nome do banco de dados, o usuário e
senha; e clique em “Test Connection” para testar a conectividade com o
banco de dados de destino. Caso a conexão falhe, verifique se a porta
8000 está aberta no security group do banco de destino. Clique em “Next”
para continuar.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image14.png)

Nesta janela alguns itens de risco para a migração do banco de dados são
mostrados. Clique em “View Details” para ver os detalhes dos riscos
encontrados pelo UGO e confirme se os riscos efetivamente são um risco
ou não. Clique em “Next” após confirmar os riscos.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image15.png)

Clique em “Create” para confirmar o projeto de migração do banco de
dados.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image16.png)

## **Object Migration**

Clique em “Migrate” no projeto de migração criado acima para começar a
migração dos objetos do banco de dados.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image17.png)

Confirme os objetos a serem migrados, bem como os objetos a não serem
migrados através dos botões “Select Migration Object Types” e “Convert
Specified Objects”. Clique em “Next” para continuar com a conversão dos
objetos.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image18.png)

Crie uma senha temporária para que os objetos de tipo usuário possam ser
migrados. Note que após a migração é necessário manualmente mudar a
senha. Clique em “Create Password” após inserir a senha.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image19.png)

Ajuste as configurações de parâmetros conforme necessário clicando em
“Edit”. Após a realização das configurações, confirme clicando em
“Next”.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image20.png)

Para iniciar o processo de conversão de sintaxe, clique em “Start” ao
lado de “Pending”. Aguarde até que a sintaxe de todos os objetos seja
convertida para a sintaxe compatível pelo banco de dados de destino.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image21.png)

Após a conclusão da conversão da sintaxe, será mostrado quais objetos
foram convertidos dinamicamente sem erros e quais conversões
apresentaram erros. Para esta parte, é necessário checar manualmente
todas as conversões de sintaxe, com erro ou sem erro, para garantir que
nenhuma conversão errada foi realizada. Para analisar os detalhes das
conversões de cada tipo de objeto, clique em “Details” ao lado dos
objetos.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image22.png)

Clique em “View Details” ao lado dos objetos que falharam para ser
convertidos para analisar o motivo dos erros e retificar esses erros.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image23.png)

Nesta tela, faça as modificações necessárias na janela da direita
(Target) para que o objeto migrado seja compatível com o banco de dados
de destino. Após fazer as modificações necessárias, clique em “Save”.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image24.png)

Faça as alterações necessárias em todos os objetos em que a conversão
automática de sintaxe apresentou erros. Após esse processo, clique em
“Next” para confirmar a conversão da sintaxe dos objetos.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image25.png)

Clique em “Start” para começar a migração dos objetos convertidos e
aguarde a conclusão da migração.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image26.png)

Faça a verificação dos resultados da migração. Após obter uma taxa de
sucesso considerável, clique em “Finish” para finalizar a migração dos
objetos do banco.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image27.png)

# DRS

Vale notar como nas etapas anteriores somente os objetos do banco de
dados de origem foram migrados para o banco de dados, como as tabelas,
funções e schemas. Para realizar a migração dos dados do banco, faz-se
necessário criar uma task de sincronização entre os dois bancos através
da ferramenta de migração de banco de dados Data Replication Service
(DRS). Navegue até o serviço DRS no console da HWC.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image28.png)

## **Syncronization Task**

Navegue até a subseção "Data Synchronization Management" e clique em "Create Synchronization Task" para criar uma task do DRS. Preencha os campos da task conforme demonstrado abaixo:

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image29.png)

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image30.png)

Aguarde até que a instância de sincronização seja criada, processo o
qual pode levar alguns minutos. Após a instância ser iniciada, preencha
as informações relativas ao banco de origem e o banco de destino, como
usuário, senha e IP público, e teste a conexão com ambos os bancos. Após
testar as conexões, selecione o botão “Next” para continuar.

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image31.png)

Selecione as tabelas a serem sincronizadas

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image32.png)

Aguarde pelo pre-check da sincronização ser completo. Caso algum dos
parâmetros falhar na sincronização, confirme o motivo da falha

![](/huaweicloud-knowledge-base/assets/images/UGO-Migrating-MySQL-to-GaussDB/media/image33.png)

# Referências

  - Dataset de teste Sakila:
    <https://dev.mysql.com/doc/sakila/en/sakila-preface.html>;

  - Documentação do UGO:
    <https://support.huaweicloud.com/intl/pt-br/productdesc-ugo/ugo_01_0014.html>;


