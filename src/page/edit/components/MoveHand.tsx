/*
* export default module name: MoveHand
* dev: seon5
* description: 저장된 서명을 클릭했을 때 렌더링되며, 복제된 서명 이미지의 위치와 크기를 조절하고 고정시킴
* */

import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { moveImg } from "../../../utils/moveImg";
import { useResizeContext } from "../../../context/HandContext";

interface MoveHandProps {
  onFinish: () => void;
}


const MoveHand: React.FC<MoveHandProps> = ({onFinish}) => {
  const webcamRef = useRef<Webcam>(null); // 웹캠과 캔버스 요소에 대한 ref 생성
  const resultsRef = useRef<Results>();  // Results : 손 인식 결과
  const { copiedSigns1, copiedSigns2, selectedSign } = useResizeContext();

  

  const ResultsListener = (results: Results) => {
    resultsRef.current = results;
    const handMode = moveImg(results);
    let copiedImgRef;
  
    if (selectedSign == 1) { // 첫 번째 서명 클릭한 경우
      const lastCopiedImage = copiedSigns1[copiedSigns1.length - 1];
      copiedImgRef = lastCopiedImage.ref;
    } else if (selectedSign == 2) { // 두 번째 서명 클릭한 경우
      const lastCopiedImage = copiedSigns2[copiedSigns2.length - 1];
      copiedImgRef = lastCopiedImage.ref;
    }
    
    if(copiedImgRef && copiedImgRef.current){
        // 위치 조절을 위한 변수
        let currentLeft = (copiedImgRef.current.style.left);
        let currentTop = (copiedImgRef.current.style.top);
        currentLeft=currentLeft.replace('px', "");
        currentTop=currentTop.replace('px', "");

        // 크기 조절을 위한 변수
        let currentWidth = (copiedImgRef.current.style.width);
        currentWidth=currentWidth.replace('px', "")

        if(handMode == "moveRight") { // 오른쪽, 왼쪽, 아래, 위로 서명 위치 이동
          const newLeft = Number(currentLeft) - 1;
          copiedImgRef.current.style.left = newLeft.toString() + "px";
        } else if(handMode == "moveLeft") {
          const newLeft = Number(currentLeft) + 1;
          copiedImgRef.current.style.left = newLeft.toString() + "px";
        } else if(handMode == "moveBottom") {
          const newTop = Number(currentTop) - 1;
          copiedImgRef.current.style.top = newTop.toString() + "px";
        } else if(handMode == "moveTop") {
          const newTop = Number(currentTop) + 1;
          copiedImgRef.current.style.top = newTop.toString() + "px";
        } else if(handMode == "sizeUp") { // 서명 사이즈 업, 다운
          const newWidth = Number(currentWidth) * 1.005;
          copiedImgRef.current.style.width = newWidth.toString() + "px";
        } else if(handMode == "sizeDown") { 
          const newWidth = Number(currentWidth) * 0.995;
          copiedImgRef.current.style.width = newWidth.toString() + "px";
        } else if(handMode == "save") { // pdf 파일 위에 고정
          onFinish();
        }
    }
  };


  useEffect(() => {
    const startCamera = async () => {
      if (webcamRef.current) {
        const hands = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });
    
        // 손 인식 설정 옵션
        hands.setOptions({
          // selfieMode : true,
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        
        hands.onResults(ResultsListener)
    
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null
        ) {
          const camera = new Camera(webcamRef.current.video!, {
            onFrame: async () => {
              try {
                await hands.send({ image: webcamRef.current!.video! });
              } catch(error) {
                console.log(error);
              }
            },
            width: 1280,
            height: 720,
          });
          camera.start();
        }
      }
    }

    startCamera();
  },[ResultsListener]);


  return (
    <div>
    <Webcam
      audio={false}
      // style={{ visibility: "hidden" }}
      mirrored = {true}
      width={1280}
      height={720}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
    />
  </div>
  );
};

export default MoveHand;