import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import DataFileCard from "../../components/DataFile/DataFileCard";
import { PageTitle, Container } from "../styles";
import { Card } from "../../components/DataFile/Card/styles";
import { DashBoard, AddButton } from "./styles";


import DataFilesService from "../../services/datafiles.service";
import { DataFileType } from "../../types/datafiles.types";



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

interface IDashboardState {
  dataFiles: DataFileType[],
  total: number,
  error: string | null
}


class DashboardComponent extends Component<{},IDashboardState> {
  dataFilesService: DataFilesService;



  constructor(props) {
    super(props);
    this.dataFilesService = new DataFilesService();
    this.state = {
      dataFiles: new Array<DataFileType>(),
      total: 0,
      error: null,
    };
  }

  async componentDidMount() {
    await this.dataFilesService.list("created_at", false).then(
      (response) => {
        this.setState({
          total: response.total,
          dataFiles: response.documents,
        });
      },
      (err) => {
        this.setState({ error: err.error });
      }
    );
  }

  render() {
    const cards = this.state.dataFiles.map((d) =>
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

export const DashboardPage = withRouter(DashboardComponent);


