import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from './styles';
import InputText from '../InputText';
import Select from 'react-select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);

export default function InputAutoComplete({ options, onchange, defaultValues, disabled }: any) {
  return (
    <Container>
      <Select 
        isMulti 
        options={options} 
        defaultValue={defaultValues} 
        onChange={onchange} 
        placeholder="Interesses" 
        isDisabled={disabled}
      />
    </Container>
  );
}