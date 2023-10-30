/*
 * export default component name: previewDisplay
 * dev: stanaly
 * description: pdf파일 내 페이지들을 이미지로 보여주는 컴포넌트
 * */

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Loading from "../loading/Loading";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface PreviewDisplayProps {
  file: File;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const numPagesRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);

  /* PDF 파일을 뷰어에 띄우기 위해서는 URL을 사용해야함 */
  const pdfUrl = URL.createObjectURL(file);
  /* PDF 문서 업로딩 */
  const loadingTask = pdfjsLib.getDocument(pdfUrl);

  useEffect(() => {
    /* PDF 불러오기 */
    const loadPDF = async () => {
      const container = containerRef.current;
      if (!container) return;

      /* PDF 문서 객체 */
      const pdf = await loadingTask.promise;
      //   const page = await pdf.getPage(numPages);
      numPagesRef.current = pdf.numPages;

      // 각 페이지를 렌더링
      for (let i = 0; i < numPagesRef.current; i++) {
        const button = document.createElement("button");
        button.className =
          "w-[248px] h-[331px] my-10 flex items-center justify-center row-span-1 bg-white shadow-lg border border-stone-300";
        button.onclick = () => {
          console.log(i);
        };

        buttonRefs.current.push(button);
        container.appendChild(button);

        const canvas = document.createElement("canvas");
        button.appendChild(canvas);
        const page = await pdf.getPage(i + 1);
        canvas.width = button.clientWidth;
        canvas.height = button.clientHeight;
        const viewport = page.getViewport({ scale: 0.38 });
        const renderContext = canvas.getContext("2d");
        if (!renderContext) return;
        await page.render({ canvasContext: renderContext, viewport }).promise;
      }
    };
    loadPDF();
  }, []);

  return (
    <div className="flex w-full h-screen justify-center px-auto pb-10">
      <div className="flex w-full h-full justify-center overflow-y-scroll">
        <div ref={containerRef}>
          {buttonRefs.current.map((button, index) => (
            <button
              key={index}
              ref={(buttonRef) => (buttonRefs.current[index] = buttonRef)}
            >
              <canvas
                key={index}
                ref={(canvasRef) => (canvasRefs.current[index] = canvasRef)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewDisplay;
