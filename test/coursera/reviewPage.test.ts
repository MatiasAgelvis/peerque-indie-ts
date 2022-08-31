import { readFileSync } from "fs";
import { expect, test } from "vitest";
import { peerqueScore } from "~/scrapper/muncher";
import { courseraScrapper, scrapperResult } from "~/scrapper/scrappers";

test("should work as expected", () => {
  const HTML = readFileSync(__dirname + "/" + "reviewPage.html").toString();
  expect(HTML).not.null;

  const scrappe = peerqueScore(HTML, courseraScrapper, null);
  console.log(scrappe);
  expect(scrappe).not.null;
  expect(scrappe.reviews.length).toBe(25);
  expect(scrappe.reviews.map((x) => x.stars)).toStrictEqual([
    2, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 1, 1, 5, 5, 5, 5, 5,
  ]);

  expect(scrappe.reviews.map((x) => x.likes)).toStrictEqual([
    14, 6, 5, 4, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1,
  ]);

  expect(scrappe.reviews[0].date.getMonth()).toBeCloseTo(
    new Date("2019-07-06").getMonth()
  );
  expect(scrappe.reviews[0].date.getFullYear()).toBeCloseTo(
    new Date("2019-07-06").getFullYear()
  );
});
