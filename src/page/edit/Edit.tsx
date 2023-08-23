/*
 * export default component name: Edit
 * dev: kimminsu31415
 * description: Home.tsx 파일에서 'work' 버튼을 누르면 나오는 페이지
 * */
import React, { useState, useRef } from "react";
import { useHandContext, useResizeContext } from "../../context/HandContext";
import { useLocation } from "react-router";
import PdfDisplay from "./layout/pdfDisplay/PdfDisplay";
import SignatureDisplay from "./layout/signatureDisplay/SignatureDisplay";
import PreviewDisplay from "./layout/previewDisplay/PreviewDisplay";
import MoveHand from "./components/MoveHand";

const Edit: React.FC = () => {
  const { baseDataUrlArr } = useHandContext(); // 서명 이미지 문자열이 저장된 배열
  const {
    imgRef,
    imgRef2,
    signWidth,
    copiedSigns1,
    setCopiedSigns1,
    copiedSigns2,
    setCopiedSigns2,
    setSelectedSign,
  } = useResizeContext(); // 서명 이동&크기 조절을 위한 Context

  /* Home 컴포넌트에서 사용자에게 입력받은 PDF 파일 넘겨받기*/
  const location = useLocation();
  const file = location.state.file;

  // <MoveHand> 렌더링 여부
  const [moveHand, setMoveHand] = useState("non-view");

  const newImageRef = useRef<HTMLImageElement>(null);

  // 서명 복제, 위치&크기 조절 시작하기
  const startResize1 = () => {
    setMoveHand("view");
    setCopiedSigns1([
      ...copiedSigns1,
      { id: copiedSigns1.length, ref: newImageRef },
    ]);
    setSelectedSign(1);
  };
  const startResize2 = () => {
    setMoveHand("view");
    setCopiedSigns2([
      ...copiedSigns2,
      { id: copiedSigns2.length, ref: newImageRef },
    ]);
    setSelectedSign(2);
  };

  // 렌더링된 서명 이미지 클릭 시 제거
  const handleSignClick1 = (imgId: number) => {
    console.log("id", imgId, " 이미지 제거");
    setCopiedSigns1(copiedSigns1.filter((imgInfo) => imgInfo.id !== imgId));
    setMoveHand("non-view");
  };
  const handleSignClick2 = (imgId: number) => {
    console.log("id", imgId, " 이미지 제거");
    setCopiedSigns2(copiedSigns2.filter((imgInfo) => imgInfo.id !== imgId));
    setMoveHand("non-view");
  };

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

  //   <button
  //   className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
  //   style={{position: "fixed", top: "300px", }}
  // >

  // </button>

  return (
    <>
      <div className="grid grid-cols-10 h-screen">
        <div className="col-span-2">
          {/* 저장되는 서명 렌더링 */}
          {baseDataUrlArr[0] != undefined && (
            <img
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
              onClick={() => drawSignature(imgRef, 320, 460)}
            />
          )}
          {baseDataUrlArr[1] != undefined && (
            <img
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
              onClick={() => drawSignature(imgRef2, 320, 500)}
            />
          )}
          <SignatureDisplay />
        </div>

        <div className="col-span-6" style={{ backgroundColor: "#CECECE" }}>
          <div>
            <PdfDisplay file={file} />
          </div>
          {/* 복제된 서명 렌더링 */}
          {copiedSigns1.map((imgInfo) => (
            <img
              key={imgInfo.id}
              src={baseDataUrlArr[0]}
              ref={imgInfo.ref}
              style={{
                width: signWidth,
                position: "absolute",
                left: "361px",
                top: "150px",
              }}
              onClick={() => {
                handleSignClick1(imgInfo.id);
              }}
            />
          ))}
          {copiedSigns2.map((imgInfo) => (
            <img
              key={imgInfo.id}
              src={baseDataUrlArr[1]}
              ref={imgInfo.ref}
              style={{
                width: signWidth,
                position: "absolute",
                left: "361px",
                top: "150px",
              }}
              onClick={() => {
                handleSignClick2(imgInfo.id);
              }}
            />
          ))}
        </div>

        <div className="col-span-2">
          <PreviewDisplay />
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
