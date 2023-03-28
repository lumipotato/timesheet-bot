exports.fetching = async (url = '', method, payload, token = '') => {
	const URL = process.env.BASE_URL
	const PATH = process.env.URL_PATH.split(',')
	let options = {
		method: method,
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Authorization': `Bearer ${token}`,
			'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
			'Connection': 'keep-alive',
			'Content-Type': 'application/json',
			'DNT': '1',
			'Origin': `https://${PATH[1]}.${URL}`,
			'Referer': `https://${PATH[1]}.${URL}/`,
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-site',
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
			'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': 'Linux',
		}
	}

	payload ? Object.assign(options, {body: JSON.stringify(payload)}) : ''

	/* const response = await fetch(url, options);
	return response; */
	try {
    const response = await fetch(url, options);
		// console.log('try :>> ', response);
		if (response.statusText === 'OK') {
			const data = await response.json();
			return data
		} else {
			return response.statusText
		}
  } catch (error) {
    return error.cause.code || error.cause
  }
}