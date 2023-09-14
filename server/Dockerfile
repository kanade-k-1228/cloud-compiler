FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache main.ts
RUN apt-get update
RUN apt-get -y install zip unzip build-essential
RUN apt-get -y install gcc-riscv64-unknown-elf
RUN apt-get -y install yosys nextpnr-ice40

CMD ["run","--allow-net","--allow-read", "--allow-write", "--allow-run", "main.ts"]
