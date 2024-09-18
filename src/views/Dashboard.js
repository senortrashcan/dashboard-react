import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
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

// Chart options
const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 0,
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
    xAxes: {
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
  },
};

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [solanaChartData, setSolanaChartData] = useState(null);

  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const fetchSolanaData = async () => {
    try {
      const response = await axios.get(
        "https://api.coincap.io/v2/assets/solana/history?interval=m15"
      );
      const prices = response.data.data;

      const labels = prices.map((priceData) => {
        const date = new Date(priceData.time);
        return date.toLocaleTimeString(); // Format time as you prefer
      });

      const data = prices.map((priceData) => parseFloat(priceData.priceUsd));

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
    // Fetch data when component mounts
    fetchSolanaData();

    // Set interval to update data every 15 minutes (900,000 ms)
    const intervalId = setInterval(fetchSolanaData, 900000);

    // Cleanup interval on component unmount
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
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {bigChartData === "data1" && (
                    <Line
                      data={chartExample1[bigChartData]}
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
                  {bigChartData === "data4" && solanaChartData && (
                    <Line
                      data={solanaChartData}
                      options={chartOptions}
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
