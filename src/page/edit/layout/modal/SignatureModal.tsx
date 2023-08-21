/*
 * export default component name: SignatureModal
 * dev: kimminsu31415
 * description: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * */
//모달창 생성 파일
//document 에 mousedown 이벤트핸들러를 등록하고, 모달창 영역이 아닐 경우에만, modalOpen 상태를 false로 전환
import React, { useRef } from "react";
import { useHandContext } from "../../../../context/HandContext";
import SignHand from "./components/SignHand";

interface SignatureModalProps {
  // setModalOpen: (isOpen: boolean) => void,
  id: number;
  title: string;
  content: string;
  writer: string;
  modal: React.MutableRefObject<HTMLDialogElement | null>;
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  id,
  title,
  content,
  writer,
  modal,
}) => {
  const { canvas, setCanvas, handleBaseDataUrlChange } = useHandContext();

  const canvasRef = useRef<HTMLCanvasElement>(null); // 서명을 위한 canvas
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)

  // useEffect(() => {
  //     //이벤트 핸들러 함수
  //     const handler = (event: MouseEvent) => {
  //         // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  //         if (modal.current && !modal.current.contains(event.target as Node)) {
  //             setModalOpen(false);
  //         }
  //     };
  //
  //     //이벤트 핸들러 등록
  //     document.addEventListener('mousedown', handler);
  //
  //     return () => {
  //         // 이벤트 핸들러 해제
  //         document.removeEventListener('mousedown', handler);
  //     };
  // });

  const closeModal = () => {
    if (modal.current) {
      modal.current.close();
      setCanvas("non-view");
    }
  };

  // 서명 캔버스 초기화
  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");
      if (canvasCtx) {
        canvasCtx.clearRect(
          0,
          0,
          canvasCtx.canvas.width,
          canvasCtx.canvas.height
        );
      }
    }
  };

  // 서명 저장
  const saveCanvas = () => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");
      if (canvasCtx) {
        const canvasValue = canvasCtx.canvas;
        const base = canvasValue.toDataURL();

        handleBaseDataUrlChange(base); // 콜백 호출해 부모 컴포넌트 Work로 base64 문자열 전달

        if (base !== "") {
          closeModal();
        }
      }
    }
  };

  return (
    <>
      {/* <div>
        {canvas === "view" && (
          <div>
            <p>손으로 그리기!</p>
            <SignHand onCloseModal={closeModal} />
            <button className="btn" onClick={closeModal}>
              XXXXXXXXXX
            </button>
          </div>
        )}
      </div> */}

      <div>
        {canvas === "view" && (
          <div className="w-[920px] h-[515px] relative shadow">
            <div className="w-full h-full left-0 top-0 absolute bg-white rounded-3xl border border-black">
              <SignHand onCloseModal={closeModal} canvasRef={canvasRef} />
            </div>
            <div className="w-96 h-20 left-[230px] top-[230px] absolute">
              <div className="w-96 h-16 left-[50px] top-0 absolute text-center text-neutral-400 text-opacity-20 text-7xl font-normal">
                서명
              </div>
              <div className="w-[460px] h-px left-0 top-[79px] absolute border border-black border-opacity-40"></div>
            </div>
            <button
              className="w-32 h-16 left-[793px] top-[450px] absolute text-center text-red-600 text-xl font-normal"
              onClick={clearCanvas}
            >
              clear
            </button>
            <div className="w-96 h-px left-[-0px] top-[92px] absolute border border-stone-300 border-opacity-70"></div>
            <div className="w-28 h-10 left-[776px] top-[24px] absolute shadow">
              <div className="w-28 h-10 left-0 top-0 absolute bg-red-500 rounded-3xl border border-zinc-500" />
              <button
                className="w-28 h-10 left-0 top-0 absolute text-center text-white text-xl font-normal"
                onClick={saveCanvas}
              >
                save
              </button>
            </div>
            <div className="w-28 h-10 left-[30px] top-[24px] absolute shadow">
              <div className="w-28 h-10 left-0 top-0 absolute bg-white rounded-3xl border border-zinc-500" />
              <button
                className="w-28 h-10 left-0 top-0 absolute text-center text-stone-500 text-xl font-normal"
                onClick={closeModal}
              >
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignatureModal;
