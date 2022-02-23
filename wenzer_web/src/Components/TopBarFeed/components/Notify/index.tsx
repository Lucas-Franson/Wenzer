import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { MdNotifications } from 'react-icons/md';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  }),
);

const defaultProps = {
  color: 'secondary' as 'secondary',
  children: <MdNotifications size={28}/>,
};

export default function Notify() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={1} max={999} {...defaultProps} />
    </div>
  );
}