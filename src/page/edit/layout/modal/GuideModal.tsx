import React, { useRef, useEffect } from "react";
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

const GuideModal: React.FC<SignatureModalProps> = ({
  id,
  title,
  content,
  writer,
  modal,
}) => {
  const [isClose, setIsClose] = React.useState<number>(0);

  // 서명 모달창 close 기능을 위한 핸들러 함수
  const closeModal = async () => {
    setIsClose(isClose + 1);
  };

  // useEffect를 사용하여 isClose 상태가 변경될 때마다 모달이 닫히도록 함
  useEffect(() => {
    const closeModalWithEffect = async () => {
      if (modal.current) {
        modal.current.close();
      }
    };
    closeModalWithEffect();
  }, [isClose]);

  return (
    <div className="w-full h-3/6">
      <div className="flex items-center justify-center h-full">
        <div className="w-5/12 h-full bg-white rounded-lg shadow-lg">
          <div className="w-full h-20 px-3 bg-red-500 rounded-lg flex items-center justify-between">
            <div className="w-52 h-12 text-white text-3xl font-normal font-['Inter']">
              손동작 가이드
            </div>
            <div className="w-28 h-10">
              <button
                className="w-28 h-10 text-center bg-white rounded-3xl text-stone-500 text-xl font-normal"
                onClick={closeModal}
              >
                close
              </button>
            </div>
          </div>
          <img
            className="w-10/12 mx-auto pt-5 pb-20 px-10 center"
            src="/assets/images/guideSummary.png"
          />
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
