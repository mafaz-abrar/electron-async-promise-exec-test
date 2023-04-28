const sleuthkitVolumeSystemTools = require('./sleuthkit-volume-system-tools');

function processPartitionsOutputIntoFile(file, stdout) {
  // The data is split into lines, this makes parsing it a whole lot easier,
  // possibly less efficient than splitting once by ' ' and working with that, but this is way easier to understand

  let lines = stdout.split('\n');

  // Partition table 'type' is stored on the first line
  file.partitionTableType = lines[0];

  // Sector size is in the string on the 3rd line
  // This will split the string into words, then get the 4th word (512-byte), 
  // split it at the '-', and get the first string in that array, which is 512
  file.sectorSize = lines[2].split(' ')[3].split('-')[0];

  file.partitions = [];

  // Loop from index 5 (the start of the partition table)
  // Must use lines.length - 1 because there is a trailing newline at the end of the output
  for(let i = 5; i < lines.length - 1; i++) {
    // We split the parition table by space, but it uses a number of spaces as tab alignment, so the filter removes the extra ones
    let partitionData = lines[i].split(' ').filter((str) => str !== '');

    // Read relevant data into an object
    let partition = {};
    partition.slot = partitionData[1];
    partition.start = partitionData[2];
    partition.end = partitionData[3];
    partition.length = partitionData[4];
    partition.description = partitionData[5];

    file.partitions[i - 5] = partition;
  }
}

const getPartitions = (filePath) => {
  let file = {}

  let output = sleuthkitVolumeSystemTools.mmls(filePath);

  processPartitionsOutputIntoFile(file, output);
  
  return file;
}

exports.getPartitions = getPartitions;