/*
* export default component name: Home
* dev: kimminsu31415
* description: 루트 페이지 첫 화면, npm start하면 나오는 화면*/
import React from "react";
import PdfUploader from "./components/PdfUploader";

const Home = () => {
    return (
        <>
            <div className="grid grid-row-3 h-screen"> 
                <div className="row-span-2 flex items-center justify-center">
                    <div className="grid grid-row-2">
                        <div className="col-span-1">
                            <img src="/assets/images/signahandHome.png" className="w-full h-auto rounded-lg" alt="Sample Image"/>
                        </div>
                        <div className="container mx-auto p-8 text-center">
                            <h1 className="text-4xl font-bold mb-4">손동작 전자서명 서비스</h1>
                            <h2 className="text-lg font-bold text-gray-700">사인을 만들고 파일에 적용시키고 다운로드까지 손동작으로 모든 것을 할 수 있습니다. 모든 작업을 손동작으로 편리하게 시작해보세요.</h2>
                        </div>
                    </div>
                </div>
                <div className="row-span-1 flex items-center justify-center border border-black">
                    <div className="w-full">
                        <PdfUploader />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;