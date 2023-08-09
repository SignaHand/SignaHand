import React, {useEffect, useRef} from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
interface PdfViewerProps {
    file: File;
}

const PdfViewer: React.FC<PdfViewerProps> = ({file}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    /* PDF 파일을 뷰어에 띄우기 위해서는 URL을 사용해야함 */
    const pdfUrl = URL.createObjectURL(file);
    useEffect(() => {
        /* PDF 불러오기*/
        const loadPDF = async () => {
            /* pdf를 보여줄 container Element 불러오기*/
            const container = containerRef.current;
            if (!container) return;     // 컨테이너가 없다면 종료


            /*PDF 문서 업로딩*/
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            /* PDF 문서 객체*/
            const pdf = await loadingTask.promise;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);

                const scale = 1;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const context = canvas.getContext('2d');
                if (!context) return;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                container.appendChild(canvas);

                await page.render(renderContext).promise;
            }
        };

        loadPDF();
    }, [pdfUrl]);

    return (
        <>
            <div className="w-full h-full">
                <div ref={containerRef}></div>
            </div>

        </>
    );

};

export default PdfViewer;