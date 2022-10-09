export function stringToFile(data: string, name: string) {
  const imageBlob = dataURItoBlob(data);

  return new File([imageBlob], name, { type: 'image/png' });
}

function dataURItoBlob(data: string) {
  const byteString = window.atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([int8Array], { type: 'image/png' });

  return blob;
}
