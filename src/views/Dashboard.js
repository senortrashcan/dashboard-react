import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { chartExample1, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";

const Dashboard = () => {
  const [solanaChartData, setSolanaChartData] = useState(null);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const fetchSolanaData = async () => {
    try {
      const response = await axios.get(
        "https://api.coincap.io/v2/assets/solana/history?interval=m15"
      );
      const prices = response.data.data;

      // Use only the last 15 data points
      const last15DataPoints = prices.slice(-15);

      const labels = last15DataPoints.map((priceData) => formatTime(priceData.time));
      const data = last15DataPoints.map((priceData) => formatPrice(priceData.priceUsd));

      setSolanaChartData({
        labels: labels,
        datasets: [
          {
            label: "Solana Price (USD)",
            fill: true,
            backgroundColor: "rgba(29,140,248,0.2)",
            borderColor: "#1f8ef1",
            borderWidth: 2,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointHoverBorderWidth: 15,
            data: data,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching Solana data", error);
    }
  };

  useEffect(() => {
    fetchSolanaData();
    const intervalId = setInterval(fetchSolanaData, 900000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="3"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data4",
                        })}
                        onClick={() => setBgChartData("data4")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solana
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-chart-bar-32" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {bigChartData === "data1" && (
                    <Line
                      data={chartExample1.data1}
                      options={chartExample1.options}
                    />
                  )}
                  {bigChartData === "data2" && (
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  )}
                  {bigChartData === "data3" && (
                    <Line
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Other Rows */}
        {/* Add your other cards here */}
      </div>
    </>
  );
}

export default Dashboard;
