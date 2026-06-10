# Terraform state backend configuration
# This stores your Terraform state file remotely in S3
# Terraform workspaces automatically separate dev/prod states:
# - Dev: env:/dev/terraform.tfstate
# - Prod: env:/prod/terraform.tfstate


terraform {
  backend "s3" {
    bucket         = "mindfulminutes-cibi-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "mindfulminutes-cibi-terraform-state"
    encrypt        = true    
  }
}
