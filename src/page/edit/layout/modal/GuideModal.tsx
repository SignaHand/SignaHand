import React, { useEffect, useState } from "react";

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
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/images/guideSummary.png",
    "/assets/images/guide1.png",
    "/assets/images/guide2.png",
    "/assets/images/guide3.png",
    "/assets/images/guide4.png",
  ];

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
        <div className="flex w-5/12 h-full bg-white rounded-lg shadow-lg">
          <div className="flex flex-col w-full">
            <div className="h-1/6">
              <div className="w-full h-full px-3 bg-red-500 rounded-lg flex items-center justify-between">
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
            </div>
            <div className="h-4/6">
              <img
                className="w-4/5 mx-auto pt-5 pb-10 px-10 center"
                src={images[currentImage]}
              />
            </div>
            <div className="h-1/6">
              <div className="h-20 items-center justify-center">
                <button
                  className="w-28 h-10 text-center bg-red-500 rounded-3xl text-white text-xl font-normal"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {/* <div className="w-full h-20 px-3 bg-red-500 rounded-lg flex items-center justify-between">
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
            className="w-10/12 mx-auto pt-5 pb-10 px-10 center"
            src={images[currentImage]}
          />
          <div className="fixed w-full items-center justify-center h-20">
            <button onClick={handleNext}>Next</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
