import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import dataFileCardStyles from "./components/DataFileCard/styles.module.scss";
import { BackgroundComponent } from "../../components/Background";
import { HeaderComponent } from "../../components/Header";
import { LoadingSpinnerComponent } from "../../components/loading";
import {DataFileCardRoutedComponent} from "./components/DataFileCard";

import DataFilesService from "../../services/datafiles.service";
import { DataFileType } from "../../types/datafiles.types";



function AddCard(id: number) {
  return (
    <div className={dataFileCardStyles.fileCard} key={id}>
      <button className={styles.addButton}>
        <Link
          className="fill-div"
          style={{ padding: "30px" }}
          to={"/dashboard/add"}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="4x" />
        </Link>
      </button>
    </div>
  );
}

interface DashBoardState {
  datafiles: Array<DataFileType>,
  total: number,
  error: string,
  loading: boolean
}

class DashboardComponent extends Component<RouteComponentProps, DashBoardState> {
  dataFilesService: DataFilesService;

  constructor(props) {
    super(props);
    this.dataFilesService = new DataFilesService();
    this.state = {
      datafiles: new Array<DataFileType>(),
      total: 0,
      error: "",
      loading: false
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
      <DataFileCardRoutedComponent id={d.id} name={d.name} createdAt={d.created_at.toString()} />
    );
    cards.push(AddCard(cards.length));
    return (
      <BackgroundComponent>
        <HeaderComponent />
        <div>
          <h2>Seus conjuntos de dados</h2>
          <div className={styles.dashBoard}>{cards}</div>
        </div>
      </BackgroundComponent>
    );
  }
}

export const DashboardPage = withRouter(DashboardComponent);


