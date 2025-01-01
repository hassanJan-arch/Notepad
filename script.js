async function saveNote() {
  const noteContent = document.getElementById('noteArea').value;
  const format = document.getElementById('formatSelect').value;
  let blob;
  let extension;

  if (format === 'txt') {
      blob = new Blob([noteContent], { type: 'text/plain' });
      extension = 'txt';
  } else if (format === 'html') {
      const htmlContent = `<html><body>${noteContent}</body></html>`;
      blob = new Blob([htmlContent], { type: 'text/html' });
      extension = 'html';
  } else if (format === 'md') {
      blob = new Blob([noteContent], { type: 'text/markdown' });
      extension = 'md';
  }

  const options = {
      types: [
          {
              description: `${format.toUpperCase()} Files`,
              accept: { [`text/${format}`]: [`.${extension}`] },
          },
      ],
  };
  const fileHandle = await window.showSaveFilePicker(options);
  const writableStream = await fileHandle.createWritable();
  await writableStream.write(blob);
  await writableStream.close();
  alert('Note saved successfully!');
}

async function openNote() {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const content = await file.text();
  document.getElementById('noteArea').value = content;
}
