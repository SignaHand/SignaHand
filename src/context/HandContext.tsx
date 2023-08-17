/*
* export default module name: 
* dev: seon5
* description: 손 동작 관련 상태와 함수를 관리하기 위한 context API
* */

import React, { createContext, useContext, useState, useRef, ReactNode  } from "react";

// SignHand 컴포넌트와 관련하여 사용되는 상태와 함수의 타입 지정
interface HandContextType {
    canvas: string;
    setCanvas: React.Dispatch<React.SetStateAction<string>>;
    baseDataUrlArr: string[];
    setBaseDataUrlArr: React.Dispatch<React.SetStateAction<string[]>>;
    imgNumber: number;
    handleBaseDataUrlChange: (baseDataUrl: string) => void;
}

interface CopiedImgInfo {
    id: number;
    ref: React.RefObject<HTMLImageElement>;
}

// ResizeHand 컴포넌트와 관련하여 사용되는 상태와 함수의 타입 지정
interface ResizeContextType {
    imgRef: React.RefObject<HTMLImageElement>; // <SignHand>로 저장한 서명에 대한 ref
    imgRef2: React.RefObject<HTMLImageElement>;

    copiedImgRef: React.RefObject<HTMLImageElement>; // 복제된 서명에 대한 ref
    
    signWidth: string; // 서명 크기 조절을 위한 width, height
    signHeight: string;

    copiedSigns1: CopiedImgInfo[]; // 복제된 서명 이미지들의 정보를 저장하는 배열
    setCopiedSigns1: React.Dispatch<React.SetStateAction<CopiedImgInfo[]>>;
    copiedSigns2: CopiedImgInfo[]; 
    setCopiedSigns2: React.Dispatch<React.SetStateAction<CopiedImgInfo[]>>;
    
    selectedSign: number; // 저장된 두 개의 서명 중 어떤 서명을 복제&이동 할 것인지 결정
    setSelectedSign: React.Dispatch<React.SetStateAction<number>>;
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
    // const [baseDataUrl, setBaseDataUrl] = useState<string>("");
    const [baseDataUrlArr, setBaseDataUrlArr] = useState<string[]>([]);
    const [imgNumber, setImgNumber] = useState<number>(0);
    const imgRef = useRef<HTMLImageElement>(null);
    const imgRef2 = useRef<HTMLImageElement>(null);
    const copiedImgRef = useRef<HTMLImageElement>(null);
    const [signWidth,] = useState<string>('200px');
    const [signHeight,] = useState<string>('200px');

    const [copiedSigns1, setCopiedSigns1] = useState<CopiedImgInfo[]>([]);
    const [copiedSigns2, setCopiedSigns2] = useState<CopiedImgInfo[]>([]);

    const [selectedSign, setSelectedSign] = useState<number>(1);

    const [moveHand, setMoveHand] = useState<string>("non-view")

    const handleBaseDataUrlChange = (baseDataUrl: string) => {
        if (baseDataUrl !== "") {
            const newArr = [...baseDataUrlArr];
            newArr[imgNumber] = baseDataUrl;
            setImgNumber(imgNumber+1);
            setBaseDataUrlArr(newArr);
            setCanvas("non-view");
        }
    };

    // children에 해당하는 컴포넌트에 상태와 함수 제공
    return (
        <HandContext.Provider
            value={{
                canvas,
                setCanvas,
                setBaseDataUrlArr,
                baseDataUrlArr,
                imgNumber,
                handleBaseDataUrlChange,
            }}
        >
            <ResizeContext.Provider
                value={{
                    imgRef,
                    imgRef2,
                    copiedImgRef,
                    signWidth,
                    signHeight,
                    copiedSigns1,
                    setCopiedSigns1,
                    copiedSigns2,
                    setCopiedSigns2,
                    selectedSign,
                    setSelectedSign,
                }}
            >
                {children}
            </ResizeContext.Provider>
        </HandContext.Provider>
    );
}