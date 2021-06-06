FROM denoland/deno:1.10.3

# port listens to.
EXPOSE 1993

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.js.
COPY deps.js .
RUN deno cache deps.js

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.js

CMD ["run", "--allow-net","--allow-env", "--allow-read", "main.js"]