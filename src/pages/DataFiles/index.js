import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import DataFileCard from "../../components/DataFile/DataFileCard";
import { PageTitle, Container } from "../styles";
import { Card } from "../../components/DataFile/Card/styles";
import { DashBoard, AddButton } from "./styles";


import DataFilesService from "../../services/datafiles";



function AddCard(id) {
  return (
    <Card key={id}>
      <AddButton>
        <Link
          className="fill-div"
          style={{ padding: "30px" }}
          to={"/dashboard/add"}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="4x" />
        </Link>
      </AddButton>
    </Card>
  );
}

class DataFiles extends Component {
  constructor(props) {
    super(props);
    this.dataFilesService = new DataFilesService();
    this.state = {
      datafiles: [],
      total: 0,
      error: "",
    };
  }

  async componentDidMount() {
    await this.dataFilesService.list("created_at", false).then(
      (response) => {
        this.setState({
          total: response.total,
          datafiles: response.documents,
        });
      },
      (err) => {
        this.setState({ error: err.error });
      }
    );
  }

  render() {
    const cards = this.state.datafiles.map((d) =>
      <DataFileCard id={d.id} name={d.name} createdAt={d.created_at} />
    );
    cards.push(AddCard(cards.length));
    return (
      <div>
        <PageTitle>Dashboard</PageTitle>
        <Container>
          <h2>Seus conjuntos de dados</h2>
          <DashBoard>{cards}</DashBoard>
        </Container>
      </div>
    );
  }
}

export default withRouter(DataFiles);
