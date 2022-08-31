import { dotMultiply } from "mathjs";
import { scrapeHTML } from "scrape-it";
import { linearRegression, linearRegressionLine, sum } from "simple-statistics";
import { scrapperOptions, scrapperResult } from "./scrappers";

// type scoreParameters = {
// 	timeDecay: number;
// 	peerPower: number;
// 	baseValue: number;
// };
// export const scoreParameters = {
// 	timeDecay: 4,
// 	peerPower: 2,
// 	baseValue: 2,
// };

export function scrape(
	HTML: string,
	scrapeOptions: scrapperOptions
): scrapperResult {
	return scrapeHTML(HTML, scrapeOptions);
}

function sum(arr: Array<number>) {
	return arr.reduce((prev, curr) => prev + curr);
}

function round(num: number, decimalPlaces: number = 0): number {
	num = Math.round(Number(num + "e" + decimalPlaces));
	return Number(num + "e" + -decimalPlaces);
}

export function peerqueScore(
	data: scrapperResult
	// scoreParameters: scoreParameters
) {
	const unixYears = 31104e6;

	const stars = data.reviews.map((rev) => rev.stars);
	const likes = data.reviews.map((rev) => rev.likes);
	const dates = data.reviews.map((rev) => rev.date / unixYears);

	const gross = dates.map((date, i) => Math.pow(date, 2) * likes[i]);
	return round(sum(gross.map((x, i) => x * stars[i])) / sum(gross), 2);
}
