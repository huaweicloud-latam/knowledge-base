---
title: Resources Discovery
layout: default
parent: Migration Center (MgC)
grand_parent: Migration
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Resources Discovery

V1.0 – Maio 2024

# Registro de Mudanças

| **Versão**        | **Autor**                | **Descrição**         |
| ----------------- | ------------------------ | --------------------- |
| V1.0 – 2024-05-21 | Diogo Hatz 50037923      | Tradução do Documento |
| V1.0 – 2024-05-21 | Wisley da Silva 00830850 | Revisão do Documento  |

# Introdução

O Migration Center (MgC) é uma ferramenta disponibilizada na Huawei
Cloud que centraliza em uma única plataforma a migração, modernização e
optimização de aplicações utilizando serviços baseados nas metodologias
e melhores práticas de migração da Huawei Cloud. Além da migração, o MgC
também viabiliza o discovery e assessment de recursos on-premises ou de
outras cloud vendors.

Este documento tem como objetivo descrever a metodologia que circunda o
discovery de recursos em provedoras cloud terceiras na Huawei Cloud
utilizando o MgC.

# AK/SK

Para realizar o discovery de recursos em outras provedoras cloud, é
necessário primeiramente gerar uma chave **AK/SK** ou **ID and Key** com
as permissões somente de **leitura** e **listagem** de **todos os
recursos** na respectiva cloud para os seguintes serviços: **EC2, RDS,
S3 e EFS**. Abaixo se encontra um exemplo das políticas e permissões
somente de leitura necessárias para o serviço EC2:

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image3.png)

# Realizando o Discovery de Recursos pela Internet

<span class="underline">Importante:</span> É necessário realizar esta
etapa para cada conta cujos recursos serão analisados pelo MgC.

Para realizar o discovery dos recursos de determinada conta,
primeiramente entre na seção do serviço
[MgC](https://console-intl.huaweicloud.com/mgc/?region=la-south-2&locale=en-us#/new-mgc/overview)
no console da Huawei Cloud. No canto inferior esquerdo, escolha a opção
**Settings** e então **Migration Projects**. Clique em **Create
Project**.

> ![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image4.png)
> 
> Escolha um nome para o projeto a ser criado e escolha o tipo de
> projeto **Complex**, em que há várias aplicações rodando cujas
> dependências não são bem delimitadas. Clique, então, em **Confirm**
> para criar um projeto.
> 
> ![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image5.png)

No menu à esquerda, escolha a opção **Application Discovery** e clique
em **Discover Over Internet** para realizar o discovery de recursos
através da internet.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image6.png)

Caso uma task de discovery já tenha sido criada previamente, a opção de
discovery ficará localizada na opção **Discover** e então **Over
Internet**.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image7.png)

Preencha um nome para a task de discovery e a provedora cloud em que a
conta cujos recursos serão analisados se encontram. Depois, em
**Credential**, clique na opção **Create**.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image8.png)

Preencha um nome para a credencial e em **Authentication** selecione a
opção **AK/SK** ou **ID and Key**. Depois, coloque a chave obtida no
item 2.0 deste material e clique em **Verify and Save**.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image9.png)

Selecione a credencial cadastrada. No campo de regiões, selecione todas
em **Select All**.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image10.png)

Para **Resource Type** selecione **Select all** e clique em **Confirm**.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image11.png)

Aguarde e task de discovery finalizar e então volte para uma página
anterior

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image12.png)

Nesta página, é possível visualizar os tipos de recursos analisados e
clicar neles para ver em detalhes todos os recursos descobertos.

![](/huaweicloud-knowledge-base/assets/images/MgC-Resources-Discovery/media/image13.png)

# Referências

  - Documentação do MgC:
    <https://support.huaweicloud.com/intl/en-us/productdesc-mgc/mgc_01_0001.html>.
