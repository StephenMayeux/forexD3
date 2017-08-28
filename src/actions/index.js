import axios from 'axios';

const fetchData = () => {
	return (dispatch) => {
		axios.get('http://localhost:3030/latest')
			.then(({ data }) => {
				dispatch({
					type: 'FETCH_DATA',
					payload: data
				})
			})
	}
}

export const actionCreators = {
	fetchData
}
