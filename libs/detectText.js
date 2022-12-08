const ExifImage = require('exif-async')

const downloadFile = require('./downloadFile')
const convertDMSToDD = require('./convertDMSToDD')

const dictionary = {
  battery: 'BATTERY',
  power: 'POWER',
  miles: '%',
  level: 'LVL'
}

/**
 * Detects the text in an image using the Google Vision API.
 *
 * @param {string} bucketName Cloud Storage bucket name.
 * @param {string} filename Cloud Storage file name.
 * @returns {Promise}
 */
 const detectText = async (vision, bucketName, filename) => {
  try {
    console.log(`Looking for text in image filename: ${filename} | bucketName: ${bucketName}`)

    const [textDetections] = await vision.textDetection(
      `gs://${bucketName}/${filename}`
    )
    const annotations = textDetections.textAnnotations
    const record = {
      name: filename,
    }
  
    if(!Array.isArray(annotations) || annotations.length == 0) {
      throw new Error("No dashboard data")
    }
  
    // Form a header from first item in the annotation array
    const header = annotations.shift();
  
    if (header.description != null) {
      // record detected text
      console.info('#OUTPUT 1', filename, JSON.stringify({
        annotation: header.description
      }, null, 2))
    }
  
    Object.keys(dictionary).forEach((property) => {
      const index = annotations.findIndex((annotation) => {
        return annotation.description === dictionary[property];
      });
  
      if (index != -1) {
        if (annotations[index + 1] != null) {
          record[property] = annotations[index + 1].description;
        }
      }
    });
  
    const index = annotations.findIndex(annotation => annotation.description === "mph");
    if (index > 0) {
      record["mph"] = annotations[index - 1].description;
    }

    // Download file and Extract GeoData using ExifImage
    const fileBuffer = await downloadFile(bucketName, filename)

    const exif = await ExifImage(fileBuffer);
    if (exif.exif != null) {
      record.date = exif.exif.DateTimeOriginal;
    }

    if (exif.gps != null) {
      record.latitude = convertDMSToDD(
        exif.gps.GPSLatitude,
        exif.gps.GPSLatitudeReF
      );
      record.longitude = convertDMSToDD(
        exif.gps.GPSLongitude,
        exif.gps.GPSLongitudeRef
      );
    }
  
    console.info('#OUTPUT 2', filename, JSON.stringify(record, null, 2))

    return record
  } catch (error) {
    console.error(error)
  }
};

module.exports = detectText