import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import TodoList from './Components/TodoList';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" gutterBottom>
            Todo App
          </Typography>
          <TodoList />
        </Container>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
