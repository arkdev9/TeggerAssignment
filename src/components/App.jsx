import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import CoinCard from "./CoinCard";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			coins: [],
			visor: 3
		}

		this.changeVisor = this.changeVisor.bind(this);
	}

	componentDidMount() {
		fetch("https://api.coincap.io/v2/assets")
			.then((resp) => {
				return resp.json()
			})
			.then((data) => {
				this.setState({
					coins: data.data
				});
			})
			.catch((reason) => {
				console.log("Couldn't fetch coins because -> " + reason);
			})
	}

	changeVisor() {
		this.setState({
			...this.state,
			visor: this.state.visor === 3 ? 4 : 3
		});
	}

	render() {
		let rows = [];
		let row = [];
		// md-3 if 4 cols, else md-4 for 3 cols
		let cols = "md-" + (this.state.visor === 4 ? "3" : "4");
		for (let i = 0; i < this.state.coins.length; i++) {
			row.push(<Col className={cols} ><CoinCard coin={this.state.coins[i]}></CoinCard></Col>);
			if (i % this.state.visor === this.state.visor - 1) {
				rows.push(<Row className="mt-2 mb-2">{row}</Row>);
				row = [];
			}
		}
		return (
			<Container>
				<Row>
					<Col className="text-center">
						<Button onClick={this.changeVisor}>Change Visor Length to {this.state.visor === 3 ? "4" : "3"}</Button>
					</Col>
				</Row>
				{rows}
			</Container>
		);
	}
}

export default App;
