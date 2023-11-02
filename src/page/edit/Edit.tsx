/*
 * export default component name: Edit
 * dev: kimminsu31415
 * description: Home.tsx 파일에서 'work' 버튼을 누르면 나오는 페이지
 * */
import React, {useState, useRef, useEffect} from "react";
import { useHandContext, useResizeContext } from "../../context/HandContext";
import { useLocation } from "react-router";
import PdfDisplay from "./layout/pdfDisplay/PdfDisplay";
import SignatureDisplay from "./layout/signatureDisplay/SignatureDisplay";
import PreviewDisplay from "./layout/previewDisplay/PreviewDisplay";
import MoveHand from "./components/MoveHand";
import {usePageContext} from "../../context/PageContext";

const Edit: React.FC = () => {
  const { baseDataUrlArr } = useHandContext(); // 서명 이미지 문자열이 저장된 배열
  const { imgRef, imgRef2, imgRef3, imgRef4, imgRef5, imgRef6, signWidth } =
    useResizeContext(); // 서명 이동&크기 조절을 위한 Context

  /* Home 컴포넌트에서 사용자에게 입력받은 PDF 파일 넘겨받기*/
  const location = useLocation();
  const file = location.state.file;

  // <MoveHand> 렌더링 여부
  const [moveHand, setMoveHand] = useState("non-view");

  const newImageRef = useRef<HTMLImageElement>(null);

  // 드래그가 시작될 때 호출되는 함수
  function handleDragStart(e: React.DragEvent<HTMLImageElement>) {
    if (!e.target) return;
    const target = e.target as HTMLImageElement;
    // 드래그 대상의 id를 DataTransfer 객체에 저장
    e.dataTransfer.setData("text/plain", target.id);
  }

  function drawSignature(
    imgRef: React.RefObject<HTMLImageElement>,
    dx: number,
    dy: number
  ) {
    // canvas 요소 가져오기
    const canvas: HTMLCanvasElement = document.getElementById(
      "pdfCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 싸인 이미지를 생성하고 로드
    const signature = new Image();
    signature.src = imgRef.current?.src as string;
    if (signature) {
      signature.onload = function () {
        ctx.drawImage(signature, dx, dy, 150, 84);
      };
    }
  }

  return (
    <>
      <div className="grid grid-cols-10 h-full">
        <div className="col-span-2">
          {/* 저장되는 서명 렌더링 */}
          {baseDataUrlArr[0] != undefined && (
            <img
              id="signatureImage"
              draggable
              onDragStart={(e) => handleDragStart(e)}
              className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
              src={baseDataUrlArr[0]}
              ref={imgRef}
              style={{
                width: signWidth,
                position: "fixed",
                left: "5%",
                top: "300px",
              }}
              // onClick={startResize1}
              onClick={() => drawSignature(imgRef, 420, 255)}
            />
          )}
          {baseDataUrlArr[1] != undefined && (
            <img
              id="signatureImage2"
              draggable
              onDragStart={(e) => handleDragStart(e)}
              className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
              src={baseDataUrlArr[1]}
              ref={imgRef2}
              style={{
                width: signWidth,
                position: "fixed",
                left: "5%",
                top: "500px",
              }}
              // onClick={startResize2}
              onClick={() => drawSignature(imgRef2, 420, 270)}
            />
          )}
          {baseDataUrlArr[2] != undefined && (
            <img
              id="signatureImage3"
              draggable
              onDragStart={(e) => handleDragStart(e)}
              className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
              src={baseDataUrlArr[2]}
              ref={imgRef3}
              style={{
                width: signWidth,
                position: "fixed",
                left: "5%",
                top: "700px",
              }}
              // onClick={startResize3}
              onClick={() => drawSignature(imgRef3, 420, 285)}
            />
          )}
          {baseDataUrlArr[3] != undefined && (
            <img
              id="signatureImage4"
              draggable
              onDragStart={(e) => handleDragStart(e)}
              className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
              src={baseDataUrlArr[3]}
              ref={imgRef4}
              style={{
                width: signWidth,
                position: "fixed",
                left: "5%",
                top: "900px",
              }}
              // onClick={startResize3}
              onClick={() => drawSignature(imgRef4, 420, 300)}
            />
          )}
          {baseDataUrlArr[4] != undefined && (
            <img
              id="signatureImage5"
              draggable
              onDragStart={(e) => handleDragStart(e)}
              className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
              src={baseDataUrlArr[4]}
              ref={imgRef5}
              style={{
                width: signWidth,
                position: "fixed",
                left: "5%",
                top: "1100px",
              }}
              // onClick={startResize3}
              onClick={() => drawSignature(imgRef5, 420, 315)}
            />
          )}
          {baseDataUrlArr[5] != undefined && (
            <img
              id="signatureImage6"
              draggable
              onDragStart={(e) => handleDragStart(e)}
              className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
              src={baseDataUrlArr[5]}
              ref={imgRef6}
              style={{
                width: signWidth,
                position: "fixed",
                left: "5%",
                top: "1300px",
              }}
              // onClick={startResize3}
              onClick={() => drawSignature(imgRef6, 420, 330)}
            />
          )}
          <SignatureDisplay />
        </div>

        <div className="col-span-6" style={{ backgroundColor: "#CECECE" }}>
          <PdfDisplay file={file} />
        </div>

        <div className="col-span-2">
          <PreviewDisplay file={file} />
        </div>

        {/* 서명 위치&크기 조절을 위한 <MoveHand> 렌더링 */}
        <div>
          {moveHand == "view" && (
            <MoveHand
              onFinish={() => {
                setMoveHand("non-view");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
