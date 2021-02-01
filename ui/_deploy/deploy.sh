#/bin/bash

BUCKET_NAME=$1
BASE_API_URL=$2

echo "bucket name :: " $BUCKET_NAME

BASE_SSM_PATH="/deploy/dev/earl_of_east_london"

echo "getting creds from ssm :: " $BASE_SSM_PATH

AAK=$(aws ssm get-parameters --names "$BASE_SSM_PATH"/access.key --query Parameters[0].Value)
AAK="${AAK%\"}"
AAK="${AAK#\"}"

ASK=$(aws ssm get-parameters --names "$BASE_SSM_PATH"/secret.key --with-decryption --query Parameters[0].Value)
ASK="${ASK%\"}"
ASK="${ASK#\"}"

export AWS_ACCESS_KEY_ID=$AAK
export AWS_SECRET_ACCESS_KEY=$ASK
export VUE_APP_BASE_API_URL=$BASE_API_URL

npm install
npm run build

echo $'>> Copying files to bucket...'
aws s3 sync dist s3://www.$BUCKET_NAME --delete