// Get a reference to the Cloud Storage component
const { Storage } = require('@google-cloud/storage')
const storage = new Storage()

async function downloadFile(bucketName, fileName) {
  try {
    // Downloads the file
    const [fileBuffer] = await storage.bucket(bucketName).file(fileName).download()
  
    console.log('#downloadFile', `${bucketName}/${fileName} downloaded`)

    return fileBuffer
  } catch (error) {
    console.error('#downloadFile', `Faild to download file ${bucketName}/${fileName}`, error)
  }
}

module.exports = downloadFile