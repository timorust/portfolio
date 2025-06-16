resource "aws_s3_bucket" "static_site" {
  bucket = var.bucket_name
  website {
    index_document = var.index_document
    error_document = var.error_document
  }

  tags = {
    Name = "StaticSite"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.static_site.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "site_policy" {
  bucket = aws_s3_bucket.static_site.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = "*",
      Action = "s3:GetObject",
      Resource = "${aws_s3_bucket.static_site.arn}/*"
    }]
  })
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.static_site.id

  index_document {
    suffix = var.index_document
  }

  error_document {
    key = var.error_document
  }
}

output "website_url" {
  value = aws_s3_bucket.static_site.website_endpoint
}
