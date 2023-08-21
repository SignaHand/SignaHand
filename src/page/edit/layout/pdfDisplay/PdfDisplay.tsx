/*
* export default comonent name: pdfDisplay
* dev: codeartitect
* description: pdf파일을 보여주고 서명 데이터를 입력시킬 수 있는 컴포넌트
* */
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Loading from "../loading/Loading";
import {useResizeContext} from "../../../../context/HandContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface PdfDisplayProps {
    file: File;
}

const PdfDisplay: React.FC<PdfDisplayProps> = ({file}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState<number>(100);
    const [currentPage, setCurrentPage] = useState<number>(1);
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

    /* PDF 파일을 뷰어에 띄우기 위해서는 URL을 사용해야함 */
    const pdfUrl = URL.createObjectURL(file);
    /* PDF 문서 업로딩 */
    const loadingTask = pdfjsLib.getDocument(pdfUrl);

    useEffect(() => {
        /* PDF 불러오기 */
        const loadPDF = async () => {
            /* PDF 문서 객체 */
            const pdf = await loadingTask.promise;
            setNumPages(pdf.numPages);
            const page = await pdf.getPage(currentPage);
            try {
                if (!page) return;
                const scale = 1;
                const viewport = page.getViewport({scale});

                // const canvas = canvasRef.current;
                const canvas = document.createElement("canvas");
                canvas.id = "pdfCanvas";
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const context = canvas.getContext("2d");

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                const container = containerRef.current as HTMLDivElement;
                if (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                container.appendChild(canvas);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await page.render(renderContext).promise;


            } catch (error) {
                console.error("Error loading PDF:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        loadPDF();
    }, [currentPage]);


    /* 다음 페이지 보는 함수*/
    function onHandleNextPage() {
        setCurrentPage(currentPage + 1);
        /*
        * preview 와 추가적으로 기능 작업 필요 -> canvas 이미지화하여 주고 받기 등....
        * */
    }

    /* 이전 페이지 보는 함수*/
    function onHandlePrevPage() {
        setCurrentPage(currentPage - 1);
        /*
        * preview 와 추가적으로 기능 작업 필요 -> canvas 이미지화하여 주고 받기 등....
        * */
    }


    function drawSignature() {
        // canvas 요소 가져오기
        const canvas: HTMLCanvasElement = document.getElementById("pdfCanvas") as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        // 싸인 이미지를 생성하고 로드
        const signature = new Image();
        signature.src = imgRef.current?.src as string;
        if (signature) {
            signature.onload = function () {
                ctx.drawImage(signature, 0, 0);
            }
        }
    }

    function saveImage() {
        // canvas 가져오기
        const canvas: HTMLCanvasElement = document.getElementById("pdfCanvas") as HTMLCanvasElement;

        if (!canvas) return;
        const imageDataUrl = canvas.toDataURL('image/png');
        const image = new Image();
        image.src = imageDataUrl;

        // 이미지 띄우기
        const imageContainer = document.getElementById('image-container');
        if (imageContainer) {
            imageContainer.appendChild(image);
        }

        // 이미지 데이터 URL을 저장하거나 다른 용도로 사용할 수 있음
        // 예시: 이미지를 다운로드
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataUrl;
        downloadLink.download = 'canvas_image.png';
        downloadLink.click();
    }

    return (
        <>
            {loading && (
                <Loading fileName={file.name}/>
            )}
            <div ref={containerRef}></div>
            {currentPage !== 1 && (
                <button className="btn" onClick={onHandlePrevPage}>prev</button>
            )}
            {currentPage !== numPages && (
                <button className="btn" onClick={onHandleNextPage}>next</button>
            )}
            <button className="btn" onClick={drawSignature}>signature</button>
            <button className="btn" onClick={saveImage}>saveImage</button>
        </>);
};

export default PdfDisplay;
