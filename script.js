/* global tm */

const mainEl = document.querySelector('#container');

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Let’s teach your computer to recognize how many fingers you hold up.`,
    description: tm.html`Click "Start", You'll need to allow access to your webcam. Note that your images stay private to you and do not leave your computer.`
  },
  classes: [
    {
      name: "1 finger",
      title: "“Record examples with your index finger up.",
      description:
        "Hold the button and take at least 20 pictures with your index finger up. Make sure that your hand is in frame for every example."
    },
    {
      name: "2 fingers",
      title: "Record examples with your index and middle fingers up.",
      description:
        "Take at least 20 pictures with your index and middle fingers up. Make sure that your hand is in frame for every example."
    },
    {
      name: "3 fingers",
      title: "“Record examples with your thumb, index, and middle fingers up.",
      description:
        "Hold the button and take at least 20 pictures with your thumb, index, and middle fingers up. Make sure that your hand is in frame for every example."
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll('.prediction-image');
    let highestProb = Number.MIN_VALUE;
    let highestIndex = -1;
    predictions.forEach((pred, i) => {
      if (pred.probability > highestProb) {
        highestProb = pred.probability;
        highestIndex = i;
      }
    });
    images.forEach((img, i) => {
      if (i === highestIndex) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onReady: () => {
    const inferenceCamera = wizard.createInferenceCamera({
      size: 270
    
    });
    const cameraContainer = document.querySelector('#inference-camera-container');
    cameraContainer.appendChild(inferenceCamera);
    mainEl.classList.add('ready');
  }
});

document.querySelector('#train-model-button').addEventListener('click', () => wizard.open());
