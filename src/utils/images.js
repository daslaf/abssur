export const preloadImages = (images) =>
  new Promise((resolve) => {
    const total = images.length;
    let loaded = 0;

    const update = () => {
      loaded += 1;

      if (total === loaded) {
        resolve();
      }
    };
  
    images.forEach((url) => {
      const image = new Image();
  
      image.onload = update;
      image.onerror = update;
  
      image.src = url;
    });
  });