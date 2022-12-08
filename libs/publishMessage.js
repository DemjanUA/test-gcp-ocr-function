// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

const topicID = 'image-recognition-result';

module.exports = async function publishMessage(data) {
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient
      .topic(topicID)
      .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}
