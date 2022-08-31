import { gotScraping } from "got-scraping";
import { URL } from "url";

export async function request(URL: string | URL) {
	return await gotScraping({ url: URL });
}
