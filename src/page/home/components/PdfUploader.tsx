/*
 * export default component name: PdfUploader
 * dev: codeartitect
 * description: 사용자에게 PDF 파일을 입력받는 컴포넌트
 * */
import React, { ChangeEvent, useState } from "react";
import {usePageContext} from "../../../context/PageContext";
import * as pdfjsLib from "pdfjs-dist";
import {useNavigate} from "react-router";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const PdfUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {pages, addPage} = usePageContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  async function handleOnClickEdit() {
    // if (pages) {
    // }
    if (!selectedFile) {
      alert("선택된 파일이 없습니다. 다시 시도해주세요.");
      return;
    }
    try {

      /* PDF 파일을 뷰어에 띄우기 위해서는 URL을 사용해야함 */
      const pdfUrl = URL.createObjectURL(selectedFile);
      /* PDF 문서 업로딩 */
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      /* PDF 문서 객체 */
      const pdf = await loadingTask.promise;
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({scale: 1});
        const canvas = document.createElement("canvas");
        canvas.id = "page-" + String(i);
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        const container = document.createElement('div');
        if (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        container.appendChild(canvas);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await page.render(renderContext).promise;
        const url = canvas.toDataURL('image/jpeg', 1.0);
        addPage({page: i + 1, url: url});
      }

    } catch (e) {
      console.error("Error loading PDF:", e);
    } finally {
      setLoading(false);
      navigate("/work", {state: {file: selectedFile}});
    }
  }

  return (
      <div className="grid justify-center place-content-center h-full">
        <label
            className="relative cursor-pointer bg-gray-500 text-white py-2 px-10 rounded-lg text-center w-64"
            style={{backgroundColor: "red"}}
        >
          시작하기
          <input
              className="opacity-0 cursor-pointer absolute top-0 left-0 w-full h-full"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
          />
        </label>
        {/*<button onClick={() => handleOnClickEdit()}>fsfsdfsdfs</button>*/}
        {selectedFile && (
            <button onClick={() => handleOnClickEdit()} className="btn text-xl">
              edit
            </button>
        )}
      </div>
  );
};

export default PdfUploader;
