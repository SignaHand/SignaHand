/*
 * export default component name: signatureDisplay
 * dev: dev: kimminsu31415
 * description: Edit 컴포넌트의 왼쪽 부분 / 모달창 키는 버튼, 나가기 버튼 등
 * */
import React, { useRef } from "react";
import SignatureModal from "../modal/SignatureModal";
import { useHandContext } from "../../../../context/HandContext";
import {Link} from "react-router-dom";


const SignatureDisplay: React.FC = () => {
  const signModal = useRef<HTMLDialogElement | null>(null);

  // 모달창 노출 여부 state
  const { setCanvas } = useHandContext();

  // 서명 캔버스 띄우기
  const openModal = () => {
    setCanvas("view");
    if (signModal.current) {
      signModal.current.showModal();
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <Link to="/" className="mb-4">
          <button className="w-[75px] h-[70px] left-[5px] top-[5px] absolute" style={{position: "fixed", }}> {/* 나가기 버튼 */}
            <div className="w-[75px] h-[70px] left-0 top-0 absolute bg-white rounded-[10px] shadow-lg border border-stone-300"></div>
            <img
              className="w-[50px] h-[50px] left-[12px] top-[10px] absolute"
              src="/assets/images/Checkbox.png"
            />
          </button>
        </Link>

        {/* 사인 추가 칸 */}
        <button
          className="flex items-center justify-center w-[200px] h-[150px] bg-white shadow-lg border border-stone-300"
          onClick={openModal}
          style={{position: "fixed", top: "100px", }}
        >
          <dialog ref={signModal} className="modal">
            <SignatureModal
              // setModalOpen={setModalOpen}
              id={1} // 실제 데이터로 변경하기..
              title="모달 제목"
              content="모달 내용"
              writer="작성자"
              modal={signModal}
            />
          </dialog>
          <img src="/assets/images/signplus.png" />
        </button>
      </div>
    </>
  );
};

export default SignatureDisplay;

// justify-center