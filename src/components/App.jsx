import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Chart from "./Chart";

class App extends React.Component {
	render() {
		return (
			<Container fluid={true}>
				<Row className="mt-4 mb-4">
					<Col className="text-center">
						<h1>Tegger Coin Dashboard</h1>
					</Col>
				</Row>
				<Router>
					<Switch>
						<Route path="/chart/:symbol" component={Chart} />
						<Route path="/">
							<Dashboard></Dashboard>
						</Route>
					</Switch>
				</Router>
			</Container>
		)
	}
}

export default App;