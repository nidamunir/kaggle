// lib
import React, { Component } from "react";
// src
import { ResponsivePie } from "@nivo/pie";
import { transform } from "./utils/getPieChartData";
import { ChartProps } from "../../types/types";
import { PieAttributes } from "./PieAttributes";

export class PieChart extends Component<ChartProps, {}> {
  state = {
    data: [],
    query: "cp",
    queryDescription: "Chest pain types"
  };

  async componentDidUpdate(prevProps: ChartProps, prevState: any) {
    const { isLoading, data: fileData } = this.props;
    const { query } = this.state;
    if (isLoading != prevProps.isLoading || query !== prevState.query) {
      if (!isLoading) {
        const data = transform(fileData, query);
        this.setState({ data });
      }
    }
  }

  updateQuery = (query: string, queryDescription: string) => {
    this.setState({ query, queryDescription });
  };
  render() {
    const { data, queryDescription } = this.state;
    const { isLoading } = this.props;
    if (isLoading) return <p>Loading</p>;
    else
      return (
        <React.Fragment>
          <h5>
            This pie chart shows four types of chest pains and the respective
            no. of patients who have it
          </h5>
          <PieAttributes updateQuery={this.updateQuery} />
          <h5>{queryDescription}</h5>
          {/* <span id="pie-params">
            <a
              onClick={() => {
                this.updateQuery("fbs");
              }}
            >
              fbs
            </a>
            <a
              onClick={() => {
                this.updateQuery("cp");
              }}
            >
              cp
            </a>

            <a
              onClick={() => {
                this.updateQuery("thalach");
              }}
            >
              thalach
            </a>

            <a
              onClick={() => {
                this.updateQuery("exang");
              }}
            >
              exang
            </a>
            <a
              onClick={() => {
                this.updateQuery("oldpeak");
              }}
            >
              oldpeak
            </a>
            <a
              onClick={() => {
                this.updateQuery("ca");
              }}
            >
              ca
            </a>
          </span>
        
         */}
          <div id="pie-chart">
            {/* <button onClick={this.updateQuery()}>Chest pain</button> */}
            <ResponsivePie
              data={data}
              margin={{
                top: 40,
                right: 80,
                bottom: 80,
                left: 80
              }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors="nivo"
              colorBy="id"
              borderWidth={1}
              borderColor="inherit:darker(0.2)"
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor="inherit"
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              fill={[
                {
                  match: {
                    id: "ruby"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "c"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "go"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "python"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "scala"
                  },
                  id: "lines"
                },
                {
                  match: {
                    id: "lisp"
                  },
                  id: "lines"
                },
                {
                  match: {
                    id: "elixir"
                  },
                  id: "lines"
                },
                {
                  match: {
                    id: "javascript"
                  },
                  id: "lines"
                }
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000"
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </React.Fragment>
      );
  }
}
