---
title: Iniciando com Terraform
layout: default
parent: Huawei Cloud Stack Online (HCSO)
grand_parent: Huawei Cloud Stack
lang: pt
permalink: /docs/huawei-cloud-stack/hcso/terraform-startup
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Iniciando com Terraform

V1.0 – Novembro 2024

| **Versão**        | **Autor**                      | **Descrição**        |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-11-21 | Diogo Hatz d50037923           | Versão Inicial       |
| V1.0 – 2024-11-21 | Wisley da Silva Paulo 00830850 | Revisão do Documento |
| V1.0 – 2024-11-21 | Gustavo Scovini 00918380       | Revisão do Documento |

# Objetivo

Este documento objetiva apresentar os procedimentos necessários para a
efetivação da configuração do provedor Huawei Cloud na ferramenta de
infraestrutura como código Terraform para implementações Huawei Cloud
Stack Online (HCSO).

# IAM

Para delegar permissões para a criação de recursos através da ferramenta
Terraform, faz-se necessária a criação de uma chave de acesso AK/SK no
console da Huawei Cloud, chave a qual será utilizada para autenticação
com a conta da Huawei Cloud.

Para isso, acesse o console da Huawei Cloud, passe o mouse sobre o nome
da conta no canto superior direito e clique em “My Credentials”. Feito
isso, clique em “Access Keys” e em “Create Access Key”.

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image3.png)

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image4.png)

Caso uma janela de aviso seja exibida, aceite a criação da credencial e
clique em “Create”, seguido por “Download” para realizar o download do
par de chaves AK/SK.

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image5.png)

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image6.png)

**Nota:** As permissões da chave AK/SK criada serão herdadas do usuário
que a criou. Caso algum problema oriundo de permissão seja encontrado,
tome como referência a seguinte documentação de permissões do IAM para
delegar as permissões necessárias:
<https://support.huaweicloud.com/intl/en-us/productdesc-iam/iam_01_0036.html>.

# Terraform

Primeiramente, baixe e instale a ferramenta Terraform, disponível no
seguinte
hyperlink:<https://developer.hashicorp.com/terraform/install?product_intent=terraform>.

Após a realização da instalação da ferramenta, crie um arquivo .tf no
diretório desejado em que o código relativo à infraestrutura será
armazenado. Feito isso, edite o arquivo e insira ambos trechos de código
abaixo relativos ao provedor do registry Terraform, substituindo os
parâmetros em destaque:

```terraform
terraform {
  required_providers {
    huaweicloud = {
      source  = "huaweicloud/huaweicloud"
      version = ">= 1.36.0"
    }
  }
}

provider "huaweicloud" {
  region     = "{região}"
  access_key = "{AK}"
  secret_key = "{SK}"
  cloud = "{dominio}"
  auth_url="https://iam-pub.{região}.{dominio}"
  insecure = true
}
```

  - região: região do HCSO em que os recursos serão criados;

  - AK: access Key criada no item 2.0 deste documento;

  - SK: secret Key criada no item 2.0 deste documento;

  - domínio: domínio do console HCSO;

  - insecure: parâmetro opcional, somente necessário em caso de erros
    decorrentes de certificados do HCSO.

Após ter configurado os campos de terraform e provedor, crie algum
recurso para realizar a validação do funcionamento da ferramenta. Abaixo
segue um trecho de código de exemplo para criar uma VPC:

```terraform
resource "huaweicloud_vpc" "vpc-hcso" {
  name = "vpc-hcso"
  cidr = "10.0.0.0/8"
}
```

**Nota:** Segue o registry oficial do provedor Terraform da Huawei
Cloud, compatível tanto com a nuvem pública Huawei Cloud quanto com
implementações HCSO:
<https://registry.terraform.io/providers/huaweicloud/huaweicloud/latest/docs>.
Alternativamente, também existe o seguinte registry que pode ser
utilizado exclusivamente para implementações HCSO:
<https://registry.terraform.io/providers/huaweicloud/hcso/latest/docs>.

# Exemplo

A seguir segue um exemplo de validação da configuração realizada na
ferramenta Terraform, assim como o resultado no console HCSO:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image7.png)

Utilizando o comando terraform init para inicializar o repositório
Terraform:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image8.png)

Utilizando o comando terraform plan para realizar a verificação do
código desenvolvido pelo Terraform:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image9.png)

Utilizando o comando terraform apply para aplicar as modificações
realizadas, no caso a criação do recurso VPC:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image10.png)

Resultado da criação da VPC no console HCSO:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image11.png)

# Referências

  - Registry do Terraform da Huawei Cloud:
    <https://registry.terraform.io/providers/huaweicloud/huaweicloud/latest/docs>.

  - Registry do Terraform da Huawei Cloud HCSO:
    <https://registry.terraform.io/providers/huaweicloud/hcso/latest/docs>.
