const LoadingComponent = () => {
  const loadings = [
    'loading-spinner',
    'loading-dots',
    'loading-ring',
    'loading-ball',
    'loading-bars',
    'loading-infinity',
  ];
  const colors = [
    'text-primary',
    'text-secondary',
    'text-accent',
    'text-neutral',
    'text-info',
    'text-success',
    'text-warning',
    'text-error',
  ];

  const getRandomItem = (array: string[]) => {
    // Math.random() は、0以上1未満のランダムな浮動小数点数を生成
    // Math.random() * array.length は、0以上 array.length 未満のランダムな浮動小数点数を生成
    //つまり0から array.length - 1 までの範囲
    //Math.floor()で小数点きりすて
    const randomIndex = Math.floor(Math.random() * array.length);
    // 配列からrandomIndexの値を指定
    return array[randomIndex];
  };
  const count = 10;
  const generatedElements = Array.from({ length: count }, (_, index) => {
    const loadingClass = getRandomItem(loadings);
    const colorClass = getRandomItem(colors);
    const className = `loading ${loadingClass} ${colorClass} loading-lg`;
    return className;
  });

  return (
    <section className='absolute top-0 left-0 w-screen h-screen p-[32px] flex flex-wrap justify-center overflow-hidden bg-[rgba(0,0,0,0.5)]'>
      {generatedElements.map((i) => (
        <span className={i}></span>
      ))}
    </section>
  );
};

export default LoadingComponent;
