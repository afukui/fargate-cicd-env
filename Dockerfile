FROM ubuntu:18.04

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt upgrade -y
RUN apt-get install -y \
    curl \
    sudo \
    tmux \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash nvm
RUN mkdir -p /home/nvm/.nvm/
RUN chown nvm:nvm -R "home/nvm"
RUN echo 'nvm ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
USER nvm
WORKDIR /home/nvm/.nvm

ENV NODE_VERSION 8.10.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
RUN source $HOME/.nvm/nvm.sh && npm install -g aws-cdk
ENV PATH=/home/nvm/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH

# repository task
WORKDIR /home/nvm
COPY . app
RUN sudo chown nvm:nvm -R app
WORKDIR /home/nvm/app
RUN npm install
RUN npm run build

CMD ["/bin/bash"]