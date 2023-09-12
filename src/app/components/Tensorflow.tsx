// 'use client';
import * as tmImage from '@teachablemachine/image';

const TFURL = "https://teachablemachine.withgoogle.com/models/D0oa8NKP_/";
let model: any;

// 모델 초기화
async function TFInit() {
    const modelURL = TFURL + "model.json";
    const metadataURL = TFURL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
}

TFInit();

// 결과 반환
async function predict(image: HTMLImageElement) {
    const prediction = await model.predict(image);
    return prediction;
}

// 이미지 업데이트 및 결과 반환
export async function updateImageDisplay(
    preview: HTMLElement, imageInputElement: HTMLInputElement
) {
    preview.removeChild(preview.firstChild!);

    const imageFile = imageInputElement.files![0];
    const previewImage = document.createElement("img");
    previewImage.src = URL.createObjectURL(imageFile);
    previewImage.style.width = "100%";
    previewImage.style.height = "100%";
    previewImage.style.objectFit = "cover";

    preview.prepend(previewImage);

    await delay(2000);
    return await predict(previewImage);

}

// promise 딜레이
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}