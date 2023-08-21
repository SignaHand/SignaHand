/*
* export default component name: Loading
* dev: codeartitect
* description: pdf 파일 업로드하는 동안 나오는 화면*/

import React from "react";

interface LoadingProps {
    fileName: string
}

const Loading: React.FC<LoadingProps> = ({fileName}: LoadingProps) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white opacity-100">
            <div className="w-full h-full flex items-center justify-center">
                <div className="grid text-center">
                    <div className="flex">
                        <img src="/assets/images/pdfimg.png" alt="pdfimg" className="w-14 h-14"/>
                        {fileName}
                    </div>
                    <div>
                        <span className="loading loading-spinner loading-lg"></span>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Loading;