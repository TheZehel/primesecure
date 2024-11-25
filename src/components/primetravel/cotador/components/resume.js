import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(planName, passengers, total) {
  return { planName, passengers, total };
}

const rows = [
  createData("Plano Familiar", 4, "R$ 1200,00"),
  createData("Plano Individual", 1, "R$ 300,00"),
  createData("Plano Empresarial", 6, "R$ 8000,00"),
  createData("Plano Viagem", 2, "R$ 600,00"),
  createData("Plano Premium", 3, "R$ 1500,00"),
];

const Resume = () => {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-[#313131]">Resumo do Plano:</h2>
        <p>Resumo do plano </p>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de planos">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Plano</TableCell>
              <TableCell align="right">Qtd. Passageiros</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.planName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.planName}
                </TableCell>
                <TableCell align="right">{row.passengers}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Resume;
