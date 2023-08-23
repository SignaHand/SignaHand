import exp from 'constants';
import React from 'react';
import { Link } from "react-router-dom";

const End = () => {
    return(
        <>
            <div className="grid grid-row-2 h-screen">
                <div className="grid-row-1 m-8">
                    <div className='flex justify-center h-full'>
                        <img className="w-[100px] h-[100px] mt" src='./assets/images/folder.png'  style={{
                position: "fixed",
                left: "48%",
                top: "360px",
              }}/>
                    </div>
                    <div className="w-[936px] h-[162px] left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 text-center text-black text-[64px] font-bold">
                        다운로드가 완료되었습니다.
                    </div>
                </div>
                <div className="grid-row-1 m-8">
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div className="text-3xl font-nomal mb-4">다른 파일도 이용하고 싶다면?</div>
                        <Link to="/" className="btn w-[600px] h-[123px] text-xl text-center text-white text-[50px] font-extrabold bg-red-500 rounded-[30px]">
                            처음 페이지로
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default End;

{/* <div className="w-[1920px] h-[1080px] relative bg-white">
    <div className="w-[1920px] h-[1085px] left-0 top-0 absolute"></div>
    <div className="w-[1920px] h-[30px] left-0 top-[1050px] absolute bg-white"></div>
    <div className="w-[936px] h-[162px] left-[492px] top-[337px] absolute text-center text-black text-[64px] font-bold">다운로드가 완료되었습니다.</div>
    <div className="w-[120px] h-[120px] left-[901px] top-[239px] absolute">
        <div className="w-[120px] h-[120px] left-0 top-0 absolute"></div>
        <div className="w-[60px] h-[60px] left-[30.67px] top-[33.33px] absolute"></div>
    </div>
    <div className="w-[304px] h-10 left-[808px] top-[528px] absolute text-center text-black text-2xl font-normal">다른 파일도 이용하고 싶다면?</div>
    <div className="w-[470px] h-[123px] left-[725px] top-[568px] absolute"> //
        <div className="w-[470px] h-[123px] left-0 top-0 absolute bg-red-500 rounded-[30px] border-2 border-neutral-100"></div>
        <div className="w-[470px] h-[123px] left-0 top-0 absolute text-center text-white text-[40px] font-extrabold">처음 페이지로</div>
    </div>
</div> */}