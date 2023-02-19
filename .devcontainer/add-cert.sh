# Without pipefail, the return value of a pipeline is the exit status of the last command in the pipeline, regardless of whether previous commands failed.
set -euxo pipefail

echo "adding certificate from ${AZURE_COSMOS_DB_ENDPOINT}..."

# Try to get the emulator cert in a loop
until curl -ksf "${AZURE_COSMOS_DB_ENDPOINT}/_explorer/emulator.pem" -o '/usr/local/share/ca-certificates/emulator.crt'; do
  echo "Downloading cert from $AZURE_COSMOS_DB_ENDPOINT"
  sleep 1
done

# Ensure that Node recognizes the emulator cert as a self-signed CA root
export NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/emulator.crt

echo "added certificate successfully"