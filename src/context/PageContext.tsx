import React, {createContext, useContext, ReactNode, useState} from 'react';

type PageData = {
    numberData: number;
    stringData: string;
};

const initialData: PageData = {
    numberData: 0,
    stringData: '',
};

const PageContext = createContext<PageData | undefined>(undefined);

// 컨텍스트 프로바이더 컴포넌트
type PageContextProviderProps = {
    children: ReactNode;
};

export const PageContextProvider: React.FC<PageContextProviderProps> = ({ children }) => {
    const [data, setData] = useState<PageData>(initialData);

    return <PageContext.Provider value={data}>{children}</PageContext.Provider>;
};

// 커스텀 훅 생성
export const useMyContext = () => {
    const context = useContext(PageContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};
