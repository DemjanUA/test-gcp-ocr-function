curl localhost:3000 \
  -X POST \
  -H "Content-Type: application/json" \
  -H "ce-id: 123451234512345" \
  -H "ce-specversion: 1.0" \
  -H "ce-time: 2020-01-02T12:34:56.789Z" \
  -H "ce-type: google.cloud.storage.object.v1.finalized" \
  -H "ce-source: //storage.googleapis.com/projects/_/buckets/test-cloud-bucket-370720" \
  -H "ce-subject: objects/images/113022-wt-104_IMG_20221130_104304.jpeg" \
  -d '{
        "bucket": "test-cloud-bucket-370720",
        "contentType": "image/jpeg",
        "crc32c": "ga256w==",
        "etag": "CJCarqLQ6PsCEAE=",
        "generation": "1670454587395344",
        "id": "test-cloud-bucket-370720/images/113022-wt-104_IMG_20221130_104304.jpeg/1670454587395344",
        "kind": "storage#object",
        "md5Hash": "mhAFng7DE/+kgbZDKJb2YQ==",
        "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/test-cloud-bucket-370720/o/images%2F113022-wt-104_IMG_20221130_104304.jpeg?generation=1670454587395344&alt=media",
        "metageneration": "1",
        "name": "images/113022-wt-104_IMG_20221130_104304.jpeg",
        "selfLink": "https://www.googleapis.com/storage/v1/b/test-cloud-bucket-370720/o/images%2F113022-wt-104_IMG_20221130_104304.jpeg",
        "size": "1480132",
        "storageClass": "STANDARD",
        "timeCreated": "2022-12-07T23:09:47.403Z",
        "timeStorageClassUpdated": "2022-12-07T23:09:47.403Z",
        "updated": "2022-12-07T23:09:47.403Z"
      }'