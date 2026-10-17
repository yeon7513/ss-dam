import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal, HiOutlineFlag } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext.jsx";
import styles from "./MemberActions.module.scss";

export default function MemberActions({ memberProfile }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const report = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    report.current?.focus();
    const handleOutside = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  if (!memberProfile?.code ||
      (user?.code != null && String(user.code) === String(memberProfile.code))) {
    return null;
  }

  return (
    <div
      ref={root}
      className={styles.wrap}
      onClick={(event) => event.stopPropagation()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-label={`${memberProfile.id || "작성자"} 메뉴`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <HiDotsHorizontal aria-hidden="true" />
      </button>
      {open && (
        <div id={panelId} className={styles.panel}>
          <Link
            ref={report}
            to={`/members/${memberProfile.code}/report`}
            onClick={() => setOpen(false)}
          >
            <HiOutlineFlag aria-hidden="true" />
            신고하기
          </Link>
        </div>
      )}
    </div>
  );
}
