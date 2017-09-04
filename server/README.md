# MyHomeStatus Server

Node.js script for MyHomeStatus server. 

To run it locally

```bash
npm install -g forever
npm install
export DEVICE_CREDENTIAL=<your device credential>
export STORAGE_ACCOUNT=<your storage account name>
export STORAGE_ACCESS_KEY=<your storage account key>
export PORT=<port>
forever start -o out.log -e err.log server.js
```
Or you can publish it to Docker Hub

```bash
export DOCKERUSERNAME=<your Docker Hub username>
export VERSION=<your image version>
docker build -t $DOCKERUSERNAME/myhomestatusserver:$VERSION .
docker push $DOCKERUSERNAME/myhomestatusserver:$VERSION
```

and then run it on your local Docker installation

```bash
export DEVICE_CREDENTIAL=<your device credential>
export STORAGE_ACCOUNT=<your storage account name>
export STORAGE_ACCESS_KEY=<your storage account key>
export PORT=<port>
docker run -d -p $PORT:$PORT -e DEVICE_CREDENTIAL=$DEVICE_CREDENTIAL -e STORAGE_ACCOUNT=$STORAGE_ACCOUNT \ 
-e STORAGE_ACCESS_KEY=$STORAGE_ACCESS_KEY -e PORT=$PORT --name myhomestatusserver $DOCKERUSERNAME/myhomestatusserver:$VERSION
```

or in Azure Container Service (requires [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest))

```bash
export DOCKERUSERNAME=<your Docker Hub username>
export DEVICE_CREDENTIAL=<your device credential>
export STORAGE_ACCOUNT=<your storage account name>
export STORAGE_ACCESS_KEY=<your storage account key>
export PORT=<port>
export RESOURCE_GROUP=<your Azure Resource Group>
az login
az group create --name $RESOURCE_GROUP --location westeurope
az container create --output json --resource-group $RESOURCE_GROUP --name myhomestatusserver \
--cpu 1 --memory 1 --port $PORT --image $DOCKERUSERNAME/myhomestatusserver:$VERSION --ip-address public \
--environment-variables DEVICE_CREDENTIAL=$DEVICE_CREDENTIAL STORAGE_ACCOUNT=$STORAGE_ACCOUNT \
STORAGE_ACCESS_KEY=$STORAGE_ACCESS_KEY PORT=$PORT
az container show --name myhomestatusserver --resource-group $RESOURCE_GROUP
```