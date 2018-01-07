describe("Dough", function() {
  describe("Single batch", function() {
    it("should calculate doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(SINGLE, 0, 267.8);
      expect(family).toBeCloseTo(11, 1);
      expect(large).toBeCloseTo(15, 1);
      expect(medium).toBeCloseTo(0, 1);
    });

    it("should calculate all family doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(SINGLE, 0, 0);
      expect(family).toBeCloseTo(22, 0);
      expect(large).toBeCloseTo(0, 1);
      expect(medium).toBeCloseTo(0, 1);
    });

    it("should calculate all large doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(SINGLE, 0, SINGLE);
      expect(family).toBeCloseTo(0, 1);
      expect(Math.floor(large)).toEqual(29);
      expect(medium).toBeCloseTo(0, 1);
    });

    it("should calculate all medium doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(SINGLE, SINGLE, SINGLE);
      expect(family).toBeCloseTo(0, 1);
      expect(large).toBeCloseTo(0, 1);
      expect(medium).toBeCloseTo(41, 0);
    });
  });

  describe("Double batch", function() {
    it("should calculate doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(DOUBLE, 0, 2 * 267.8);
      expect(family).toBeCloseTo(22, 1);
      expect(large).toBeCloseTo(30, 1);
      expect(medium).toBeCloseTo(0, 1);
    });

    it("should calculate all family doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(DOUBLE, 0, 0);
      expect(Math.floor(family)).toEqual(44);
      expect(large).toBeCloseTo(0, 1);
      expect(medium).toBeCloseTo(0, 1);
    });

    it("should calculate all large doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(DOUBLE, 0, DOUBLE);
      expect(family).toBeCloseTo(0, 1);
      expect(Math.floor(large)).toEqual(59);
      expect(medium).toBeCloseTo(0, 1);
    });

    it("should calculate all medium doughBalls", function() {
      const [family, large, medium] = calculateDoughBalls(DOUBLE, DOUBLE, DOUBLE);
      expect(family).toBeCloseTo(0, 1);
      expect(large).toBeCloseTo(0, 1);
      expect(Math.floor(medium)).toEqual(82);
    });
  });
});

