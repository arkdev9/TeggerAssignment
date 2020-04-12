import React from "react";
import { Line } from "react-chartjs-2";

class Chart extends React.Component {
	constructor(props) {
		super(props);

		let id = this.props.match.params.symbol;
		this.state = {
			id: id,
			data: {}
		};

		this.reshapeData = this.reshapeData.bind(this);
	}

	reshapeData(fetchedData) {
		// fetchedData is an array of { price, timestamp, date }
		// Take last 60 days, since array is sorted in ascending
		// date order.
		let labels = [];
		let data = [];
		let count = 0;
		for (let day of fetchedData.reverse()) {
			if (count === 30) break;
			else count += 1;
			labels.push(day.date.split("T")[0]);
			data.push(day.priceUsd);
		}

		return { labels: labels, data: data };
	}

	componentDidMount() {
		// Call api for history
		fetch("https://api.coincap.io/v2/assets/" + this.state.id + "/history?interval=d1")
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				let reshaped = this.reshapeData(data.data);
				let chartData = {
					labels: reshaped.labels,
					borderColor: "magenta",
					datasets: [
						{
							data: reshaped.data,
							label: "Price History by Day",
							borderColor: "magenta"
						}
					]
				}
				this.setState({
					...this.state,
					data: chartData
				});
			})
			.catch((reason) => {
				console.log("Couldn't fetch data because -> " + reason);
			})
	}

	render() {
		return (
			<Line
				data={this.state.data}
				width={100}
				height={50}
				options={{ title: { display: true, text: this.state.id + " - Price for Last 30 Days " } }}
			/>
		)
	}
}

export default Chart;