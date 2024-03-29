const child_process = require('child_process');

// I want to run sleuth kit commands asynchronously.
// To do this, we must wrap the child process in a Promise.

const execMmlsWithPromise = (filePath) => {
  return new Promise((resolve, reject) => {
    
    // Run MMLS and grab relevant data from output
    child_process.exec(`mmls ${filePath}`, 
      (err, stdout, stderr) => {
        if (err) {
          console.log("An error occurred! " + err);
          reject(err);
        }

        if (stderr) {
          console.log("An error occurred! " + stderr);
          reject(stderr);
        }

        console.log("Output is \n" + stdout);
        resolve(stdout);
      }
    );
  });
}


exports.mmls = execMmlsWithPromise;


