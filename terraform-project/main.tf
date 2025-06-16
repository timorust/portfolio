provider "aws" {
  region = var.aws_region
}

module "s3_static_site" {
  source = "./modules/s3_static_site"
  bucket_name = var.bucket_name
  index_document = "index.html"
  error_document = "404.html"
}
