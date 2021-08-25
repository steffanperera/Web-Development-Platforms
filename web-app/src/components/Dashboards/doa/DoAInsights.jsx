import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import useFetch from "use-http";
import moment from "moment";

const typeLabels = {
  non_organic_veg: "Non Organic Vegetable",
  organic_veg: "Organic Vegetable",
  organic_fruit: "Organic Fruit",
  non_organic_fruit: "Non Organic Fruit",
};

const useStyles = makeStyles({
  mTop: {
    marginTop: "25px",
  },
  title: {
    fontSize: "1.2em",
  },
});
const DoAInsights = () => {
  const { get, response } = useFetch("http://localhost:3001");
  const classes = useStyles();
  const [graphData, setGraphData] = useState({
    labels: ["Vegeta", "Blue", "abc"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [barData, setBarData] = useState({
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        label: "Rejected",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Pending",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Accepted",
        data: [0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  });
  const [summary, setSummary] = useState({
    ACCEPTED: 0,
    PENDING: 0,
    REJECTED: 0,
  });

  useEffect(() => {
    let labels = [0, 1, 2, 3, 4, 5, 6, 7].map((x) =>
      moment().subtract(x, "days").format("YYYY-MM-DD")
    );

    const getByDate = async () => {
      const results = await get("/listing/countByDate");
      let dataP = [0, 0, 0, 0, 0, 0, 0, 0];
      let dataA = [0, 0, 0, 0, 0, 0, 0, 0];
      let dataR = [0, 0, 0, 0, 0, 0, 0, 0];
      if (response.ok && response.status === 200) {
        results.forEach((result) => {
          const date = moment(result.date).format("YYYY-MM-DD");
          const index = labels.indexOf(date);
          switch (result.item_status) {
            case "PENDING":
              dataP[index] = result.count;
              break;
            case "ACCEPTED":
              dataA[index] = result.count;
              break;
            case "REJECTED":
              dataR[index] = result.count;
              break;
          }
        });
        const newDataset = barData.datasets.map((x, i) => ({
          ...x,
          data: i === 0 ? dataR : i === 1 ? dataP : dataA,
        }));
        setBarData({ labels: labels, datasets: newDataset });
      } else {
        console.log(results);
      }
    };
    getByDate();
  }, []);

  useEffect(() => {
    const getListingData = async () => {
      const results = await get("/listing/countByType");
      if (response.ok) {
        let data = [];
        let labels = [];
        results.forEach((result) => {
          data = [...data, result.count];
          labels = [
            ...labels,
            typeLabels[result.item_type]
              ? typeLabels[result.item_type]
              : result.item_type,
          ];
        });
        const dataset = graphData.datasets[0];
        setGraphData({
          labels: labels,
          datasets: [{ ...dataset, data: data }],
        });
      }
    };
    getListingData();
  }, []);

  useEffect(() => {
    const getSummary = async () => {
      const results = await get("/listing/countByStatus");
      if (response.ok && response.status === 200) {
        const reducer = (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.item_status]: currentValue.count,
        });
        setSummary(results.reduce(reducer, {}));
      } else {
        console.log(results);
      }
    };
    getSummary();
  }, []);

  return (
    <Grid item container>
      <Grid item container sm={12} spacing={2}>
        {Object.entries(summary).map(([k, v]) => (
          <Grid item sm={4}>
            <Card
              style={{
                backgroundColor:
                  k === "ACCEPTED"
                    ? "#55efc4"
                    : k === "REJECTED"
                    ? "#ff7675"
                    : "#ffeaa7",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {k}
                </Typography>
                <Typography variant="h4" color="textSecondary" gutterBottom>
                  {v}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item sm={12} className={classes.mTop}>
        <Card elevation={4}>
          <CardContent styles={{ padding: "10px" }}>
            <Typography
              style={{ textAlign: "center", marginBottom: "1em" }}
              variant="h4"
              gutterBottom
            >
              Total Listing by Item Type
            </Typography>
            <Pie data={graphData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} className={classes.mTop}>
        <Card elevation={4}>
          <CardContent styles={{ padding: "10px" }}>
            <Typography
              style={{ textAlign: "center", marginBottom: "1em" }}
              variant="h4"
              gutterBottom
            >
              Items by item status for the past week
            </Typography>
            <Bar
              data={barData}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DoAInsights;
