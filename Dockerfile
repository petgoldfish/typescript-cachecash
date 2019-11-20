FROM node:buster
RUN apt-get -y update && apt-get -y install python make g++ clang
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
WORKDIR /usr/src/app
COPY . .
RUN npm install --unsafe-perm --verbose
ENV PUBLISHER_ADDR=http://localhost:8043
CMD ["tools/docker-entry.sh"]

