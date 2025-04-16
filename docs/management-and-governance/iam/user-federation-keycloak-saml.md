---
title: User Federation with Keycloak (SAML 2.0)
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Management & Governance
permalink: /docs/management-and-governance/iam/user-federation-with-keycloak-saml-2
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# User Federation with Keycloak (SAML 2.0)

V1.2 – October 2024

| **Version**       | **Author**                     | **Description**          |
| ----------------- | ------------------------------ | ------------------------ |
| V1.0 – 2024-10-14 | Diogo Hatz d50037923           | Initial Version          |
| V1.0 – 2024-10-14 | Wisley da Silva Paulo 00830850 | Document Review          |
| V1.1 – 2024-11-11 | Diogo Hatz d50037923           | Document Update          |
| V1.2 – 2024-12-19 | Diogo Hatz d50037923           | Document Update          |

# Objective

This document aims to present the procedures required to implement identity federation configuration in Huawei Cloud (Service Provider) through an identity provider (IdP), such as RedHat SSO or Keycloak. In this example, the protocol used for identity federation will be SAML 2.0, mapping users from the identity provider to virtual users in Huawei Cloud.

In the diagram below, you can see the authentication process flow in Huawei Cloud using an IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image3.png)

# Keycloak

First, you need to obtain the XML configuration file from the Huawei Cloud service provider (SP) to perform the configuration in Keycloak.

In a web browser, go to the following page and save its contents in an XML file: <https://auth.huaweicloud.com/authui/saml/metadata.xml>.

**<span class="underline">Note:</span>** For private cloud-based deployments, such as HCSO, the public endpoint to obtain SAML 2.0 XML will have the following structure: .

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image4.png)

Once done, go to the IdP (Keycloak) settings page and navigate to the “Clients” section. Click “Create” to create a new client.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image5.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image6.png)

Click “Select file” to import the Huawei Cloud XML configuration file saved in the previous step, and then click “Save”.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image7.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image8.png)

Navigate to the Huawei Cloud client you created, and then click “Edit” to edit the client settings.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image9.png)

Turn off the “Encrypt Assertions” option and click “Save” to save the changes made.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image10.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image11.png)

Navigate to the “Mappers” section, still in the Huawei Cloud client settings, and click “Create” to create a mapper for the username.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image12.png)

Select the “Mapper Type” as “User Property” and fill in the fields as shown in the image below.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image13.png)

Navigate once again to the “Mappers” section, still in the Huawei Cloud client settings, and click “Create” to create a mapper for the group.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image12.png)

Select the “Mapper Type” as “Group list” and fill in the fields as shown in the image below.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image14.png)

To federate Huawei Cloud users, you must first create users. If no user has been created in Keycloak, create a new user.

Navigate to the “Realm Settings” section and click “SAML 2.0 Identity Provider Metadata” in the “Endpoints” subsection. Save the opened web page locally as an XML file.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image15.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image16.png)

# IAM

Access the IAM service in the Huawei Cloud console and navigate to the
“Identity Providers” section. Click “Create Identity Provider” to create
an identity federation configuration.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image17.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image18.png)

Select the SAML protocol and “SSO Type” as “Virtual User”. Click the “OK” button to save the IdP creation settings.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image19.png)

Once done, select the “Modify” option next to the identity provider you created and click “Select File” to upload the saved XML configuration file for the identity provider (Keycloak). After selecting the file, select “Upload” to upload the XML file and load the IdP settings.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image20.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image21.png)

After confirming the file upload, click “OK” on the settings extracted from Keycloak by the XML file to save.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image22.png)

Finally, in the “Identity Conversion Rules” section, click “Create Rule” to create users and groups conversion rule from the IdP to the corresponding users and groups in Huawei Cloud. You can use the example translation rule below. **<span class="underline">Important:</span>** The translation rule below maps **all** Keycloak users to IAM groups in Huawei Cloud that have the same names as the groups configured in Keycloak. For example: In Keycloak, the user “Test” belonging to the “admin” group will be mapped to the virtual user “Test” in the “admin” group in Huawei Cloud. It is not necessary to create the “Test” user in Huawei Cloud in advance. However, it is mandatory to create the “admin” group in Huawei Cloud with the appropriate access control policies. 

```json
[
    {
        "remote": [
            {
                    "type": "UserName"
            },
            {
                    "type": "Group"
            }
        ],
        "local": [
            {
                    "user": {
                            "name": "{0}"
                    }
            },
            {
                    "group": {
                            "name": "{1}"
                    }
            }
        ]
    }
]
```

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image23.png)

Once done, click “OK” to save the changes made to the IdP.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image24.png)

# Example

The following is an example of validating login to the Huawei Cloud console through identity federation.

Accessing the Huawei Cloud console and selecting the option to log in through a federated user.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image25.png)

Entering the account name and selecting the configured IdP from the dropdown.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image26.png)

Logging in to the configured identity provider.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image27.png)

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image28.png)

Authentication successful, redirecting to the Huawei Cloud console.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image29.png)

**<span class="underline">Important:</span>** You can also log in to the console via identity federation using the hyperlink generated in the Identity Provider configuration in the Huawei Cloud console.

![](/huaweicloud-knowledge-base/assets/images/IAM-Keycloak-SAML/media/image30.png)

# References

- IAM Documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_08_0002.html>
- Huawei Cloud Blog: <https://bbs.huaweicloud.com/blogs/393396>