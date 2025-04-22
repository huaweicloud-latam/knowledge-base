---
title: Terraform Startup
layout: default
parent: Huawei Cloud Stack Online (HCSO)
grand_parent: Huawei Cloud Stack
permalink: /docs/huawei-cloud-stack/hcso/terraform-startup
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Terraform Startup

V1.0 – November 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-11-21 | Diogo Hatz d50037923           | Initial Version      |
| V1.0 – 2024-11-21 | Wisley da Silva Paulo 00830850 | Document Review      |
| V1.0 – 2024-11-21 | Gustavo Scovini 00918380       | Document Review      |

# Objective

This document aims to present the procedures required to configure the Huawei Cloud provider in the Terraform infrastructure-as-code tool for Huawei Cloud Stack Online (HCSO) deployments.

# IAM

To delegate permissions for creating resources using the Terraform tool, it is necessary to create an AK/SK access key in the Huawei Cloud console, which will be used to authenticate with the Huawei Cloud account.

To do this, access the Huawei Cloud console, hover over the account name in the upper right corner and click “My Credentials”. Once done, click “Access Keys” and “Create Access Key”.

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image3.png)

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image4.png)

If a warning window appears, accept the credential creation and
click “Create” followed by “Download” to download the
AK/SK key pair.

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image5.png)

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image6.png)

**Note:** The permissions of the created AK/SK key will be inherited from the
user who created it. If you encounter any permission-related issues, refer to the following IAM permissions documentation to delegate the necessary permissions: <https://support.huaweicloud.com/intl/en-us/productdesc-iam/iam_01_0036.html>.

# Terraform

First, download and install the Terraform tool, available at the following hyperlink: <https://developer.hashicorp.com/terraform/install?product_intent=terraform>.

After installing the tool, create a .tf file in the desired directory where the infrastructure code will be stored. Once this is done, edit the file and insert both code snippets
below related to the Terraform registry provider, replacing the
highlighted parameters:

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
  region     = "{region}"
  access_key = "{AK}"
  secret_key = "{SK}"
  cloud = "{domain}"
  auth_url="https://iam-pub.{region}.{domain}"
  insecure = true
}

```

- region: HCSO region where the resources will be created;

- AK: access Key created in item 2.0 of this document;

- SK: secret Key created in item 2.0 of this document;

- domain: HCSO console domain;

- insecure: optional parameter, only required in case of errors
arising from HCSO certificates.

After configuring the terraform and provider fields, create a
resource to validate the tool's operation. Below is a sample code snippet to create a VPC:

```terraform
resource "huaweicloud_vpc" "vpc-hcso" {
  name = "vpc-hcso"
  cidr = "10.0.0.0/8"
}
```

**Note:** Below is the official registry of the Huawei Cloud Terraform provider, compatible with both the Huawei Cloud public cloud and
HCSO implementations:
<https://registry.terraform.io/providers/huaweicloud/huaweicloud/latest/docs>. Alternatively, there is also the following registry that can be used exclusively for HCSO implementations: <https://registry.terraform.io/providers/huaweicloud/hcso/latest/docs>. 

# Example

Below is an example of validating the configuration performed in the
Terraform tool, as well as the result in the HCSO console:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image7.png)

Using the terraform init command to initialize the
Terraform repository:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image8.png)

Using the terraform plan command to verify the
code developed by Terraform:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image9.png)

Using the terraform apply command to apply the
modifications made, in this case the creation of the resource VPC:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image10.png)

Result of creating VPC in HCSO console:

![](/huaweicloud-knowledge-base/assets/images/huawei-cloud-stack/hcso/terraform-startup/image11.png)

# References

- Huawei Cloud Terraform Registry: <https://registry.terraform.io/providers/huaweicloud/huaweicloud/latest/docs>.
- Huawei Cloud HCSO Terraform Registry: <https://registry.terraform.io/providers/huaweicloud/hcso/latest/docs>.
