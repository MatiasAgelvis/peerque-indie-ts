import { peerqueScore, scoreParameters } from "~/scrapper/muncher";
import { date } from "~/scrapper/scrappers";

describe("Peerque to Score should improve rating of products", () => {
  test("should agree with average rating if it is correct", () => {
    ////////////////////////////
    // Global Value
    ////////////////////////////
    const perfect = {
      avgScore: 5,
      reviewCount: 20,
      reviews: [
        { stars: 5, likes: 5, date: date("2019") },
        { stars: 5, likes: 3, date: date("2018") },
      ],
    };

    expect(peerqueScore(perfect, scoreParameters)).toBe(5);

    const hotmess = {
      avgScore: 1,
      reviewCount: 20,
      reviews: [
        { stars: 1, likes: 5, date: date("2019") },
        { stars: 1, likes: 3, date: date("2018") },
      ],
    };

    expect(peerqueScore(hotmess, scoreParameters)).toBe(1);
  });

  test("should correct fake aggregated values", () => {
    const fake = {
      avgScore: 5,
      reviewCount: 100,
      reviews: [
        { stars: 1, likes: 50, date: date("2019") },
        { stars: 5, likes: 3, date: date("2018") },
      ],
    };

    let score = peerqueScore(fake, scoreParameters);
    expect(score).toBeLessThan(3);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(5);
  });

  test("should value more the reviews with more likes", () => {
    ////////////////////////////
    // Like Value
    ////////////////////////////
    const haters = {
      avgScore: 3,
      reviewCount: 200,
      reviews: [
        { stars: 5, likes: 20, date: date("2019") },
        { stars: 1, likes: 1, date: date("2018") },
        { stars: 1, likes: 1, date: date("2018") },
        { stars: 1, likes: 1, date: date("2018") },
        { stars: 1, likes: 1, date: date("2018") },
        { stars: 1, likes: 1, date: date("2018") },
      ],
    };

    let score = peerqueScore(haters, scoreParameters);
    expect(score).toBeGreaterThan(3);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(5);

    const fanboys = {
      avgScore: 2,
      reviewCount: 200,
      reviews: [
        { stars: 1, likes: 20, date: date("2018") },
        { stars: 5, likes: 1, date: date("2019") },
        { stars: 5, likes: 1, date: date("2019") },
        { stars: 5, likes: 1, date: date("2019") },
        { stars: 5, likes: 1, date: date("2019") },
        { stars: 5, likes: 1, date: date("2018") },
        { stars: 5, likes: 1, date: date("2018") },
      ],
    };

    score = peerqueScore(fanboys, scoreParameters);
    expect(score).toBeLessThan(3);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(5);
  });

  test("should give more weight to recent reviews", () => {
    ////////////////////////////
    // Time Value
    ////////////////////////////
    const redemption = {
      avgScore: 3,
      reviewCount: 200,
      reviews: [
        { stars: 5, likes: 15, date: date("2020") },
        { stars: 2, likes: 30, date: date("2010") },
      ],
    };

    let score = peerqueScore(redemption, scoreParameters);
    expect(score).toBeGreaterThan(3);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(5);

    const decay = {
      avgScore: 4,
      reviewCount: 200,
      reviews: [
        { stars: 1, likes: 15, date: date("2020") },
        { stars: 4, likes: 30, date: date("2010") },
      ],
    };
    score = peerqueScore(decay, scoreParameters);
    expect(score).toBeLessThan(3);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(5);
  });
});
