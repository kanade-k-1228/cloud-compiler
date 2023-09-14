FROM denoland/deno

EXPOSE 8000

WORKDIR /app

ADD . /app

RUN deno cache main.ts
RUN apt-get update
RUN apt-get -y install zip unzip build-essential

CMD ["run","--allow-net","--allow-read", "--allow-write", "--allow-run","main.ts"]
