FROM node:buster
RUN apt-get -y update && apt-get -y install lsb-release software-properties-common
# clear_on_drop requires either nightly rust or clang 9 or newer; buster shipped with 7.
ENV CC=clang-9
ENV CXX=clang-9
RUN bash -c "$(wget -O - https://apt.llvm.org/llvm.sh)"
RUN apt-get -y install python make g++
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
WORKDIR /usr/src/app
COPY . .
ENV PUBLISHER_ADDR=http://localhost:8043
# NPM drops privileges when building wasm files without --unsafe-perm, but the target dir is root owned
RUN npm install --unsafe-perm --verbose
CMD ["npm", "start"]

