import { scrapeHTML } from "scrape-it";
import { scrapperOptions, scrapperResult } from "./scrappers";

type scoreParameters = {
	likesPower: number;
	timeDecay: number;
};

export function peerqueScore(
	HTML: string,
	scrapeOptions: object,
	scoreParameters: scoreParameters
) {
	const scrape: scrapperResult = scrapeHTML(HTML, scrapeOptions);

	return scrape;
}
