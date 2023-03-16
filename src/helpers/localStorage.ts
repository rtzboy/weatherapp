export const getStoreSearchHistory = (key: string) => {
	const value = localStorage.getItem(key);
	try {
		if (!value) return;
		return JSON.parse(value);
	} catch (error) {
		console.log(error);
	}
};

export const storeSearchHistory = (key: string, item: any[]) => {
	try {
		localStorage.setItem(key, JSON.stringify(item));
	} catch (error) {
		console.log(error);
	}
};
