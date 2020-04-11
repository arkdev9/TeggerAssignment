import React from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardText,
	Media
} from "reactstrap";
import NumberFormat from "react-number-format";

class CoinCard extends React.Component {
	render() {
		return (
			<Card>
				<CardHeader>
					<Media
						object
						middle
						src={"https://static.coincap.io/assets/icons/" + this.props.coin.symbol.toLowerCase() + "@2x.png"}
						style={{
							maxWidth: "40px",
							maxHeight: "40px"
						}}
						className="mr-2"
					/>
					{this.props.coin.symbol} - {this.props.coin.name}
				</CardHeader>
				<CardBody>
					<CardText>
						{/* TODO: Truncate the digits and suffix billions or millions, etc... */}
						Price: <NumberFormat
							prefix={"$"}
							thousandSeparator={true}
							value={this.props.coin.priceUsd}
							displayType={"text"}
							decimalScale={2}
							style={{ float: "right" }} />
						<br />
						Market Cap: <NumberFormat
							prefix={"$"}
							thousandSeparator={true}
							value={this.props.coin.marketCapUsd}
							displayType={"text"}
							decimalScale={2}
							style={{ float: "right" }} />
						<br />
						VWAP: <NumberFormat
							prefix={"$"}
							thousandSeparator={true}
							value={this.props.coin.vwap24Hr}
							displayType={"text"}
							decimalScale={2}
							style={{ float: "right" }} />
						<br />
						Supply: <NumberFormat
							prefix={"$"}
							thousandSeparator={true}
							value={this.props.coin.supply}
							displayType={"text"}
							decimalScale={2}
							style={{ float: "right" }} />
						<br />
						Volume: <NumberFormat
							prefix={"$"}
							thousandSeparator={true}
							value={this.props.coin.volumeUsd24Hr}
							displayType={"text"}
							decimalScale={2}
							style={{ float: "right" }} />
						<br />
						Change: <NumberFormat
							suffix={"%"}
							className={
								this.props.coin.changePercent24Hr > 0 ? "text-success" : "text-danger"
							}
							thousandSeparator={true}
							value={this.props.coin.changePercent24Hr}
							displayType={"text"}
							decimalScale={2}
							style={{ float: "right" }} />
						<br />
					</CardText>
				</CardBody>
			</Card>
		);
	}
}



export default CoinCard;