/*
* export default comonent name: pdfDisplay
* dev: codeartitect
* description: pdf파일을 보여주고 서명 데이터를 입력시킬 수 있는 컴포넌트
* */
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Loading from "../loading/Loading";
import {PageViewport, PDFPageProxy} from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface PdfDisplayProps {
    file: File;
}

const PdfDisplay: React.FC<PdfDisplayProps> = ({file}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState<number>(100);
    const [currentPage, setCurrentPage] = useState<number>(1);

    /* PDF 파일을 뷰어에 띄우기 위해서는 URL을 사용해야함 */
    const pdfUrl = URL.createObjectURL(file);
    /* PDF 문서 업로딩 */
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const temp = "container";

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
    async function onHandleNextPage() {
        setCurrentPage(currentPage + 1);
        /*
        * preview 와 추가적으로 기능 작업 필요 -> canvas 이미지화하여 주고 받기 등....
        * */
    }

    /* 이전 페이지 보는 함수*/
    async function onHandlePrevPage() {
        setCurrentPage(currentPage - 1);
        /*
        * preview 와 추가적으로 기능 작업 필요 -> canvas 이미지화하여 주고 받기 등....
        * */
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
        </>
    );
};

export default PdfDisplay;
