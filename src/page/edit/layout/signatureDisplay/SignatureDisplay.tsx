/*
* export default component name: signatureDisplay
* dev: dev: kimminsu31415
* description: ~~~~~~~~~~~~
* */
import React, {useRef} from "react";
import SignatureModal from "../modal/SignatureModal";
import {useHandContext} from "../../../../context/HandContext";

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
    }

    return (
        <>
            <div>
                <div className="w-[60.03px] h-[0px] left-[265px] top-[72.02px] absolute origin-top-left -rotate-90 border border-black border-opacity-50"></div> {/*구분선*/}
                <button className="w-[75px] h-[70px] left-[177px] top-[2px] absolute"> {/* 한장씩 보기 */}
                    <div className="w-[75px] h-[70px] left-0 top-0 absolute bg-white rounded-[10px] shadow border border-zinc-400"></div>
                    <div className="w-8 h-[42px] left-[21px] top-[14px] absolute bg-white border border-black"></div>
                </button>
                <button className="w-[75px] h-[70px] left-[276px] top-[2px] absolute"> {/* 겹겹이 보기 */}
                    <div className="w-[75px] h-[70px] left-0 top-0 absolute bg-white rounded-[10px] shadow border border-zinc-400"></div>
                    <div className="w-[39px] h-12 left-[18px] top-[11px] absolute">
                        <div className="w-8 h-[42px] left-[7px] top-[6px] absolute bg-white border border-black"></div>
                        <div className="w-8 h-[42px] left-[4px] top-[3px] absolute bg-white border border-black"></div>
                        <div className="w-8 h-[42px] left-0 top-0 absolute bg-white border border-black"></div>
                    </div>
                </button>
                <button className="w-[75px] h-[70px] left-[5px] top-[2px] absolute"> {/* 나가기 버튼 */}
                    <div className="w-[75px] h-[70px] left-0 top-0 absolute bg-white rounded-[10px] shadow border border-zinc-400"></div>
                    <img className="w-[50px] h-[50px] left-[12px] top-[10px] absolute" src="/assets/images/Checkbox.png"/>
                </button>
                <button className="w-[342px] h-[91px] left-[9px] top-[426px] absolute"> {/* project.pdf 칸 */}
                    <div className="w-[342px] h-[91px] left-0 top-0 absolute bg-white rounded-[10px] shadow border border-zinc-400"></div>
                    <img className="w-[54px] h-[57px] left-[275px] top-[17px] absolute" src="/assets/images/down.png"/>
                    <div className="w-[225px] h-[69px] left-[9px] top-[11px] absolute">
                        <img className="w-[69.74px] h-[69px] left-0 top-0 absolute border" src="/assets/images/pdfimg2.png" />
                        <div className="w-[155px] h-[69px] left-[70px] top-0 absolute text-black text-[25px] font-normal">project.pdf</div>
                    </div>
                </button>
                <button className="w-[230px] h-[150px] left-[65px] top-[186px] absolute" onClick={openModal}> {/* 사인 추가 칸 */}
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
                    <div className="w-[230px] h-[150px] left-0 top-0 absolute bg-white shadow border border-stone-300" />
                    <img className="w-[105px] h-[73.10px] left-[62px] top-[38px] absolute" src="/assets/images/signplus.png"/>
                </button>

                <button className="btn" onClick={openModal}>+</button>

            </div>
        </>
    );
};

export default SignatureDisplay;