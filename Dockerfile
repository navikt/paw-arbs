FROM denoland/deno:2.6.0
WORKDIR /app
COPY . .
USER deno
ENV TZ="Europe/Oslo"
EXPOSE 8000
CMD ["deno", "task", "start"]