/*
 * export default component name: previewDisplay
 * dev: stanaly
 * description: pdf파일 내 페이지들을 이미지로 보여주는 컴포넌트
 * */

import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { usePdfPageContext } from "../../../../context/HandContext";
import {usePageContext} from "../../../../context/PageContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface PreviewDisplayProps {
  file: File;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { currentPage, setCurrentPage } = usePdfPageContext(); // pdf 페이지 이동을 위한 Context
  const {pages, getPageByNo, modifyPage} = usePageContext();

  useEffect(() => {
    const loadPDF = async () => {
      const container = containerRef.current;
      if (!container) return;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      try {
        // 각 페이지를 렌더링
        for (let i = 0; i < pages.length; i++) {
          const button = document.createElement("button");
          button.className =
            "w-[248px] h-[331px] my-10 flex items-center justify-center row-span-1 bg-white shadow-lg border border-stone-300";
          button.onclick = () => {
            modifyPage(i);
            setCurrentPage(i + 1);
          };

          container.appendChild(button);

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const image = new Image();

          image.onload = function () {
            image.width = button.clientWidth;
            image.height = button.clientHeight;
            canvas.width = button.clientWidth;
            canvas.height = button.clientHeight;
            if (context) {
              context.drawImage(image, 0, 0, button.clientWidth, button.clientHeight);
            }
          }
          const currentPageData = getPageByNo(i + 1);
          if (currentPageData) {
            image.src = currentPageData.url;
          }
          button.appendChild(canvas);
        }
      } catch (error) {
        console.error("Error loading PDF Preview:", error);
      }
    };

    loadPDF();
  }, [currentPage]);

  return (
    <div className="flex w-full h-screen justify-center px-auto pb-10">
      <div className="flex w-full h-full justify-center overflow-y-scroll">
        <div ref={containerRef}></div>
      </div>
    </div>
  );
};

export default PreviewDisplay;
