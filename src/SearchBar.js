import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Lable from "@material-ui/icons/KeyboardArrowRight";

import { ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";


import keys from './key'

const styles = {
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: `${window.innerWidth-20}px`,
		margin:'auto'
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		width: 1, 
		height: 28,
		margin: 4
	}
};



class CustomizedInputBase extends React.Component {
	constructor(props) {
		super(props);
		this.HandelInput = this.HandelInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		input: "",
		disease: ""
	};
	HandelInput(event) {
		this.setState({
			input: event.target.value
		});
		axios
			.get(
				`https://sandbox-healthservice.priaid.ch/symptoms?token=${keys}&format=json&language=en-gb`
			)
			.then(res =>
				this.setState({
					disease: res.data.filter(temp =>
						temp.Name.toLowerCase().includes(this.state.input.toLowerCase())
					)
				})
			);
		console.log(this.state.disease);
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		const { classes } = this.props;
		if (this.state.disease) {
			return (
				<div>
					<form onSubmit={this.handleSubmit}>
						<Paper className={classes.root} elevation={1}>
							<InputBase
								className={classes.input}
								onChange={this.HandelInput}
								placeholder="e.g Abdominal pain"
							/>
							<Divider className={classes.divider} />
							<IconButton className={classes.iconButton} aria-label="Search">
								<SearchIcon type="submit" />
							</IconButton>
						</Paper>
					</form>
					{this.state.disease.map(disease => (
						<Link
							to={`/disease/${disease.ID}`}
							key={disease.ID}
							style={{ textDecoration: "none" }}>
							<ListItem divider style={{width:`${window.innerWidth-50}px`,margin:'auto'}}  button>
								<ListItemText primary={disease.Name} />
								<Lable />
							</ListItem>
						</Link>
					))}
				</div>
			);
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<Paper className={classes.root} elevation={1}>
					<InputBase
						className={classes.input}
						onChange={this.HandelInput}
						placeholder="e.g Abdominal pain"
					/>
					<Divider className={classes.divider} />
					<IconButton className={classes.iconButton} aria-label="Search">
						<SearchIcon type="submit" />
					</IconButton>
				</Paper>
			</form>
		);
	}
}

CustomizedInputBase.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputBase);
