import { useState } from 'react';
import TextInput from '../../forms/text-input/TextInput';
import Button from '../button/Button';
import styles from './Address.module.scss';

// 나중에 카카오 주소 API 같은 거랑 연동할 때 소스코드 변경해야합니다!!
function Address({ onChange }) {
  const [post, setPost] = useState('');
  const [basic, setBasic] = useState('');
  const [detail, setDetail] = useState('');

  const handleFormatAddress = (e) => {
    setDetail(e.target.value);

    if (post && basic && detail) {
      const formatAddress = `${basic} ${detail}`;
      onChange(formatAddress);
    }
  };

  return (
    <div className={styles.address}>
      <div>
        <TextInput
          name="post_number"
          placeholder="우편 번호"
          onChange={(e) => setPost(e.target.value)}
        />
        <Button>주소 검색</Button>
      </div>
      <div>
        <TextInput
          name="basic_address"
          placeholder="주소"
          onChange={(e) => setBasic(e.target.value)}
        />
        <TextInput
          name="detaile_address"
          placeholder="상세 주소"
          onChange={handleFormatAddress}
          disabled={!post || !basic}
        />
      </div>
    </div>
  );
}

export default Address;
