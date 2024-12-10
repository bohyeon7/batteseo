import DaumPostcodeEmbed from "react-daum-postcode";

export default function DaumPost({ onSelect, onClose }: { onSelect: (address: string) => void, onClose: () => void }) {
  const onComplete = (data: { roadAddress: string; }) => {
    const roadAddress = data.roadAddress;
    onSelect(roadAddress); // 부모 컴포넌트로 주소 전달
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={onClose}> {/* 모달 외부 클릭 시 닫힘 */}
      <div className="" onClick={(e) => e.stopPropagation()}>
        <DaumPostcodeEmbed onComplete={onComplete} className="fixed top-0 left-0 right-0" />
        <button onClick={onClose}>닫기</button> {/* 모달 닫기 버튼 */}
      </div>
    </div>
  );
}