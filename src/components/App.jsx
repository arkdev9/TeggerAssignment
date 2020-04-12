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
		let colsMd = (this.state.visor === 4 ? "3" : "4");
		for (let i = 0; i < this.state.coins.length; i++) {
			row.push(<Col md={colsMd} ><CoinCard coin={this.state.coins[i]}></CoinCard></Col>);
			if (i % this.state.visor === this.state.visor - 1) {
				rows.push(<Row className="mt-4 mb-4">{row}</Row>);
				row = [];
			}
		}
		return (
			<Container fluid={true}>
				<Row className="mt-4 mb-4">
					<Col className="text-center">
						<h1>Tegger Coin Dashboard</h1>
					</Col>
				</Row>
				<Row className="mt-4 mb-4">
					<Col className="text-center">
						<Button onClick={this.changeVisor}>
							Change Visor Length to {this.state.visor === 3 ? "4" : "3"}
						</Button>
					</Col>
				</Row>
				{rows}
			</Container>
		);
	}
}

export default App;
