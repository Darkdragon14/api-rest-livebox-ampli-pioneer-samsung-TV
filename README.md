# api-rest-livebox-ampli-pioneer-samsung-TV
it's a micro-service with differents APIs rest to use your devices. All files for Docker should be used to a raspberry pi 3 ou 0w.

Before to start thing to change all IP address and MAC Adress (for bluetooth devices). after this, you need to run this command line if you are on a raspberry :
```bash
docker-compose up
```

else launch each node app separately and use the proxy.conf for your nginx server.

Ningx server is on the port 8080.
