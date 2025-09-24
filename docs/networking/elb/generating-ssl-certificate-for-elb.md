---
title: Generating SSL Certificates for ELB
layout: default
parent: Elastic Load Balance (ELB)
grand_parent: Networking
permalink: /docs/networking/vpn/generating-ssl-certificate-for-elb
---

# Generating SSL Certificates for ELB

V1.0 – July 2023

| **Version**       | **Author**            | **Description** |
|-------------------|-----------------------|---------------- |
| V1.0 – 2023-07-07 | Wisley Paulo w0083850 | Initial release |

# Introduction

This document presents the procedures for generating a free
certificate using certbot and letsencrypt and adding the certificate
to the Huawei ELB listener.

# Generate Certificate

## Access your Linux instance (in the example, we're using ECS ​​with Ubuntu 22.04) and run the commands (replace tamcloud.com.br with the desired domain):

```shell
snap install –classic certbot
sudo certbot certonly --manual -d \*.tamcloud.com.br -d tamcloud.com.br --agree-tos --preferred-challenges dns
```

{% include image.html post=page.path file="image3.png" %}

## Access your DNS service to configure the TXT record. DNS:

{% include image.html post=page.path file="image4.png" %}

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

## Verify that the record has propagated (in the example, Isptools is used for verification <http://www.isptools.com.br>):

{% include image.html post=page.path file="image7.png" %}

## After verifying the DNS record propagation, press "Enter" on the server so that it verifies the domain and generates the Certificate:

{% include image.html post=page.path file="image8.png" %}

## Use the commands below to copy the certificate data:

```shell
cat /etc/letsencrypt/live/tamcloud.com.br/fullchain.pem
```

{% include image.html post=page.path file="image9.png" %}

```shell
cat /etc/letsencrypt/live/tamcloud.com.br/privkey.pem
```

{% include image.html post=page.path file="image10.png" %}

Note: The certificate file displayed on the screen contains the entire chain of associated certificates. To add it to the Huawei load balancer, simply add the certificate without the entire chain, just the first certificate, as shown below:

```shell
-----BEGIN CERTIFICATE-----
MIIFADCCA+igAwIBAgISA5Ff3aJXuXhCevKfJsuL2Y90MA0GCSqGSIb3DQEBCwUA
MDIxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQD
.
.
.
TD7pA0xgcb4qQFhKKRyfbie5KxqxCSvNPEpT8bLgbI+sTctXr45N6TkIplMAtW5Q
EgjXCW2apDs17gGG8M+Kn1Yjl5g9eyhLa9EqNWEPFYAIl9oy
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFFjCCAv6gAwIBAgIRAJErCErPDBinU/bWLiWnX1owDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
.
.
.
HlUjr8gRsI3qfJOQFy/9rKIJR0Y/8Omwt/8oTWgy1mdeHmmjk7j1nYsvC9JSQ6Zv
MldlTTKB3zhThV1+XWYp6rjd5JW1zbVWEkLNxE7GJThEUG3szgBVGP7pSWTUTsqX
nLRbwHOoq7hHwg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIFYDCCBEigAwIBAgIQQAF3ITfU6UK47naqPGQKtzANBgkqhkiG9w0BAQsFADA/
.
.
.
Dfvp7OOGAN6dEOM4+qR9sdjoSYKEBpsr6GtPAQw4dy753ec5
-----END CERTIFICATE-----
```

## The generated certificate is valid for 3 months in this ecosystem, so it's important that you renew the certificate before that period with the command below (to avoid having to perform this process manually, we recommend creating an automation for this process):

```shell
certbot renew --cert-name tamcloud.com.br
```

# Insert ELB certificate

## Access the ELB service and then click on the Listener you want to add. Certificate:

{% include image.html post=page.path file="image11.png" %}

{% include image.html post=page.path file="image12.png" %}

## Access the ELB service and then click on the Listener you want to add. certificate:

{% include image.html post=page.path file="image13.png" %}

{% include image.html post=page.path file="image14.png" %}

The remaining steps for configuring ELB follow the same procedure already known;
if you have any questions, consult the ELB tutorial.