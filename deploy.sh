#!/bin/bash

# Assicuriamoci che l'utente abbia gcloud configurato
if ! command -v gcloud &> /dev/null
then
    echo "Il comando gcloud non è stato trovato. Per favore installa il Google Cloud SDK."
    exit
fi

PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "Nessun progetto Google Cloud configurato. Esegui 'gcloud config set project IL_TUO_PROJECT_ID'"
    exit
fi

SERVICE_NAME="remotion-render-service"
REGION="europe-west1" # Cambia se preferisci un'altra regione

echo "Deploy di $SERVICE_NAME su Google Cloud Run nella regione $REGION in corso..."

# Invia la build a Cloud Build e fai il deploy su Cloud Run
# Usiamo un limite di istanze massime per prevenire costi alti e allochiamo 2GB di RAM per il rendering video.
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 1 \
  --max-instances 5 \
  --timeout 300s

echo "Deploy completato! Ora puoi inviare richieste POST all'URL del tuo nuovo servizio sull'endpoint /render."
