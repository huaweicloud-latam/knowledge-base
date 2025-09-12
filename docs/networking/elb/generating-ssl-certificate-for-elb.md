---
title: Generating SSL Certificates for ELB
layout: default
parent: Elastic Load Balance (ELB)
grand_parent: Networking
permalink: /docs/networking/vpn/generating-ssl-certificate-for-elb
---

# Generating SSL Certificates for ELB

V1.0 – July 2023

# CHANGELOG

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

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image3.png"
style="width:5.34583in;height:2.48619in" />

## Access your DNS service to configure the TXT record. DNS:

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image4.png"
style="width:5.76806in;height:1.925in" />

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image5.png"
style="width:5.76806in;height:2.07292in" />

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image6.png"
style="width:4.89209in;height:6.61133in" />

## Verify that the record has propagated (in the example, Isptools is used for verification <http://www.isptools.com.br>):

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image7.png"
style="width:6.24776in;height:3.30592in" />

## After verifying the DNS record propagation, press "Enter" on the server so that it verifies the domain and generates the Certificate:

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image8.png"
style="width:6.23077in;height:3.42222in" />

## Use the commands below to copy the certificate data:

```shell
cat /etc/letsencrypt/live/tamcloud.com.br/fullchain.pem
```

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image9.png"
style="width:5.01935in;height:4.06274in" />

```shell
cat /etc/letsencrypt/live/tamcloud.com.br/privkey.pem
```

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image10.png"
style="width:4.96134in;height:3.70936in" />

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

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image11.png"
style="width:6.26806in;height:2.27778in" />

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image12.png"
style="width:6.26806in;height:2.45556in" />

## Access the ELB service and then click on the Listener you want to add. certificate:

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image13.png"
style="width:6.05886in;height:3.55235in" />

<img
src="/huaweicloud-knowledge-base/assets/images/networking/elb/generating-ssl-certificate-for-elb/image14.png"
style="width:3.70319in;height:4.80309in" />

The remaining steps for configuring ELB follow the same procedure already known;
if you have any questions, consult the ELB tutorial.