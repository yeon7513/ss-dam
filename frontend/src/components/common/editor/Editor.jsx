import cn from 'classnames';
import TextInput from '../../forms/text-input/TextInput';
import SelectBox from './../../forms/select-box/SelectBox';
import styles from './Editor.module.scss';

function Editor({ title, categories }) {
  return (
    <div className={cn(styles.editor)}>
      <h3>{title}</h3>
      <div>
        <div className={styles.title}>
          <SelectBox options={categories} />
          <TextInput label="제목" />
        </div>
        <div className={styles.content}>
          <textarea />
        </div>
      </div>
    </div>
  );
}

export default Editor;
