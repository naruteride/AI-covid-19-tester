import * as tmImage from '@teachablemachine/image';

const TFURL = "https://teachablemachine.withgoogle.com/models/D0oa8NKP_/";
let model: any, maxPredictions: any;

export async function init({ }) {
    const modelURL = TFURL + "model.json";
    const metadataURL = TFURL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function predict(image) {
    const prediction = await model.predict(image);
    for (let i = 0; i < maxPredictions; i++) {
        classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}


const imageInputElement = document.querySelector("#image");
const preview = document.querySelector(".preview");

imageInputElement.addEventListener("change", updateImageDisplay);

async function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const imageFile = imageInputElement.files[0];
    const para = document.createElement("p");

    para.textContent = imageFile.name;
    const previewImage = document.createElement("img");
    previewImage.src = URL.createObjectURL(imageFile);
    previewImage.style = `
                max-width: 20rem;
            `;

    preview.appendChild(previewImage);
    preview.appendChild(para);
    para.textContent = "3초만 기다려주세요!!"
    preview.appendChild(para);

    imageInputElement.style = `
                display: none;
            `;

    await delay(2000);

    await predict(previewImage);
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}