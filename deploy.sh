#!/bin/bash

yarn build

pip install awscli --upgrade --user

# Sync the build folder with our S3 bucket
aws s3 sync build/ "s3://$S3_BUCKET" --acl public-read --delete

# Force-invalidate the now-outdated assets rather than waiting for them to expire
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /\*
