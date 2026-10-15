import React, { useState } from 'react';
import Button from "../../../../components/common/button/Button.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/common/modal/Modal.jsx";
import styles from "./AdminProfileCard.module.scss";
import TextInput from "../../../../components/forms/text-input/TextInput.jsx";
import { formatPhoneNumber } from "../../../../utils/formatNumber.js";
import cn from "classnames";
import { CgAsterisk } from "react-icons/cg";
import { useSubmitData } from "../../../../hooks/useSubmitData.js";

function AdminProfileCard() {
  const { user, isLoggedIn, logout } = useAuth();
  const [updateInfo, setUpdateInfo] = useState({
    password: null,
    phone: user?.phone || "",
  })
  const [inputError, setInputError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit } = useSubmitData("/api/admin/account", "PUT");

  // 로그아웃
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logout();
    }
  };

  // 비밀번호 변경
  const handleChangePassword = (e) => {
    const newPassword = e.target.value;

    setUpdateInfo(prev => ({
      ...prev,
      password: newPassword,
    }));
  };

  // 연락처 변경
  const handleChangePhone = (e) => {
    const newPhoneNumber = formatPhoneNumber(e, setInputError);

    setUpdateInfo(prev => ({
      ...prev,
      phone: newPhoneNumber,
    }));
  };

  // 프로필 업데이트 서브밋
  const handleUpdateProfile = async () => {
    const { success, message } = await handleSubmit(updateInfo);

    if (success) {
      alert(message);
      setIsModalOpen(false);
    } else {
      alert(message);
    }
  };

  const handleCancelUpdate = () => {
    if (confirm("수정을 취소하시겠습니까?\n취소하면 수정한 내용은 저장되지 않습니다.")) {
      setIsModalOpen(false);
    }
  }

  // 로그인하지 않았을 경우
  // -> 따로 막을거지만.. 혹시 모르니까!
  if (!isLoggedIn) {
    return (
      <div className={styles.profile}>
        <p className={styles.noProfile}>
          로그인 정보를 찾을 수 없습니다.
        </p>
        <Button
          btnStyle="word"
          action="submit"
          size="sm"
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <ul className={styles.info}>
        <li>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.id}>({user.id})</span>
        </li>
        <li className={styles.badge}>{user.dept.label} / {user.role.label}</li>
        <li className={styles.control}>
          <Button
            btnStyle="word"
            action="submit"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            정보수정
          </Button>
          <Button
            btnStyle="word"
            action="danger"
            size="sm"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </li>
      </ul>

      <Modal
        isOpen={isModalOpen}
        title="정보 수정"
        contentClassName={styles.infoUpdateModal}
        onClose={handleCancelUpdate}
      >
        <div className={styles.modalContents}>
          <div className={styles.disabled}>
            <TextInput
              className={styles.item}
              label="아이디"
              name="id"
              value={user.id}
              disabled
            />
            <div className={styles.item}>
              <TextInput
                label="이름"
                name="name"
                value={user.name}
                disabled
              />
              <span className={cn(styles.notice, styles.help)}>
                <CgAsterisk /> 이름 변경은 최고관리자에게 문의하세요.
              </span>
            </div>
          </div>
          <TextInput
            className={styles.item}
            label="새 비밀번호"
            name="password"
            value={updateInfo.password}
            placeholder="변경할 경우에만 입력하세요."
            onChange={handleChangePassword}
          />
          <div className={cn(styles.item, styles.phone)}>
            <TextInput
              label="연락처"
              name="phone"
              value={updateInfo.phone}
              placeholder="하이픈(-) 없이 입력"
              maxLength={13}
              onChange={handleChangePhone}
            />
            {inputError && (
              <span className={cn(styles.notice, styles.error)}>
                {inputError}
              </span>
            )}
          </div>

        </div>
        <div className={styles.footer}>
          <Button
            className={cn(styles.actionButton, styles.submit)}
            type="submit"
            action="submit"
            onClick={handleUpdateProfile}
          >
            수정
          </Button>
          <Button
            className={cn(styles.actionButton, styles.cancel)}
            type="button"
            onClick={handleCancelUpdate}
          >
            취소
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AdminProfileCard;
