terraform {
  backend "s3" {
    key     = "todo"
    region  = "eu-west-1"
    bucket  = "tm-terraform-dev"
  }
}

provider "aws" {
  region    = "eu-west-1"
}

# variables

variable s3_bucket_name {
}

# data

data "aws_iam_policy_document" "website_bucket_policy" {
  statement {
    sid         = "AddPerm"
    effect      = "Allow"
    principals  = {
      type        = "*"
      identifiers = ["*"]
    }
    actions     = ["s3:GetObject"]
    resources   = [
      "arn:aws:s3:::www.${var.s3_bucket_name}",
      "arn:aws:s3:::www.${var.s3_bucket_name}/*"
      ]
  }
}

data "aws_iam_policy_document" "redirect_bucket_policy" {
  statement {
    sid         = "AddPerm"
    effect      = "Allow"
    principals  = {
      type        = "*"
      identifiers = ["*"]
    }
    actions     = ["s3:GetObject"]
    resources   = [
      "arn:aws:s3:::${var.s3_bucket_name}",
      "arn:aws:s3:::${var.s3_bucket_name}/*"
      ]
  }
}

# s3

resource "aws_s3_bucket" "s3_bucket_website" {
  bucket        = "www.${var.s3_bucket_name}"
  acl           = "public-read"
  policy        = "${data.aws_iam_policy_document.website_bucket_policy.json}"
  force_destroy = true

  website {
    index_document  = "index.html"
    error_document  = "error.html"
  }
}

resource "aws_s3_bucket" "s3_bucket_redirect" {
  bucket  = "${var.s3_bucket_name}"
  acl     = "public-read"
  policy  = "${data.aws_iam_policy_document.redirect_bucket_policy.json}"

  website {
    redirect_all_requests_to  = "www.${var.s3_bucket_name}"
  }
}