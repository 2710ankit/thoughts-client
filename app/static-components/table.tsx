import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import axiosInterceptorInstance from "../interceptor/interceptor.";
import { format } from "date-fns";

interface Column {
  id: "thought" | "place" | "date" | "time";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "thought", label: "Thought", minWidth: 170 },
  { id: "place", label: "Place", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "time", label: "Time", minWidth: 170 },
];
const TableStatic = ({ thoughts, totalCount, onQueryChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  console.log("onload");
  console.log(totalCount);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    const query = {
      page: newPage + 1,
      pageSize: rowsPerPage,
    };

    onQueryChange(query);
    // axiosInterceptorInstance.get("thoughts/search/", {
    //   params: {
    //     page: newPage + 1,
    //   },
    // });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log();
    setRowsPerPage(+event.target.value);

    setPage(0);

    const query = {
      page: page + 1,
      pageSize: event.target.value,
    };

    console.log(query);
    onQueryChange(query);
  };
  return (
    <Container
      style={{ paddingTop: "20px", background: "black", height: "100vh" }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      background: "#a49d9d",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {thoughts.map((t: any) => {
                const d = format(new Date(t.date), " do MMMM yyyy");
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={t._id}>
                    <TableCell>{t.thought}</TableCell>

                    <TableCell>{t.place}</TableCell>

                    <TableCell>{d}</TableCell>

                    <TableCell>{t.time}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default TableStatic;
