---
title: "Como atualizar Debian 10 Buster para Debian 12 Bookworm"
date: 2024-01-28T02:00:05-03:00
images: [
  "images/2024-01/software-maintenance-crop.jpg"
]
tags: [
  "Debian",
  "Linux",
  "Programação",
]
description: "Neste guia discuto como atualizar o Debian 10 para o 12."
keywords: "Debian Buster Bullseye Bookworm Linux Tutorial HowTo Guide"
translationKey: debian-10-to-12
slug: como-atualizar-debian-buster-bookworm
---

![Uma referência a um monitor de coração em preto e vermelho](/images/2024-01/software-maintenance-crop.jpg#center "Uma referência a um monitor de coração em preto e vermelho. Fonte: [Internet Archive, Software maintenance and computers, 1990](https://archive.org/details/softwaremaintena0000unse_j8i4).")

# Visão Geral

Não é permitido pular versões ao atualizar, então precisamos ir de Debian 10, para 11, para aí, sim, o 12.

Meu servidor tem 4 aplicativos principais:
* [Moodle](https://moodle.org/)
* [WordPress](https://wordpress.com/)
* [MariaDB](https://mariadb.org/)
* [NGINX](https://nginx.org/)

Para atualizar, é extremamente importante seguir a documentação oficial, estou compartilhando minha experiência pessoal com a atualização. Então, não apenas copie e cole os comandos deste guia, leia a documentação primeiro.

Debian 10 -> Debian 11: https://www.debian.org/releases/bullseye/i386/release-notes/ch-upgrading.pt-br.html
Debian 11 -> Debian 12: https://www.debian.org/releases/bookworm/i386/release-notes/ch-upgrading.pt-br.html

{{< alert "Certifique-se de ter um backup que seja muito fácil de recuperar, por exemplo, um snapshot no seu provedor de VPS." info >}}

{{< alert "A documentação oficial exige que você remova pacotes de terceiros, aqueles que não estão nos repositórios oficiais. Infelizmente eu tinha alguns pacotes antigos de PHP que não removi, mas a atualização ainda deu certo." warning >}}

# De Debian 10 Buster para Debian 11 Bullseye

## Preparando a atualização

```sh
apt update && apt upgrade
# se necessário, você precisa colocar o sistema em um estado "limpo"
apt autoremove

# remover arquivos de configuração antigos etc
find /etc -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error'
# SÓ EXECUTE ISSO APÓS VERIFICAR O COMANDO ACIMA, CERTIFIQUE-SE QUE NÃO HÁ ARQUIVOS IMPORTANTES AQUI
find /etc \( -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error' \) -exec rm -v {} \+

# configurando pacotes pendentes
dpkg --audit
dpkg --configure --pending

# atualizando listas de fontes
sed -i.bak 's/buster/bullseye/g' /etc/apt/sources.list
# necessário já que a seção de segurança mudou o layout do nome
sed -i.bak2 's/bullseye\/updates/bullseye-security/g' /etc/apt/sources.list

```

## Fazendo a atualização

```sh
# gravando a sessão para entender erros
script -t 2>~/upgrade-bullseyestep.time -a ~/upgrade-bullseyestep.script

# segundo a documentação, melhor fazer um upgrade leve antes
apt update
apt upgrade --without-new-pkgs

# full upgrade, cruze os dedos :)
apt full-upgrade

# se tudo OK, reboot
reboot
```

## Pós-instalação

Cheque se todos os serviços estão funcionando corretamente.

```sh
# removendo pacotes que não são necessários mais
apt update && apt upgrade
apt autoremove

# verificando a versão nova do OS
cat /etc/os-release
```

Está pronto! Vamos continuar com a versão 12.

# De Debian 11 Bullseye para Debian 12 Bookworm

Já que estamos com um sistema em "estado limpo", o próximo upgrade é mais rápido.

## Preparando a atualização

```sh
# remover arquivos de configuração antigos etc
find /etc -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error'
# SÓ EXECUTE ISSO APÓS VERIFICAR O COMANDO ACIMA, CERTIFIQUE-SE QUE NÃO HÁ ARQUIVOS IMPORTANTES AQUI
find /etc \( -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error' \) -exec rm -v {} \+

# atualizando listas de fontes
sed -i.bullseye 's/bullseye/bookworm/g' /etc/apt/sources.list
```

## Fazendo a atualização

```sh
# gravando a sessão para entender erros
script -t 2>~/upgrade-bullseyestep.time -a ~/upgrade-bullseyestep.script

# segundo a documentação, melhor fazer um upgrade leve antes
apt update
apt upgrade --without-new-pkgs

# full upgrade, cruze os dedos :)
apt full-upgrade

# se tudo OK, reboot
reboot
```

## Pós-instalação

Cheque se todos os serviços estão funcionando corretamente.

```sh
# removendo pacotes que não são necessários mais
apt update && apt upgrade
apt autoremove

# verificando a versão nova do OS
cat /etc/os-release
```

# Limpando o novo sistema

Com todas as instalações, é possível que configurações residuais, e pacotes obsoletos estejam presentes.

{{< alert "Seja cuidadoso! Esses comandos deletam pacotes, logs e configurações que talvez você queira manter." warning >}}

```sh
# lista configurações residuais
apt list '~c'
# lista pacotes obsoletos
apt list '~o'

# remove eles
apt purge '~c'
apt purge '~o'

# faça o reboot e verifique o sistema novamente
reboot
```

# Conclusão

O upgrade de 2 major versions de Debian foi muito fácil. Aproximadamente + 1GB de espaço em disco foi usado e não tive 
que intervir nos aplicativos instalados.

Toda esse processo me levou 2 horas.

