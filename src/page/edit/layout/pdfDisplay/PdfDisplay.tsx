/*
 * export default comonent name: pdfDisplay
 * dev: codeartitect
 * description: pdf파일을 보여주고 서명 데이터를 입력시킬 수 있는 컴포넌트
 * */
import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Loading from "../loading/Loading";
import {
  useResizeContext,
  usePdfPageContext,
} from "../../../../context/HandContext";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import {usePageContext} from "../../../../context/PageContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface PdfDisplayProps {
  file: File;
}

const PdfDisplay: React.FC<PdfDisplayProps> = ({ file }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>(100);
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
  const { currentPage, setCurrentPage } = usePdfPageContext(); // pdf 페이지 이동을 위한 Context
  const {pages, updatePage, getPageByNo, resetPage} = usePageContext();
  const [isCanvasReset, setIsCanvasReset] = useState<number>(0); // canvas 리셋을 위한 state

  useEffect(() => {
    const loadPDF = async () => {
      setNumPages(pages.length);
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const image = new Image();

        image.onload = function () {
          canvas.id = 'pdfCanvas';
          canvas.width = image.width;
          canvas.height = image.height;
          if (context) {
            context.drawImage(image, 0, 0);
          }
        }
        const container = containerRef.current as HTMLDivElement;
        if (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        container.appendChild(canvas);

        const currentPageData = getPageByNo(currentPage);
        if (currentPageData) {
          image.src = currentPageData.url;
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPDF();
  }, [currentPage, isCanvasReset]);


  function modifyPage(movedPageNo: number) {
    try {
      console.log(currentPage);
      console.log(pages)
      const canvas = document.getElementById('pdfCanvas') as HTMLCanvasElement;
      const updateUrl = canvas.toDataURL('image/jpeg', 1.0);
      updatePage(currentPage, updateUrl);
      setCurrentPage(movedPageNo);
      console.log(pages);
    } catch (e) {
      console.error("not modified, error : " + e);
    }
  }

  function onHandleReset() {
    setIsCanvasReset(isCanvasReset + 1);
    resetPage(currentPage);
  }

  // 드래그 오버 이벤트를 처리하는 함수
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    // 드롭을 허용하도록 기본 동작을 취소
    e.preventDefault();
  }

  // 주어진 이미지 소스와 좌표를 사용하여 서명을 그리는 함수
  const drawSignature = (src: string, dx: number, dy: number) => {
    // canvas 요소 가져오기
    const canvas: HTMLCanvasElement = document.getElementById(
      "pdfCanvas"
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 서명 이미지를 생성하고 로드
    const signature = new Image();
    signature.src = src;
    signature.onload = function () {
      ctx.drawImage(signature, dx, dy, 150, 84);
    };
  };

  // 서명을 드롭할 때의 동작을 처리하는 함수
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const img = document.getElementById(data) as HTMLImageElement;

    if (img) {
      const canvas: HTMLCanvasElement = document.getElementById(
        "pdfCanvas"
      ) as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - 70; // 서명이 정확히 드롭되도록 보정한 좌표
      const y = e.clientY - rect.top - 30;
      drawSignature(img.src, x, y); // 서명 그리기
    }
  }

  function saveImage() {
    modifyPage(currentPage);
    const canvas: HTMLCanvasElement = document.getElementById(
        "pdfCanvas"
    ) as HTMLCanvasElement;

    const canvasWidth = canvas.width;
    const canvasHeigth = canvas.height;
    const pdf = new jsPDF('portrait', 'px', [canvasWidth, canvasHeigth]);
    pages.forEach((page, index) => {
      if (index != 0) {
        pdf.addPage();
      }
      pdf.addImage(page.url, "JPEG", 0, 0, canvasWidth, canvasHeigth, '', "SLOW");
    })

    pdf.save('canvas_image.pdf');
  }

  // pdf 그림자 생성 코드   <div className="shadow-inner border border-zinc-400 relative" >

  return (
    <>
      <div className="flex py-10 justify-center h-full">
        <div className="relative">
          {loading && <Loading fileName={file.name} />}
          <div
            ref={containerRef}
            onDragOver={handleDragOver} // 드래그 오버 이벤트 핸들러 추가
            onDrop={handleDrop} // 드롭 이벤트 핸들러 추가
          ></div>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              {currentPage !== 1 && (
                <button
                  className="btn w-[150px] h-[70px] shadow border border-zinc-400 ml-0"
                  onClick={() => modifyPage(currentPage - 1)}
                >
                  prev
                </button>
              )}
            </div>
            <div className="col-span-1 flex justify-end">
              {currentPage !== numPages && (
                <button
                  className="btn w-[150px] h-[70px] shadow border border-zinc-400 mr-0"
                  onClick={() => modifyPage(currentPage + 1)}
                >
                  next
                </button>
              )}
            </div>


          </div>
          <div>
            <button
              className="btn w-[150px] h-[70px] shadow border border-zinc-400"
              onClick={onHandleReset}
            >
              reset
            </button>

            <Link to="/End">
              <button
                className="btn w-[250px] h-[70px] absolute shadow border border-zinc-400"
                onClick={saveImage}
              >
                <div className="flex items-center">
                  <div className="w-[225px] h-[69px] left-[9px] top-[11px] absolute">
                    <img
                      className="w-[50.74px] h-[50px] left-0 top-0 absolute border"
                      src="/assets/images/pdfimg2.png"
                    />
                    <div className="left-[70px] top-4 absolute text-black text-[20px] font-normal">
                      saveImage
                    </div>
                  </div>
                  <img
                    className="w-[40px] h-[40px] absolute right-0"
                    src="/assets/images/down.png"
                  />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdfDisplay;
