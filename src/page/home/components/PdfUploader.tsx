/*
* export default component name: PdfUploader
* dev: codeartitect
* description: 사용자에게 PDF 파일을 입력받는 컴포넌트
* */
import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import Edit from "../../edit/Edit";

const PdfUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    }

    return (
        <div className="grid justify-center place-content-center h-full">
            <label className="relative cursor-pointer bg-gray-500 text-white py-2 px-10 rounded-lg text-center w-64" style={{backgroundColor:"red"}}>
                시작하기
                <input
                    className="opacity-0 cursor-pointer absolute top-0 left-0 w-full h-full"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />
            </label>
            {selectedFile && (
                <Link to="/work" state={{file: selectedFile}} className="btn text-xl">edit</Link>
            )}
        </div>
    );
};

export default PdfUploader;