/*
* export default module name: moveImg
* dev: seon5
* description: 손 검출 결과를 처리하여 handMode를 판단하고 MoveHand 컴포넌트로 handMode 리턴
* */
import { Results, NormalizedLandmark } from "@mediapipe/hands";

export const moveImg = (results: Results) => {

    // 손 동작 모드 : up, down
    let handMode;
    // 손가락 상태 판단을 위한 변수
    let index_finger;
    let middle_finger;
    let ring_finger;
   
    // 손 개수
    let handNum;

    // 검지 좌표
    let x : number;
    let y : number;

    // 두 점 거리 계산 함수
    const calculateDistance = (p1: NormalizedLandmark, p2: NormalizedLandmark): number => {
        const deltaX = p2.x - p1.x;
        const deltaY = p2.y - p1.y;
        const distance= Math.sqrt(deltaX * deltaX + deltaY * deltaY );
        return distance;
    }



    // 손의 랜드마크 그리기
    if (results.multiHandLandmarks) {
        handNum = 0;
        for (const handLandmarks of results.multiHandLandmarks) {
            if (handLandmarks[8]) {
                // console.log("손 개수", handNum);
                x = handLandmarks[8].x;
                y = handLandmarks[8].y;

                // 손가락을 접은 경우 true
                index_finger = calculateDistance(handLandmarks[8], handLandmarks[0]) < calculateDistance(handLandmarks[5], handLandmarks[0]);
                middle_finger = calculateDistance(handLandmarks[12], handLandmarks[0]) < calculateDistance(handLandmarks[9], handLandmarks[0]);
                ring_finger = calculateDistance(handLandmarks[16], handLandmarks[0]) < calculateDistance(handLandmarks[13], handLandmarks[0]);
                
                if (!index_finger && !middle_finger && !ring_finger){ // 한 손 펼치기
                    handMode = "sizeUp";
                    handNum++;
                    }else if (index_finger && middle_finger && ring_finger){ // 주먹 쥐기
                        handMode = "sizeDown";
                    }
                else if (!index_finger && middle_finger && ring_finger){
                    if (x >= 0.5){ // 웹캠 우측에 검지만 펼치기
                        handMode = "moveRight";
                    }else { // 웹캠 좌측에 검지만 펼치기
                        handMode = "moveLeft";
                    }
                }
                else if (!index_finger && !middle_finger && ring_finger){
                    if (y>0.5){ // 웹캠 상단에 검지, 중지 펼치기
                        handMode = "moveTop";
                    }else { // 웹캠 하단에 검지, 중지 펼치기
                        handMode = "moveBottom";
                    }
                }
            }
        }
        console.log(handNum);
        
        if (handNum == 2) {
            handMode = "save"; // 양 손 펼치기 (손 두 개 모두 검지, 중지, 약지를 펼친 것이 인식되면 'save'로 설정)
            console.log("finish move&resize");
        }

        if (handMode){
            return handMode;
        }
            
        // else 예외 처리 코드 추가
        
    }
}