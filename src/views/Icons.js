/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function Icons() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <center>
                <h5 className="title">Solana Staking</h5>
                <p className="category">
                  *Please note we are still in the process of integrating our own interface. Your assets are safe.
                </p>
                </center>
              </CardHeader>
              <center>
              <CardBody className="all-icons">
                <Row>
                  <center>
                  <p className="font-icon-list col-xs-6 col-xs-6" lg="2" md="3" sm="4">
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-alert-circle-exc" />
                      <p>icon-alert-circle-exc</p>
                      <iframe id="staking-kiwi-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 472px; height: 302px" title="Staking Kiwi widget" src="https://widget.staking.kiwi/?validator=&theme=dark" ></iframe>
                      <script src="https://widget.staking.kiwi/js/widget.min.js"></script>
                    </div>
                  </p>
                  </center>
                </Row>
              </CardBody>
              </center>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Icons;
