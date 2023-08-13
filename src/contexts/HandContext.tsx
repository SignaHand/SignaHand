// context API
import React, { createContext, useContext, useState, useRef, ReactNode  } from "react";

// 손 동작 관련 컴포넌트에서 사용되는 상태와 함수의 타입 지정
interface HandContextType {
    canvas: string;
    setCanvas: React.Dispatch<React.SetStateAction<string>>;
    baseDataUrl: string;
    setBaseDataUrl: React.Dispatch<React.SetStateAction<string>>;
    handleBaseDataUrlChange: (baseDataUrl: string) => void;
}

interface ResizeContextType {
    imgRef: React.RefObject<HTMLImageElement>;
}

interface HandContextProviderProps {
    children: ReactNode;
}

// Context 생성
const HandContext = createContext<HandContextType | undefined>(undefined);
const ResizeContext = createContext<ResizeContextType | undefined>(undefined);

// HandContext가 관리하는 상태와 함수를 사용할 수 있도록 하는 커스텀 훅
export const useHandContext = () => {
    const context = useContext(HandContext);
    if (context === undefined) {
        throw new Error("useHandContext should be used within an AppContextProvider");
    }
    return context;
}

// ResizeContext가 관리하는 상태와 함수를 사용할 수 있도록 하는 커스텀 훅
export const useResizeContext = () => {
    const context = useContext(ResizeContext);
    if (context === undefined) {
        throw new Error("useResizeContext should be used within an AppContextProvider");
    }
    return context;
}



// 상태와 함수를 관리, 제공하는 컴포넌트
export const HandContextProvider: React.FC<HandContextProviderProps> = ({ children }) => {
    const [canvas, setCanvas] = useState<string>("non-view");
    const [baseDataUrl, setBaseDataUrl] = useState<string>("");
    const [signWidth, setSignWidth] = useState<string>('100px');
    const [signHeight, setSignHeight] = useState<string>('100px');
    const imgRef = useRef<HTMLImageElement>(null);

    const handleBaseDataUrlChange = (baseDataUrl: string) => {
        setBaseDataUrl(baseDataUrl);
        if (baseDataUrl !== "") {
            setCanvas("non-view");
        }
    };

    // children에 해당하는 컴포넌트에 상태와 함수 제공
    return (
        <HandContext.Provider
            value={{
                canvas,
                setCanvas,
                setBaseDataUrl,
                baseDataUrl,
                handleBaseDataUrlChange,
            }}
        >
            <ResizeContext.Provider
                value={{
                    imgRef
                }}
            >
                {children}
            </ResizeContext.Provider>
        </HandContext.Provider>
    );
}