const child_process = require('child_process');

const mmls = (filePath) => {

  let output = '';

  // Run MMLS and grab relevant data from output
  output = child_process.execSync(`C:\\sleuthkit-4.12.0-win32\\bin\\mmls.exe ${filePath}`).toString();

  console.log("Output is " + output);

  return output;
}

exports.mmls = mmls;


