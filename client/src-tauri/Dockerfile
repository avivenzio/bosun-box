FROM ghcr.io/cross-rs/armv7-unknown-linux-gnueabihf:main

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update
RUN apt-get install --assume-yes libwebkit2gtk-4.0-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev mesa-utils libgl1-mesa-glx

ENV DISPLAY=192.168.50.137:0
ENV LIBGL_ALWAYS_INDIRECT=1
ENV RUST_BACKTRACE=1

EXPOSE 8080
