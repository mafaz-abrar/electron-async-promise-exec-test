// renderer.js

// The renderer file is the one directly included in the HTML web page, and
// is responsible for the client side code. 

// Due to Chrome's isolated process model, the renderer does not have direct access
// to Node. Instead, we have access to the `window` object.

// The window object is

const getPartitions = async (filePath) => await window.volumeSystemTools.getPartitions(filePath);

const getPartitionsButtonClicked = async () => {
  let filePath = document.getElementById("file-path-input").value;

  let outputDiv = document.getElementById("file-partitions");
  let partitions = await getPartitions(filePath);

  outputDiv.innerHTML = JSON.stringify(partitions);
}

const addPartitionsButtonEventHandler = () => {
  let btn = document.getElementById("get-partitions-btn");
  btn.addEventListener('click', getPartitionsButtonClicked);
} 

window.onload = () => {
  addPartitionsButtonEventHandler();
}
