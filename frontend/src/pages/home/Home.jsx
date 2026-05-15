import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
      <div>메인페이지</div>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus autem
        perspiciatis, nulla in incidunt ipsa dolor corrupti beatae quas possimus
        error reprehenderit quod, eveniet iste magni voluptas. Fugit, molestias
        veniam.
        <div className={styles.box}>
          BOX
          <p className={styles.date}>
            date
            <span className={styles.text}>text</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
