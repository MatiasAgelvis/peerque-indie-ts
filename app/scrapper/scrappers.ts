function regexCount(str: string, pattern: string | RegExp): number {
	// returns the number of marches of a pattern in a string
	return ((str || "").match(pattern) || []).length;
}

export type scrapperOptions = {
	avgScore: string | object;
	reviewCount: string | object;

	reviews: {
		listItem: string;
		data: {
			stars: object;
			likes: object;
			date: object;
		};
	};
};

export type scrapperResult = {
	avgScore: number;
	reviewCount: number;

	reviews: [
		{
			stars: number;
			likes: number;
			date: Date;
		}
	];
};

export const courseraScrapper = {
	avgScore: { selector: ".number-rating", convert: parseFloat },
	reviewCount: {
		selector: "[data-test=ratings-count-without-asterisks]",
		convert: (x: string) => parseInt(x.match(/\d/g)!.join("")),
	},

	reviews: {
		listItem: ".review",
		data: {
			stars: {
				selector: "title",
				convert: (x: string) => regexCount(x, /Filled Star/g),
			},
			likes: {
				selector: ".review-helpful-button",
				convert: (x: string) =>
					parseInt(x.match(/This is helpful \((.*)\)/)![1]) || 0,
			},
			date: {
				selector: ".dateOfReview",

				convert: (x: string) => new Date(x),
			},
		},
	},
};
