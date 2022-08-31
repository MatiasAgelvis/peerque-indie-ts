import { readFileSync } from "fs";
import { expect, test } from "vitest";
import { peerqueScore, scrape } from "~/scrapper/muncher";
import { courseraScrapper, date, scrapperResult } from "~/scrapper/scrappers";

test("Coursera scrape should extract the expected data", () => {
  const HTML = readFileSync(__dirname + "/" + "reviewPage.html").toString();
  expect(HTML).not.null;

  const scrappe = scrape(HTML, courseraScrapper);
  console.log(scrappe);
  expect(scrappe).not.null;
  expect(scrappe.reviews.length).toBe(25);
  expect(scrappe.reviews.map((x) => x.stars)).toStrictEqual([
    2, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 1, 1, 5, 5, 5, 5, 5,
  ]);

  expect(scrappe.reviews.map((x) => x.likes)).toStrictEqual([
    14, 6, 5, 4, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
  ]);

  expect(scrappe.reviews[0].date).toBeCloseTo(date("2019-07-06"));

  expect(scrappe.reviews[0]).toStrictEqual({
    stars: 2,
    likes: 14,
    date: date("2019-07-06"),
  });
});
