FROM node:lts

# Instalação do bash
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  bash && \
  rm -rf /var/lib/apt/lists/*

# Instalação do OpenSSL
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  openssl && \
  rm -rf /var/lib/apt/lists/*

# Instalação das dependências libc6
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  libc6 && \
  rm -rf /var/lib/apt/lists/*

# Instalação do NestJS CLI
RUN npm install -g @nestjs/cli

# Configuração do usuário e diretório de trabalho
USER node
WORKDIR /home/node/app
