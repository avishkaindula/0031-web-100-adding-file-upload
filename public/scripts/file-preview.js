const filePickerElement = document.getElementById("image");
// This will get the tag with the image id on new-user.ejs

const imagePreviewElement = document.getElementById("image-preview");

function showPreview() {
  const files = filePickerElement.files;
  // .files property will give us access to the file that was selected.
  // theoretically we can have more than one file so this will give the
  // output as an array So We also need to get the "first" and
  // only file on that array by using => const pickedFile = files[0];

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }
  // We might have picked a file and then unselect it after.
  // For such cases, we need to make sure that the file preview is also disappear when the user unselect
  // The files using the "cancel" button from the select window.
  // We can do that by using the above code.

  const pickedFile = files[0];
  // This will give us access to the first and only file on the files array.

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  // .createObjectURL is a utility method built into the browser
  // This will take a file and convert it to a URL that can be used as an image source.
  // It's important to understand that at this point, the file has not been uploaded yet.
  // So we're not generating a URL to a file that is on our server.
  // The file is still on the computer of the user.
  // So this method will simply create a "local" URL which only works on the computer of
  // this visitor to this file on the visitor's computer.
  // And now we can use this local url as the value of src= attribute of our "preview image element".
  imagePreviewElement.style.display = "block";
  // This will make the style.display of the imagePreviewElement from "none" to "block"
  // when this function executes.
}

filePickerElement.addEventListener("change", showPreview);
// "change" is an event that will be emitted whenever the value picked in this input will change.
