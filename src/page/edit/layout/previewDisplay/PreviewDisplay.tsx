/*
 * export default component name: previewDisplay
 * dev: ????
 * description: ~~~~~~~~~~~
 * */
import React from "react";

const PreviewDisplay: React.FC = () => {
  return (
    <>
      <div className="grid grid-rows-3 h-screen justify-center mt-10">
        <div className="w-[248px] h-[331px] flex items-center justify-center row-span-1 bg-white shadow-lg border border-stone-300">
          <img
            className="w-[248px] h-[331px] absolute"
            src="/assets/images/pdf1.png"
          />
        </div>
        <div className="w-[248px] h-[331px] flex items-center justify-center row-span-1 bg-white shadow-lg border border-stone-300">
          <img
            className="w-[248px] h-[331px] absolute"
            src="/assets/images/pdf2.png"
          />
        </div>
        <div className="w-[248px] h-[331px] flex items-center justify-center row-span-1 bg-white shadow-lg border border-stone-300">
          <img
            className="w-[248px] h-[331px] absolute"
            src="/assets/images/pdf3.png"
          />
        </div>
      </div>
    </>
  );
};

export default PreviewDisplay;

{
  /* 
<div className="flex justify-center items-center">
<div className="w-[248px] h-[331px] col-span-1 relative">
    <div className="w-[248px] h-[331px] left-0 top-0 absolute bg-white rounded-[30px] border border-red-600 border-opacity-40" />
    <div className="w-[50px] h-[50px] left-[147px] top-[261px] absolute" />
    <div className="w-[50px] h-[50px] left-[99px] top-[261px] absolute rounded-[30px] shadow border border-black">
        <div className="w-[50px] h-[50px] left-0 top-0 absolute rounded-[30px] border border-red-300" />
        <div className="w-[50px] h-[50px] left-0 top-0 absolute text-center text-black text-[25px] font-normal">1</div>
    </div>
    <img className="w-[140px] h-[198px] left-[54px] top-[35px] absolute" src="/assets/images/sample1.png"/>
</div>

<div className="w-[248px] h-[331px] col-span-1 relative">
    <div className="w-[248px] h-[331px] left-0 top-0 absolute bg-white rounded-[30px] border border-zinc-400 border-opacity-40" />
    <div className="w-[140px] h-[198px] left-[54px] top-[52px] absolute" />
    <div className="w-[50px] h-[50px] left-[99px] top-[261px] absolute rounded-[30px] shadow border border-black">
        <div className="w-[50px] h-[50px] left-0 top-0 absolute rounded-[30px] border border-red-300" />
        <div className="w-[50px] h-[50px] left-0 top-0 absolute text-center text-black text-[25px] font-normal">2</div>
    </div>
    <img className="w-[140px] h-[198px] left-[54px] top-[35px] absolute" src="/assets/images/sample1.png"/>
</div>
</div> 
*/
}
