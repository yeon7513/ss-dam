import { useNavigate } from 'react-router-dom';

function CancelButton({
  targetUrl = '/',
  message = '작성을 취소하시겠습니까?\n취소하면 작성한 내용은 저장되지 않습니다.',
  className,
  children = '취소',
}) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (confirm(message)) {
      navigate(targetUrl, { replace: true });
    }
  };

  return (
    <button type="button" className={className} onClick={handleCancel}>
      {children}
    </button>
  );
}

export default CancelButton;
