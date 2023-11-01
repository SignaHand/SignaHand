import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Page {
  page: number;
  url: string;
}

interface PageContextType {
  pages: Page[];
  addPage: (page: Page) => void;
  updatePage: (updatedPage: number, updatedUrl: string) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);

  const addPage = (page: Page) => {
    setPages((prevComments) => [...prevComments, page]);
  };

  const updatePage = (updatedPage: number, updatedUrl: string) => {
    setPages((prevPages) =>
        prevPages.map((page) =>
            page.page === updatedPage ? { ...page, url: updatedUrl } : page
        )
    );
  };

  return (
      <PageContext.Provider value={{ pages, addPage, updatePage }}>
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
