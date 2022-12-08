// Get a reference to the Cloud Vision API component
const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient();

const detectText = require('./libs/detectText');
const publishMessage = require('./libs/publishMessage');

console.debug('ENV', process.env.ENV)

/**
 * This function is exported by index.js, and is executed when
 * a file is uploaded to the Cloud Storage bucket you created
 * for uploading images.
 *
 * @param {object} event A Google Cloud Storage File object.
 */
 exports.lambda = async event => {
  const { bucket, name } = process.env.ENV === 'local' ? event.data : event;
  console.log(event)

  if (!bucket) {
    throw new Error(
      'Bucket not provided. Make sure you have a "bucket" property in your request'
    );
  }
  if (!name) {
    throw new Error(
      'Filename not provided. Make sure you have a "name" property in your request'
    );
  }

  try {
    const record = await detectText(vision, bucket, name);

    // Publish result into Pub/Sub topic
    await publishMessage(JSON.stringify(record, null, 2))

    console.log(`========================== File ${name} processed.`);
  } catch (error) {
    console.error(error)
  }
};

