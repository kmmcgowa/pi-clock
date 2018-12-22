# Rasberry Pi Magic Mirror

---

Pi password is same as main comp

## setup the pi

Let's start by making updating `apt-get`.
```bash
# This will update apt-get itself
sudo apt-get update

# This will update and packages you have install - a fresh install of rasbian has 0
sudo apt-get upgrade
```


### Getting the .local domain

First we want to be able to ssh into our pi without having to find it's ip address. This is a simple step, all we need to do is add the `avahi-daemon`.
```bash
sudo apt-get install avahi-daemon
```
Now we can find the pi at `<USER>@<MACHINE-NAME>.local` the default is `pi@raspberrypi.local` which I'm leaving it at. You will not even need to restart the pi. Test if it work by pinging the pi.
```bash
ping raspberrypi.local
```


### Adding SSH Keys

Now add our ssh keys for passwordless ssh. Begin by logging onto your main comptuer, the one you will use to ssh into the pi, here we will check for ssh keys.
follow the guide [here](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)


### Installing NVM

install nvm - i use this to install node and npm and to easily change versions for when electron updates etc
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

nvm --version
# 0.33.11

nvm install --lts

node -v
# 10.14.1

npm -v
# 6.4.1
```


make pi a .local address for ssh

mirror folder, in side would be frontend folder that has vue app - dev can just be ran from that dir, then all electon at the mm level

electon refresh the browser every hour
server would return vue
vue on loaded calls server api for the alerts
server would do all time checks for holidays or dark mode bASED ON TIME





$(npm bin)/holidays2json --pick US,GB --min
