import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const TFURL = "https://teachablemachine.withgoogle.com/models/D0oa8NKP_/";
let model: any//, maxPredictions: any;

// 모델 초기화
async function TFInit(/*{ progressBarContainerRef }: { progressBarContainerRef: HTMLElement }*/) {
    const modelURL = TFURL + "model.json";
    const metadataURL = TFURL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);

    // progressBarContainer = progressBarContainerRef;
    // return model.getTotalClasses();
}

TFInit();

// 결과 반환
async function predict(image: HTMLImageElement) {
    const prediction = await model.predict(image);
    // for (let i = 0; i < maxPredictions; i++) {
    //     classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     progressBarContainer.childNodes[i].innerHTML = classPrediction;
    // }
    return prediction;
}

// 이미지 업데이트 및 결과 반환
export async function updateImageDisplay(
    preview: HTMLElement, imageInputElement: HTMLInputElement
) {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const imageFile = imageInputElement.files![0];
    const previewImage = document.createElement("img");
    previewImage.src = URL.createObjectURL(imageFile);
    previewImage.style.width = "100%";
    previewImage.style.height = "100%";
    previewImage.style.objectFit = "cover";

    preview.appendChild(previewImage);

    await delay(1500);
    return await predict(previewImage);

}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}