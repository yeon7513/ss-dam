import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../../../components/common/upload-images/UploadImages.jsx';

import styles from './ChallengeRegister.module.scss';

const DEFAULT_POINT = 500;

export default function ChallengeRegister() {
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  const [form, setForm] = useState({
    title: '',
    goal: '',
    content: '',
    startDate: '',
    endDate: '',
    postStatus: 'ACTIVE',
    pointEarned: '',
    maxParticipants: '',
  });

  const [rewardMode, setRewardMode] = useState('DEFAULT');
  const [capacityMode, setCapacityMode] = useState('UNLIMITED');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (submitting) return;

    const hasInput = Object.values(form).some(
      (value, index) =>
        // 공개 상태를 제외한 입력값 확인
        Object.keys(form)[index] !== 'postStatus' && value !== '',
    );

    if (hasInput && !window.confirm('작성 중인 내용을 취소할까요?')) {
      return;
    }

    navigate('/admin/challenge_manage');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setError('');

    const title = form.title.trim();
    const goal = form.goal.trim();

    if (!title || !goal || !form.content.trim()) {
      setError('제목, 목표, 내용을 입력해주세요.');
      return;
    }

    if (!form.startDate || !form.endDate || form.endDate <= form.startDate) {
      setError('종료일시는 시작일시보다 뒤여야 합니다.');
      return;
    }

    const pointEarned =
      rewardMode === 'DEFAULT' ? DEFAULT_POINT : Number(form.pointEarned);

    if (
      (rewardMode === 'CUSTOM' && form.pointEarned === '') ||
      !Number.isInteger(pointEarned) ||
      pointEarned < 0 ||
      pointEarned > 2147483647
    ) {
      setError('보상 포인트는 0 이상의 정수로 입력해주세요.');
      return;
    }

    const maxParticipants =
      capacityMode === 'UNLIMITED' ? null : Number(form.maxParticipants);

    if (
      capacityMode === 'LIMITED' &&
      (form.maxParticipants === '' ||
        !Number.isInteger(maxParticipants) ||
        maxParticipants < 1 ||
        maxParticipants > 2147483647)
    ) {
      setError('참여 정원은 1 이상의 정수로 입력해주세요.');
      return;
    }

    const payload = {
      title,
      goal,
      content: form.content,
      // 한국 시간으로 입력하며 UTC 변환하지 않음
      startDate: `${form.startDate}:00`,
      endDate: `${form.endDate}:00`,
      postStatus: form.postStatus,
      pointEarned,
      maxParticipants,
    };

    setSubmitting(true);

    // 챌린지 정보 + 이미지 파일 구성
    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(payload)], {
        type: 'application/json',
      }),
    );

    selectedImages.forEach((file) => {
      formData.append('files', file);
    });

    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/challenge', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const messages = {
          401: '로그인이 필요합니다.',
          403: '챌린지를 등록할 권한이 없습니다.',
        };

        throw new Error(
          messages[response.status] ||
            result?.message ||
            '챌린지 등록에 실패했습니다.',
        );
      }

      // 생성된 챌린지 상세 화면으로 이동
      if (result.data != null) {
        navigate(`/admin/challenge_manage/${result.data}`, {
          replace: true,
        });
      } else {
        navigate('/admin/challenge_manage', {
          replace: true,
        });
      }
    } catch (err) {
      setError(
        err instanceof TypeError
          ? '서버 응답을 확인하지 못했습니다. 목록에서 등록 여부를 확인해주세요.'
          : err.message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          type="button"
          onClick={handleCancel}
          disabled={submitting}
          aria-label="챌린지 목록으로 돌아가기"
        >
          ←
        </button>
        <h1>챌린지 등록</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fields} disabled={submitting}>
          <div className={styles.topGrid}>
            <section>
              <h2 className={styles.sectionLabel}>대표 이미지</h2>

              <UploadImage
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            </section>

            <div className={styles.formGrid}>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                제목
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="챌린지 제목을 입력해주세요."
                  maxLength={255}
                  required
                />
              </label>

              <fieldset className={`${styles.optionGroup} ${styles.fullWidth}`}>
                <legend>공개 여부</legend>

                <div className={styles.radioRow}>
                  <label>
                    <input
                      type="radio"
                      name="postStatus"
                      value="ACTIVE"
                      checked={form.postStatus === 'ACTIVE'}
                      onChange={handleChange}
                    />
                    공개
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="postStatus"
                      value="PRIVATE"
                      checked={form.postStatus === 'PRIVATE'}
                      onChange={handleChange}
                    />
                    비공개
                  </label>
                </div>
              </fieldset>

              <label className={styles.field}>
                시작일시
                <input
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  step="60"
                  required
                />
              </label>

              <label className={styles.field}>
                종료일시
                <input
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  min={form.startDate || undefined}
                  step="60"
                  required
                />
              </label>

              <fieldset className={styles.optionGroup}>
                <legend>보상 포인트</legend>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rewardMode"
                    value="DEFAULT"
                    checked={rewardMode === 'DEFAULT'}
                    onChange={() => setRewardMode('DEFAULT')}
                  />
                  기본 보상 ({DEFAULT_POINT}점)
                </label>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rewardMode"
                    value="CUSTOM"
                    checked={rewardMode === 'CUSTOM'}
                    onChange={() => setRewardMode('CUSTOM')}
                  />
                  직접 입력
                </label>

                <input
                  className={styles.numberInput}
                  type="number"
                  name="pointEarned"
                  value={form.pointEarned}
                  onChange={handleChange}
                  placeholder="포인트 입력"
                  aria-label="직접 입력할 보상 포인트"
                  min="0"
                  max="2147483647"
                  step="1"
                  disabled={rewardMode !== 'CUSTOM'}
                  required={rewardMode === 'CUSTOM'}
                />
              </fieldset>

              <fieldset className={styles.optionGroup}>
                <legend>참여 정원</legend>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="capacityMode"
                    value="UNLIMITED"
                    checked={capacityMode === 'UNLIMITED'}
                    onChange={() => setCapacityMode('UNLIMITED')}
                  />
                  제한 없음
                </label>

                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="capacityMode"
                    value="LIMITED"
                    checked={capacityMode === 'LIMITED'}
                    onChange={() => setCapacityMode('LIMITED')}
                  />
                  직접 입력
                </label>

                <input
                  className={styles.numberInput}
                  type="number"
                  name="maxParticipants"
                  value={form.maxParticipants}
                  onChange={handleChange}
                  placeholder="최대 참여 인원"
                  aria-label="최대 참여 인원"
                  min="1"
                  max="2147483647"
                  step="1"
                  disabled={capacityMode !== 'LIMITED'}
                  required={capacityMode === 'LIMITED'}
                />
              </fieldset>

              <label className={`${styles.field} ${styles.fullWidth}`}>
                챌린지 목표
                <input
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  placeholder="예: 하루 30분 산책하고 인증하기"
                  maxLength={255}
                  required
                />
              </label>
            </div>
          </div>

          <label className={styles.contentField}>
            내용
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="챌린지 소개와 참여 방법을 입력해주세요."
              maxLength={4000}
              required
            />
            <small>{form.content.length.toLocaleString()} / 4,000자</small>
          </label>
        </fieldset>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={submitting}
          >
            {submitting ? '등록 중...' : '등록'}
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={submitting}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
