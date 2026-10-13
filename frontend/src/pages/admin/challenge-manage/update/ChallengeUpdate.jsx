import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ChallengeUpdate.module.scss';

import { formatImagePath } from '../../../../utils/formatImagePath';

const normalizeDate = (value) => (value || '').replace(' ', 'T');

function ChallengeUpdate() {
  const { code } = useParams();
  const navigate = useNavigate();
  const savingRef = useRef(false);

  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState(null);

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [replaceImages, setReplaceImages] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 기존 챌린지 조회
  useEffect(() => {
    const controller = new AbortController();

    async function loadChallenge() {
      setLoading(true);
      setError('');
      setOriginal(null);
      setForm(null);
      setFiles([]);
      setReplaceImages(false);

      try {
        const response = await fetch(
          `/api/admin/challenge/${encodeURIComponent(code)}`,
          {
            credentials: 'include',
            signal: controller.signal,
          },
        );

        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.success || !result.data) {
          throw new Error(result?.message || '챌린지를 불러오지 못했습니다.');
        }

        const data = result.data;

        setOriginal(data);
        setForm({
          title: data.title ?? '',
          content: data.content ?? '',
          goal: data.goal ?? '',
          startDate: normalizeDate(data.startDate),
          endDate: normalizeDate(data.endDate),
          postStatus: data.postStatus,
          pointEarned: String(data.pointEarned ?? 0),
          maxParticipants:
            data.maxParticipants == null ? '' : String(data.maxParticipants),
        });
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || '조회에 실패했습니다.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadChallenge();
    return () => controller.abort();
  }, [code]);

  // 새 파일 미리보기 생성 및 정리
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // 서버의 시작일은 한국 시간 기준
  const isBeforeStart = () =>
    original?.progressStatus === 'WAITING' &&
    new Date(`${normalizeDate(original.startDate)}+09:00`).getTime() >
      Date.now();

  const beforeStart = isBeforeStart();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (savingRef.current || !form || original?.deleteYn) return;
    setError('');

    // 화면을 열어 둔 동안 시작 시각이 지난 경우도 다시 확인
    const canEditConditions = isBeforeStart();

    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }

    const pointEarned = Number(form.pointEarned);
    const maxParticipants =
      form.maxParticipants === '' ? null : Number(form.maxParticipants);

    if (canEditConditions) {
      if (
        !form.goal.trim() ||
        !form.startDate ||
        !form.endDate ||
        new Date(`${form.startDate}+09:00`).getTime() <= Date.now() ||
        new Date(`${form.endDate}+09:00`).getTime() <=
          new Date(`${form.startDate}+09:00`).getTime()
      ) {
        setError('목표를 입력하고 시작·종료일시를 확인해주세요.');
        return;
      }

      if (
        form.pointEarned === '' ||
        !Number.isInteger(pointEarned) ||
        pointEarned < 0 ||
        pointEarned > 2147483647
      ) {
        setError('보상 포인트를 올바르게 입력해주세요.');
        return;
      }

      if (
        maxParticipants !== null &&
        (!Number.isInteger(maxParticipants) ||
          maxParticipants < 1 ||
          maxParticipants > 2147483647)
      ) {
        setError('참여 정원은 1 이상의 정수로 입력해주세요.');
        return;
      }
    }

    // 시작 후에는 변경 제한 항목을 원본 값 그대로 전송
    const payload = {
      title: form.title.trim(),
      content: form.content,
      postStatus: form.postStatus,
      goal: canEditConditions ? form.goal.trim() : original.goal,
      startDate: canEditConditions
        ? form.startDate
        : normalizeDate(original.startDate),
      endDate: canEditConditions
        ? form.endDate
        : normalizeDate(original.endDate),
      pointEarned: canEditConditions ? pointEarned : original.pointEarned,
      maxParticipants: canEditConditions
        ? maxParticipants
        : original.maxParticipants,
    };

    const formData = new FormData();

    formData.append(
      'request',
      new Blob([JSON.stringify(payload)], {
        type: 'application/json',
      }),
    );

    formData.append('replaceImages', String(replaceImages));

    if (replaceImages) {
      files.forEach((file) => formData.append('files', file));
    }

    savingRef.current = true;
    setSubmitting(true);

    try {
      const response = await fetch(
        `/api/admin/challenge/${encodeURIComponent(code)}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: formData,
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || '챌린지 수정에 실패했습니다.');
      }

      navigate(`/admin/challenge_manage/${code}`, {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof TypeError
          ? '서버 응답을 확인하지 못했습니다. 상세 화면에서 수정 여부를 확인해주세요.'
          : err.message,
      );
    } finally {
      savingRef.current = false;
      setSubmitting(false);
    }
  };

  if (loading) return <p>불러오는 중입니다.</p>;
  if (!form) return <p role="alert">{error || '데이터가 없습니다.'}</p>;

  return (
    <div className={styles.container}>
      <h1>챌린지 수정</h1>

      {!beforeStart && (
        <p className={styles.notice}>
          시작 후에는 제목·내용·공개 여부·이미지를 수정할 수 있습니다.
          목표·기간·보상·정원은 시작 전에만 변경할 수 있습니다.
        </p>
      )}

      {original.deleteYn && (
        <p className={styles.error}>삭제된 챌린지는 수정할 수 없습니다.</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset
          className={styles.fields}
          disabled={submitting || original.deleteYn}
        >
          <div>
            <label>
              제목
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={255}
                required
              />
            </label>
          </div>

          <div>
            <label>
              내용
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                maxLength={4000}
                required
              />
            </label>
          </div>

          <div>
            <label>
              공개 여부
              <select
                name="postStatus"
                value={form.postStatus}
                onChange={handleChange}
              >
                <option value="ACTIVE">공개</option>
                <option value="PRIVATE">비공개</option>
              </select>
            </label>
          </div>

          <fieldset className={styles.conditions} disabled={!beforeStart}>
            <legend>시작 전 변경 가능한 항목</legend>

            <div>
              <label>
                목표
                <input
                  name="goal"
                  value={form.goal}
                  onChange={handleChange}
                  maxLength={255}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                시작일시
                <input
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  step="1"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                종료일시
                <input
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  step="1"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                보상 포인트
                <input
                  type="number"
                  name="pointEarned"
                  value={form.pointEarned}
                  onChange={handleChange}
                  min="0"
                  max="2147483647"
                  step="1"
                  required
                />
              </label>
            </div>

            <div>
              <label>
                참여 정원
                <input
                  type="number"
                  name="maxParticipants"
                  value={form.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  max="2147483647"
                  step="1"
                  placeholder="비워두면 제한 없음"
                />
              </label>
            </div>
          </fieldset>

          <section className={styles.imageSection}>
            <h2>이미지</h2>

            {original.thumbnail && !replaceImages && (
              <img
                className={styles.currentImage}
                src={formatImagePath(original.thumbnail)}
                alt="기존 대표 이미지"
              />
            )}

            <div>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={replaceImages}
                  onChange={(event) => {
                    setReplaceImages(event.target.checked);
                    setFiles([]);
                  }}
                />
                기존 이미지 전체 변경
              </label>
            </div>

            {replaceImages && (
              <>
                <p className={styles.helpText}>
                  새로 선택한 이미지로 전체 교체합니다. 파일 없이 저장하면 기존
                  이미지를 모두 제거합니다.
                </p>

                <input
                  className={styles.fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) =>
                    setFiles(Array.from(event.target.files || []))
                  }
                />

                <div className={styles.previewList}>
                  {previews.map((url, index) => (
                    <img key={url} src={url} alt={`새 이미지 ${index + 1}`} />
                  ))}
                </div>

                <small className={styles.helpText}>
                  첫 번째 이미지가 대표 이미지로 저장됩니다.
                </small>
              </>
            )}
          </section>

          <button type="submit">
            {submitting ? '저장 중...' : '수정 저장'}
          </button>
        </fieldset>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={submitting || original.deleteYn}
          >
            {submitting ? '저장 중...' : '수정 저장'}
          </button>

          <button
            className={styles.cancelButton}
            type="button"
            disabled={submitting}
            onClick={() => navigate(`/admin/challenge_manage/${code}`)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChallengeUpdate;
