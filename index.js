const imgElement = document.getElementById('imageSrc');
const inputElement = document.getElementById('fileInput');
const loader = document.querySelector('.loader');
const canvas = document.getElementById('canvasOutput');

inputElement.addEventListener('change', (e) => {
  canvas.style.display = 'none';
  imgElement.style.display = 'none';
  loader.style.display = 'block';
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function() {
  let src = cv.imread(imgElement);
  let dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  cv.Canny(src, dst, 50, 100, 3, false);
  cv.imshow('canvasOutput', dst);

  const image = canvas.toDataURL();
  const aDownloadLink = document.createElement('a');
  aDownloadLink.download = `${imgElement.src}.png`;
  aDownloadLink.href = image;
  aDownloadLink.click();

  canvas.style.display = 'block';
  imgElement.style.display = 'block';

  src.delete();
  dst.delete();
  loader.style.display = 'none';
};
