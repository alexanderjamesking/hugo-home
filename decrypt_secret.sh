#!/bin/sh

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase=$MY_SECRET --output id_rsa id_rsa.gpg

chmod 400 id_rsa
