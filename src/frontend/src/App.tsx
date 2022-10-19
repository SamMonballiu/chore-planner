import { Chore } from "@common/models";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import "./App.scss";

const url = "http://raspberrypi:1904/api/chores/";

const App: FC = () => {
  const { data: chores } = useQuery(["getChores"], async () => {
    return await axios.get<Chore[]>(url);
  });

  return (
    <div className="App">
      <h1>Hello world</h1>
      <Button variant="contained">Test</Button>
    </div>
  );
};

export default App;
