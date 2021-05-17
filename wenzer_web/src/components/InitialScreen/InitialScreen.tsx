import { ReactElement, ReactNode } from "react";
import { Box, Button, Paper } from "@material-ui/core";
import { useStyles } from './styles';
import Link from "next/link";

export default function InitialScreen(): ReactElement {
  const classes = useStyles();

  return (
    <Paper className={classes.initialScreen} elevation={20}>
      <Box className={classes.container}>
        <Box className={classes.containerTitle}>
          <h1>Compartilhe experiência, ideias e projetos!</h1>
          <p>Encontre pessoas, monte sua equipe e desenvolva suas ideias</p>
          <img
            className={classes.image}
            src="/bg_home.svg"
            alt="login screen"
          />
        </Box>

        <Box className={classes.formLogin}>
          <h1 className={classes.loginText}>
            Registre-se grátis e acesse a plataforma agora mesmo!
          </h1>

          <Link href="/register">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Cadastre-se
            </Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}