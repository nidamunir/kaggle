// lib
import React, { Component } from "react";

export const PieAttributes = (props: any) => {
  const { updateQuery } = props;
  return (
    <React.Fragment>
      <span id="pie-attr">
        {/* <span>Attributes: ****** </span> */}
        <a
          onClick={() => {
            updateQuery(
              "fbs",
              "Fasting blood sugar > 120 mg/dl (yes = true; no = false)"
            );
          }}
        >
          fbs
        </a>
        <a
          onClick={() => {
            updateQuery("cp", " Chest Pain Type");
          }}
        >
          cp
        </a>

        <a
          onClick={() => {
            updateQuery("thalach", "Maximum heart rate achieved");
          }}
        >
          thalach
        </a>

        <a
          onClick={() => {
            updateQuery("exang", "  exercise induced angina (yes; no)");
          }}
        >
          exang
        </a>
        <a
          onClick={() => {
            updateQuery(
              "oldpeak",
              "ST depression induced by exercise relative to rest"
            );
          }}
        >
          old peak
        </a>
        <a
          onClick={() => {
            updateQuery(
              "ca",
              "number of major vessels (0-3) colored by flourosopy"
            );
          }}
        >
          ca
        </a>
      </span>
    </React.Fragment>
  );
};
