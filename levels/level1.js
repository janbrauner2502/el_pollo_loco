const level1 = new Level(
  [
    new NormalChicken(),
    new NormalChicken(),
    new NormalChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Endboss(),
  ],
  [new Cloud(), new Cloud(), new Cloud()],
  (function () {
    let objects = [];
    [1, 2, 3, 4].forEach((index) => {
      let xValue = (index - 1) * 720;
      let imgIndex = index % 2 === 0 ? "2" : "1";
      objects.push(
        new BackgroundObject("img/5_background/layers/air.png", xValue),
      );
      objects.push(
        new BackgroundObject(
          `img/5_background/layers/3_third_layer/${imgIndex}.png`,
          xValue,
        ),
      );
      objects.push(
        new BackgroundObject(
          `img/5_background/layers/2_second_layer/${imgIndex}.png`,
          xValue,
        ),
      );
      objects.push(
        new BackgroundObject(
          `img/5_background/layers/1_first_layer/${imgIndex}.png`,
          xValue,
        ),
      );
    });
    return objects;
  })(),
);
