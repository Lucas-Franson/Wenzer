import { Container } from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SplashScreen() {
  return (
    <Container>
      <img src="/Logo_wenzer.png" alt="wenzer" />
      <CircularProgress />
    </Container>
  );
}
