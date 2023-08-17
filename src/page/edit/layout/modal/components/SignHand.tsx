/*
* export default component name: SignHand
* dev: seon5
* description: 서명 추가 버튼 클릭시 렌더링되는 서명을 위한 컴포넌트
* */
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
import { drawCanvas } from "../../../../../utils/drawCanvas";
import { useHandContext } from "../../../../../context/HandContext";

interface HandProps {
  onCloseModal: () => void;
}

const SignHand: React.FC<HandProps> = ({onCloseModal}) => {
  const webcamRef = useRef<Webcam>(null); // 웹캠과 캔버스 요소에 대한 ref 생성
  const canvasRef = useRef<HTMLCanvasElement>(null); // 서명을 위한 canvas
  const canvasRefTop = useRef<HTMLCanvasElement>(null); // 검지 랜드마크를 그리기 위한 canvas
  const resultsRef = useRef<Results>();  // Results : 손 인식 결과
  const [coordList] = useState<{ x: number; y: number }[]>([]); // 랜드마크 좌표 저장
  const { handleBaseDataUrlChange } = useHandContext();


  // 검출결과（프레임마다 호출됨）
  // Hands 클래스가 랜드마크 인식 작업의 결과를 반환할 때 ResultsListener가 호출됨
  // ResultsListener 콜백 함수는 손의 랜드마크 인식 결과가 convasRef에 그려지도록 함
  const ResultsListener = (results: Results) => {
    resultsRef.current = results;

    const canvasCtx = canvasRef.current!.getContext("2d")!;
    const canvasCtxTop = canvasRefTop.current!.getContext("2d")!;
    const baseDataUrl = drawCanvas(canvasCtx, results, coordList, canvasCtxTop);

    handleBaseDataUrlChange(baseDataUrl); // 콜백 호출해 부모 컴포넌트 Work로 base64 문자열 전달
    
    if(baseDataUrl !== ''){
      onCloseModal();
      console.log("close modal");
    }
  };


  // 초기 설정
  // Hands 클래스 초기화
  // locateFile 함수를 사용해 웹어셈블리 파일들이 위치한 경로를 동적으로 설정
  useEffect(() => {
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
    

    // ResultsListener 함수를 등록하는 역할
    // 손 인식 결과가 발생할 때마다 ResultsListener 함수를 호출하도록 설정한다.
    hands.onResults(ResultsListener)

    // Camera 클래스를 사용해 웹캠 스트림 다루는 camera 객체 생성
    // <video> 요소에 대한 참조
    // Camera 객체의 onFrame 속성에 콜백 함수 등록. 프레임 캡처될 때마다 실행됨
    // 웹캠에서 프레임 캡처하고, 해당 프레임을 Hands 객체로 전송

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
        width: 920,
        height: 515,
      });
      camera.start();
    }
  
    

    // Hand 컴포넌트 렌더링된 후 canvas 초기화
    const canvasCtx = canvasRef.current!.getContext("2d")!;
    canvasCtx.fillStyle = '#FFF';
    canvasCtx.globalAlpha = 0.0; 
    canvasCtx.fillRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

    
  },[ResultsListener]);


  return (
    <div>
    {/* 비디오 캡쳐 */}
    <Webcam
      audio={false}
      // style={{ visibility: "hidden" }}
      mirrored = {true}
      width={920}
      height={515}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{ width: 920, height: 515, facingMode: "user" }}
    />
    {/* 캔버스 */}
    <div style={{ position: 'relative', width: '920px', height: '515px'}}>
      <canvas style={{ position: "absolute", top: "0px", left:"0px" }}
        ref={canvasRef}
        width={920}
        height={515}
      />
      <canvas style={{ position: "absolute", top: "0px", left:"0px" }}
        ref={canvasRefTop}
        width={920}
        height={515}
      />
    </div>
  </div>
  );
};

export default SignHand;