#/bin/bash
BUCKET_NAME=$1

cd _deploy/terraform
echo $'>> Initializing Terraform backend...'
terraform init -force-copy
if [ $? -ne 0 ]; then
    echo "Terraform initialisation failed"
    exit $?
fi
echo "Terraform initialised"

echo $'>> Executing Terraform apply...'
terraform apply \
  -var="s3_bucket_name=$BUCKET_NAME" \
  -auto-approve
if [ $? -ne 0 ]; then
    echo "Terraform apply failed"
    exit $?
fi
echo "Changes applied"