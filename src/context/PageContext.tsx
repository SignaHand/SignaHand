import React, { createContext, useContext, useState, ReactNode } from 'react';
import {usePdfPageContext} from "./HandContext";

interface Page {
  page: number;
  url: string;
}

interface PageContextType {
  pages: Page[];
  addPage: (page: Page) => void;
  updatePage: (updatedPage: number, updatedUrl: string) => void;
  getPageByNo: (no: number) => Page | undefined;
  modifyPage: (movePageNo: number) => void;
  initPages: () => void;
  resetPage: (pageNo: number) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [origin, setOrigin] = useState<Page[]>([]);
  const { currentPage, setCurrentPage } = usePdfPageContext(); // pdf 페이지 이동을 위한 Context

  const initPages = () => {
    setPages([]);
  }

  const addPage = (page: Page) => {
    setPages((prevComments) => [...prevComments, page]);
    setOrigin((prevComments) => [...prevComments, page]);
  };

  const updatePage = (updatedPage: number, updatedUrl: string) => {
    setPages((prevPages) =>
        prevPages.map((page) =>
            page.page === updatedPage ? { ...page, url: updatedUrl } : page
        )
    );
  };

  const getPageByNo = (no: number): Page | undefined => {
    return pages.find((page) => page.page === no);
  };

  const modifyPage = (movedPageNo: number) => {
    try {
      const canvas = document.getElementById('pdfCanvas') as HTMLCanvasElement;
      const updateUrl = canvas.toDataURL('image/jpeg', 1.0);
      updatePage(currentPage, updateUrl);
      setCurrentPage(movedPageNo);
    } catch (e) {
      console.error("not modified, error : " + e);
    }
  }

  const resetPage = (pageNo: number) => {
    const originUrl = origin.find((page) => page.page === pageNo)?.url;
    if (!originUrl) return;
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.page === pageNo ? {...page, url: originUrl} : page
      )
    );
  }

  return (
      <PageContext.Provider value={{ pages, addPage, updatePage, getPageByNo, modifyPage, initPages, resetPage }}>
        {children}
      </PageContext.Provider>
  );
}

export function usePageContext() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('useCommentContext must be used within a CommentProvider');
  }
  return context;
}
